import { defineStore } from 'pinia'
import { usePetsStore } from '../../1-pets-layer/stores/pets'

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  petIds: string[]
}

export interface OwnersState {
  owners: Owner[]
  loading: boolean
  error: string | null
}

export const useOwnersStore = defineStore('owners', {
  state: (): OwnersState => ({
    owners: [
      { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', petIds: ['1'] },
      { id: '2', name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', petIds: ['2', '3'] },
    ],
    loading: false,
    error: null,
  }),
  getters: {
    getOwnerById: (state) => (id: string) => state.owners.find((o) => o.id === id),
    ownerCount: (state) => state.owners.length,
    getOwnerWithPets: (state) => (id: string) => {
      const owner = state.owners.find((o) => o.id === id)
      if (!owner) return null
      const petsStore = usePetsStore()
      const pets = owner.petIds.map((petId) => petsStore.getPetById(petId)).filter(Boolean)
      return { ...owner, pets }
    },
    allOwnersWithPets: (state) => {
      const petsStore = usePetsStore()
      return state.owners.map((owner) => ({
        ...owner,
        pets: owner.petIds.map((petId) => petsStore.getPetById(petId)).filter(Boolean),
      }))
    },
  },
  actions: {
    addOwner(owner: Omit<Owner, 'id'>) {
      const newOwner: Owner = {
        ...owner,
        id: Date.now().toString(),
      }
      this.owners.push(newOwner)
      return newOwner
    },
    updateOwner(id: string, updates: Partial<Omit<Owner, 'id'>>) {
      const index = this.owners.findIndex((o) => o.id === id)
      if (index !== -1) {
        this.owners[index] = { ...this.owners[index], ...updates }
        return this.owners[index]
      }
      return null
    },
    deleteOwner(id: string) {
      const index = this.owners.findIndex((o) => o.id === id)
      if (index !== -1) {
        this.owners.splice(index, 1)
        return true
      }
      return false
    },
    addPetToOwner(ownerId: string, petId: string) {
      const owner = this.owners.find((o) => o.id === ownerId)
      if (owner && !owner.petIds.includes(petId)) {
        owner.petIds.push(petId)
        return true
      }
      return false
    },
    removePetFromOwner(ownerId: string, petId: string) {
      const owner = this.owners.find((o) => o.id === ownerId)
      if (owner) {
        const index = owner.petIds.indexOf(petId)
        if (index !== -1) {
          owner.petIds.splice(index, 1)
          return true
        }
      }
      return false
    },
  },
})
