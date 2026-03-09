import { defineStore } from 'pinia'

export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
}

export interface PetsState {
  pets: Pet[]
  loading: boolean
  error: string | null
}

export const usePetsStore = defineStore('pets', {
  state: (): PetsState => ({
    pets: [
      { id: '1', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: 3 },
      { id: '2', name: 'Whiskers', species: 'Cat', breed: 'Siamese', age: 5 },
      { id: '3', name: 'Tweety', species: 'Bird', breed: 'Canary', age: 2 },
    ],
    loading: false,
    error: null,
  }),
  getters: {
    getPetById: (state) => (id: string) => state.pets.find((p) => p.id === id),
    petCount: (state) => state.pets.length,
    petsBySpecies: (state) => (species: string) =>
      state.pets.filter((p) => p.species.toLowerCase() === species.toLowerCase()),
  },
  actions: {
    addPet(pet: Omit<Pet, 'id'>) {
      const newPet: Pet = {
        ...pet,
        id: Date.now().toString(),
      }
      this.pets.push(newPet)
      return newPet
    },
    updatePet(id: string, updates: Partial<Omit<Pet, 'id'>>) {
      const index = this.pets.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pets[index] = { ...this.pets[index], ...updates }
        return this.pets[index]
      }
      return null
    },
    deletePet(id: string) {
      const index = this.pets.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.pets.splice(index, 1)
        return true
      }
      return false
    },
    clearError() {
      this.error = null
    },
  },
})
