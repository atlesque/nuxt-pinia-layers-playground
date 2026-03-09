import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePetsStore } from '../../1-pets-layer/stores/pets'

describe('Pets Store (pets layer)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default pets', () => {
    const store = usePetsStore()
    expect(store.pets.length).toBeGreaterThan(0)
  })

  it('returns petCount getter', () => {
    const store = usePetsStore()
    expect(store.petCount).toBe(store.pets.length)
  })

  it('adds a new pet', () => {
    const store = usePetsStore()
    const countBefore = store.petCount
    const newPet = store.addPet({ name: 'Rex', species: 'Dog', breed: 'Labrador', age: 2 })
    expect(store.petCount).toBe(countBefore + 1)
    expect(newPet.name).toBe('Rex')
    expect(newPet.id).toBeTruthy()
  })

  it('retrieves a pet by id', () => {
    const store = usePetsStore()
    const added = store.addPet({ name: 'Mittens', species: 'Cat', breed: 'Persian', age: 3 })
    const found = store.getPetById(added.id)
    expect(found).toBeDefined()
    expect(found?.name).toBe('Mittens')
  })

  it('returns undefined for non-existent pet id', () => {
    const store = usePetsStore()
    expect(store.getPetById('non-existent')).toBeUndefined()
  })

  it('updates a pet', () => {
    const store = usePetsStore()
    const added = store.addPet({ name: 'Fido', species: 'Dog', breed: 'Poodle', age: 1 })
    const updated = store.updatePet(added.id, { age: 2, name: 'Fido Updated' })
    expect(updated?.name).toBe('Fido Updated')
    expect(updated?.age).toBe(2)
  })

  it('returns null when updating non-existent pet', () => {
    const store = usePetsStore()
    const result = store.updatePet('non-existent', { name: 'Ghost' })
    expect(result).toBeNull()
  })

  it('deletes a pet', () => {
    const store = usePetsStore()
    const added = store.addPet({ name: 'ToDelete', species: 'Fish', breed: 'Goldfish', age: 1 })
    const countBefore = store.petCount
    const result = store.deletePet(added.id)
    expect(result).toBe(true)
    expect(store.petCount).toBe(countBefore - 1)
    expect(store.getPetById(added.id)).toBeUndefined()
  })

  it('returns false when deleting non-existent pet', () => {
    const store = usePetsStore()
    expect(store.deletePet('non-existent')).toBe(false)
  })

  it('filters pets by species', () => {
    const store = usePetsStore()
    store.addPet({ name: 'Rex', species: 'Dog', breed: 'Labrador', age: 2 })
    store.addPet({ name: 'Luna', species: 'Dog', breed: 'Poodle', age: 4 })
    const dogs = store.petsBySpecies('Dog')
    expect(dogs.every((p) => p.species === 'Dog')).toBe(true)
  })
})
