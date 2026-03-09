<template>
  <div>
    <div class="page-header">
      <h1>Pets Management</h1>
    </div>
    <div class="card">
      <div class="action-bar">
        <p>Total pets: <strong>{{ petsStore.petCount }}</strong></p>
        <button class="btn btn-primary" @click="showAddForm = true">+ Add Pet</button>
      </div>
      <PetsList
        :pets="petsStore.pets"
        @edit="openEditForm"
        @delete="handleDelete"
      />
    </div>
    <PetForm
      v-if="showAddForm"
      @close="showAddForm = false"
      @submit="handleAdd"
    />
    <PetForm
      v-if="editingPet"
      :pet="editingPet"
      @close="editingPet = null"
      @submit="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePetsStore } from '../../stores/pets'
import type { Pet } from '../../stores/pets'

const petsStore = usePetsStore()
const showAddForm = ref(false)
const editingPet = ref<Pet | null>(null)

function openEditForm(pet: Pet) {
  editingPet.value = pet
}

function handleAdd(data: Omit<Pet, 'id'>) {
  petsStore.addPet(data)
  showAddForm.value = false
}

function handleEdit(data: Omit<Pet, 'id'>) {
  if (editingPet.value) {
    petsStore.updatePet(editingPet.value.id, data)
    editingPet.value = null
  }
}

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this pet?')) {
    petsStore.deletePet(id)
  }
}
</script>
