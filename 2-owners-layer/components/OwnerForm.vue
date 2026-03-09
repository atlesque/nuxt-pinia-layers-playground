<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit Owner' : 'Add New Owner' }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="owner-name">Name</label>
            <input id="owner-name" v-model="form.name" class="form-control" type="text" required placeholder="e.g. Alice Johnson" />
          </div>
          <div class="form-group">
            <label for="owner-email">Email</label>
            <input id="owner-email" v-model="form.email" class="form-control" type="email" required placeholder="e.g. alice@example.com" />
          </div>
        </div>
        <div class="form-group">
          <label for="owner-phone">Phone</label>
          <input id="owner-phone" v-model="form.phone" class="form-control" type="tel" required placeholder="e.g. 555-0101" />
        </div>
        <div class="form-group">
          <label>Pets</label>
          <div v-if="petsStore.pets.length === 0" style="color: #999; font-size: 0.875rem;">
            No pets available. Add pets first.
          </div>
          <div v-else style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            <label
              v-for="pet in petsStore.pets"
              :key="pet.id"
              style="display: flex; align-items: center; gap: 0.35rem; cursor: pointer; padding: 0.25rem 0.5rem; background: #f8f9fa; border-radius: 4px; border: 1px solid #ddd;"
            >
              <input
                type="checkbox"
                :value="pet.id"
                v-model="form.petIds"
              />
              {{ pet.name }} ({{ pet.species }})
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Add Owner' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { usePetsStore } from '../../1-pets-layer/stores/pets'
import type { Owner } from '../stores/owners'

const props = defineProps<{
  owner?: Owner | null
}>()

const emit = defineEmits<{
  close: []
  submit: [data: Omit<Owner, 'id'>]
}>()

const petsStore = usePetsStore()
const isEditing = computed(() => !!props.owner)

const form = reactive({
  name: props.owner?.name ?? '',
  email: props.owner?.email ?? '',
  phone: props.owner?.phone ?? '',
  petIds: [...(props.owner?.petIds ?? [])],
})

function handleSubmit() {
  emit('submit', { ...form })
}
</script>
