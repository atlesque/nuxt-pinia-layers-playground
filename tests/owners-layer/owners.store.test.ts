import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOwnersStore } from '../../2-owners-layer/stores/owners'
import { usePetsStore } from '../../1-pets-layer/stores/pets'

describe('Owners Store (owners layer)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default owners', () => {
    const store = useOwnersStore()
    expect(store.owners.length).toBeGreaterThan(0)
  })

  it('returns ownerCount getter', () => {
    const store = useOwnersStore()
    expect(store.ownerCount).toBe(store.owners.length)
  })

  it('adds a new owner', () => {
    const store = useOwnersStore()
    const countBefore = store.ownerCount
    const newOwner = store.addOwner({ name: 'Charlie', email: 'charlie@example.com', phone: '555-0200', petIds: [] })
    expect(store.ownerCount).toBe(countBefore + 1)
    expect(newOwner.name).toBe('Charlie')
    expect(newOwner.id).toBeTruthy()
  })

  it('retrieves an owner by id', () => {
    const store = useOwnersStore()
    const added = store.addOwner({ name: 'Diana', email: 'diana@example.com', phone: '555-0201', petIds: [] })
    const found = store.getOwnerById(added.id)
    expect(found).toBeDefined()
    expect(found?.name).toBe('Diana')
  })

  it('returns undefined for non-existent owner id', () => {
    const store = useOwnersStore()
    expect(store.getOwnerById('non-existent')).toBeUndefined()
  })

  it('updates an owner', () => {
    const store = useOwnersStore()
    const added = store.addOwner({ name: 'Eve', email: 'eve@example.com', phone: '555-0202', petIds: [] })
    const updated = store.updateOwner(added.id, { name: 'Eve Updated', phone: '555-9999' })
    expect(updated?.name).toBe('Eve Updated')
    expect(updated?.phone).toBe('555-9999')
  })

  it('returns null when updating non-existent owner', () => {
    const store = useOwnersStore()
    const result = store.updateOwner('non-existent', { name: 'Ghost' })
    expect(result).toBeNull()
  })

  it('deletes an owner', () => {
    const store = useOwnersStore()
    const added = store.addOwner({ name: 'Frank', email: 'frank@example.com', phone: '555-0203', petIds: [] })
    const countBefore = store.ownerCount
    const result = store.deleteOwner(added.id)
    expect(result).toBe(true)
    expect(store.ownerCount).toBe(countBefore - 1)
    expect(store.getOwnerById(added.id)).toBeUndefined()
  })

  it('returns false when deleting non-existent owner', () => {
    const store = useOwnersStore()
    expect(store.deleteOwner('non-existent')).toBe(false)
  })

  it('adds a pet to an owner', () => {
    const store = useOwnersStore()
    const owner = store.addOwner({ name: 'Grace', email: 'grace@example.com', phone: '555-0204', petIds: [] })
    const result = store.addPetToOwner(owner.id, 'pet-1')
    expect(result).toBe(true)
    expect(store.getOwnerById(owner.id)?.petIds).toContain('pet-1')
  })

  it('does not add duplicate pet to owner', () => {
    const store = useOwnersStore()
    const owner = store.addOwner({ name: 'Grace', email: 'grace@example.com', phone: '555-0204', petIds: ['pet-1'] })
    store.addPetToOwner(owner.id, 'pet-1')
    expect(store.getOwnerById(owner.id)?.petIds.filter((id) => id === 'pet-1').length).toBe(1)
  })

  it('removes a pet from an owner', () => {
    const store = useOwnersStore()
    const owner = store.addOwner({ name: 'Henry', email: 'henry@example.com', phone: '555-0205', petIds: ['pet-1', 'pet-2'] })
    const result = store.removePetFromOwner(owner.id, 'pet-1')
    expect(result).toBe(true)
    expect(store.getOwnerById(owner.id)?.petIds).not.toContain('pet-1')
  })

  it('uses pinia pets store to resolve pet details via getOwnerWithPets', () => {
    const ownersStore = useOwnersStore()
    const petsStore = usePetsStore()
    const pet = petsStore.addPet({ name: 'Snowball', species: 'Cat', breed: 'Maine Coon', age: 2 })
    const owner = ownersStore.addOwner({ name: 'Ivy', email: 'ivy@example.com', phone: '555-0206', petIds: [pet.id] })
    const ownerWithPets = ownersStore.getOwnerWithPets(owner.id)
    expect(ownerWithPets).toBeDefined()
    expect(ownerWithPets?.pets.some((p) => p?.id === pet.id)).toBe(true)
  })
})
