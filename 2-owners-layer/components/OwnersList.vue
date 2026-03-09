<template>
  <div>
    <div v-if="owners.length === 0" class="empty-state">
      <p>No owners found. Add your first owner!</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Pets</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ownerData in ownersWithPets" :key="ownerData.id">
          <td><strong>{{ ownerData.name }}</strong></td>
          <td>{{ ownerData.email }}</td>
          <td>{{ ownerData.phone }}</td>
          <td>
            <span
              v-for="pet in ownerData.pets"
              :key="pet?.id"
              class="badge badge-success"
              style="margin-right: 0.25rem;"
            >
              {{ pet?.name }}
            </span>
            <span v-if="ownerData.pets.length === 0" style="color: #999;">None</span>
          </td>
          <td>
            <div class="actions-cell">
              <button class="btn btn-secondary" @click="$emit('edit', findOwner(ownerData.id))">Edit</button>
              <button class="btn btn-danger" @click="$emit('delete', ownerData.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOwnersStore } from '../stores/owners'
import type { Owner } from '../stores/owners'

const props = defineProps<{
  owners: Owner[]
}>()

defineEmits<{
  edit: [owner: Owner]
  delete: [id: string]
}>()

const ownersStore = useOwnersStore()

const ownersWithPets = computed(() =>
  props.owners.map((owner) => {
    const full = ownersStore.getOwnerWithPets(owner.id)
    return full ?? { ...owner, pets: [] }
  })
)

function findOwner(id: string): Owner {
  return props.owners.find((o) => o.id === id) as Owner
}
</script>
