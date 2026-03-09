<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit Pet' : 'Add New Pet' }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="pet-name">Name</label>
            <input id="pet-name" v-model="form.name" class="form-control" type="text" required placeholder="e.g. Buddy" />
          </div>
          <div class="form-group">
            <label for="pet-species">Species</label>
            <input id="pet-species" v-model="form.species" class="form-control" type="text" required placeholder="e.g. Dog" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="pet-breed">Breed</label>
            <input id="pet-breed" v-model="form.breed" class="form-control" type="text" required placeholder="e.g. Golden Retriever" />
          </div>
          <div class="form-group">
            <label for="pet-age">Age (years)</label>
            <input id="pet-age" v-model.number="form.age" class="form-control" type="number" min="0" required />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Add Pet' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Pet } from '../stores/pets'

const props = defineProps<{
  pet?: Pet | null
}>()

const emit = defineEmits<{
  close: []
  submit: [data: Omit<Pet, 'id'>]
}>()

const isEditing = computed(() => !!props.pet)

const form = reactive({
  name: props.pet?.name ?? '',
  species: props.pet?.species ?? '',
  breed: props.pet?.breed ?? '',
  age: props.pet?.age ?? 0,
})

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
