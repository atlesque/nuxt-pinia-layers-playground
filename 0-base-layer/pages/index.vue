<template>
  <div>
    <div class="page-header">
      <h1>Welcome to Nuxt 4 + Pinia Layers Playground</h1>
    </div>
    <div class="card">
      <h2>About This Project</h2>
      <p>This playground demonstrates Nuxt 4 Layers with Pinia state management. The application is split into domains:</p>
      <ul style="margin: 1rem 0; padding-left: 2rem; line-height: 2;">
        <li><strong>Base Layer</strong> - Authentication store and global layout</li>
        <li><strong>Pets Layer</strong> - CRUD interface for managing pets</li>
        <li><strong>Owners Layer</strong> - CRUD for owners, referencing the pets store</li>
      </ul>
    </div>
    <div class="card">
      <div v-if="authStore.isAuthenticated">
        <h2>Welcome back, {{ authStore.user?.name }}!</h2>
        <p>You are logged in as <strong>{{ authStore.user?.email }}</strong>.</p>
        <button class="btn btn-danger" style="margin-top: 1rem" @click="authStore.logout">Logout</button>
      </div>
      <div v-else>
        <h2>Authentication</h2>
        <p>You are currently not logged in.</p>
        <button
          class="btn btn-primary"
          style="margin-top: 1rem"
          @click="authStore.login({ id: '1', name: 'Demo User', email: 'demo@example.com' })"
        >
          Login as Demo User
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>
