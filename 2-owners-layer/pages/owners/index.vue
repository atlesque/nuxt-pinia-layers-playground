<template>
  <div>
    <div class="page-header">
      <h1>Owners Management</h1>
    </div>
    <div class="card">
      <div class="action-bar">
        <p>Total owners: <strong>{{ ownersStore.ownerCount }}</strong></p>
        <button class="btn btn-primary" @click="showAddForm = true">+ Add Owner</button>
      </div>
      <OwnersList
        :owners="ownersStore.owners"
        @edit="openEditForm"
        @delete="handleDelete"
      />
    </div>
    <OwnerForm
      v-if="showAddForm"
      @close="showAddForm = false"
      @submit="handleAdd"
    />
    <OwnerForm
      v-if="editingOwner"
      :owner="editingOwner"
      @close="editingOwner = null"
      @submit="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOwnersStore } from '../../stores/owners'
import type { Owner } from '../../stores/owners'

const ownersStore = useOwnersStore()
const showAddForm = ref(false)
const editingOwner = ref<Owner | null>(null)

function openEditForm(owner: Owner) {
  editingOwner.value = owner
}

function handleAdd(data: Omit<Owner, 'id'>) {
  ownersStore.addOwner(data)
  showAddForm.value = false
}

function handleEdit(data: Omit<Owner, 'id'>) {
  if (editingOwner.value) {
    ownersStore.updateOwner(editingOwner.value.id, data)
    editingOwner.value = null
  }
}

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this owner?')) {
    ownersStore.deleteOwner(id)
  }
}
</script>
