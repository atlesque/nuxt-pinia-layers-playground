<template>
  <div class="app-wrapper">
    <header class="app-header">
      <nav class="app-nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/pets" class="nav-link">Pets</NuxtLink>
        <NuxtLink to="/owners" class="nav-link">Owners</NuxtLink>
      </nav>
      <div class="auth-status">
        <span v-if="authStore.isAuthenticated" class="auth-user">
          Logged in as: {{ authStore.user?.name }}
          <button class="btn btn-small" @click="authStore.logout">Logout</button>
        </span>
        <button v-else class="btn btn-small" @click="authStore.login({ id: '1', name: 'Demo User', email: 'demo@example.com' })">
          Login
        </button>
      </div>
    </header>
    <main class="app-main">
      <slot />
    </main>
    <footer class="app-footer">
      <p>Nuxt 4 + Pinia Layers Playground</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  color: #333;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.nav-link:hover,
.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background: #2c3e50;
  color: #aaa;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.btn-small {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.btn-small:hover {
  background: rgba(255, 255, 255, 0.35);
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-row .form-group {
  flex: 1;
  min-width: 150px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
}

table th {
  background: #f8f9fa;
  font-weight: bold;
  color: #555;
}

table tr:hover {
  background: #f8f9fa;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 1.75rem;
  color: #2c3e50;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge-success {
  background: #2ecc71;
  color: white;
}

.badge-warning {
  background: #f39c12;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: 1.25rem;
  color: #2c3e50;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.empty-state p {
  font-size: 1.1rem;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}
</style>
