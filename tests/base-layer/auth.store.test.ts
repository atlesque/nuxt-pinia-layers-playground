import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../0-base-layer/stores/auth'

describe('Auth Store (base layer)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with unauthenticated state', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  it('logs in a user', () => {
    const store = useAuthStore()
    store.login({ id: '1', name: 'Alice', email: 'alice@example.com' })
    expect(store.isAuthenticated).toBe(true)
    expect(store.user).toEqual({ id: '1', name: 'Alice', email: 'alice@example.com' })
  })

  it('exposes userName getter', () => {
    const store = useAuthStore()
    expect(store.userName).toBe('Guest')
    store.login({ id: '1', name: 'Alice', email: 'alice@example.com' })
    expect(store.userName).toBe('Alice')
  })

  it('exposes currentUser getter', () => {
    const store = useAuthStore()
    const user = { id: '2', name: 'Bob', email: 'bob@example.com' }
    store.login(user)
    expect(store.currentUser).toEqual(user)
  })

  it('logs out a user', () => {
    const store = useAuthStore()
    store.login({ id: '1', name: 'Alice', email: 'alice@example.com' })
    store.logout()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  it('updates user info', () => {
    const store = useAuthStore()
    store.login({ id: '1', name: 'Alice', email: 'alice@example.com' })
    store.updateUser({ name: 'Alice Updated' })
    expect(store.user?.name).toBe('Alice Updated')
    expect(store.user?.email).toBe('alice@example.com')
  })

  it('does not update if not logged in', () => {
    const store = useAuthStore()
    store.updateUser({ name: 'Ghost' })
    expect(store.user).toBeNull()
  })
})
