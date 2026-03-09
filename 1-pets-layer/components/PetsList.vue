<template>
  <div>
    <div v-if="pets.length === 0" class="empty-state">
      <p>No pets found. Add your first pet!</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Species</th>
          <th>Breed</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
          <td><strong>{{ pet.name }}</strong></td>
          <td>{{ pet.species }}</td>
          <td>{{ pet.breed }}</td>
          <td>{{ pet.age }} yr{{ pet.age !== 1 ? 's' : '' }}</td>
          <td>
            <div class="actions-cell">
              <button class="btn btn-secondary" @click="$emit('edit', pet)">Edit</button>
              <button class="btn btn-danger" @click="$emit('delete', pet.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Pet } from '../stores/pets'

defineProps<{
  pets: Pet[]
}>()

defineEmits<{
  edit: [pet: Pet]
  delete: [id: string]
}>()
</script>
