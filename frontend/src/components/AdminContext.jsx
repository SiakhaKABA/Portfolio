import { createContext, useContext, useState } from 'react'

const AdminContext = createContext()
const API = import.meta.env.VITE_API_URL

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'))
  const [showLogin, setShowLogin] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [editRequest, setEditRequest] = useState(null)

  const login = async (password) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (!res.ok) return false
      const { token } = await res.json()
      localStorage.setItem('token', token)
      setIsAdmin(true)
      setShowLogin(false)
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAdmin(false)
  }

  const getToken = () => localStorage.getItem('token')

  const authFetch = (url, options = {}) => {
    const token = getToken()
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      }
    })
  }

  const triggerLogin = () => {
    if (isAdmin) {
      logout()
    } else {
      setShowLogin(true)
    }
  }

  const openPanelEdit = (tab, item) => {
    setEditRequest({ tab, item })
    setPanelOpen(true)
  }

  return (
    <AdminContext.Provider value={{
      isAdmin, login, logout, showLogin, setShowLogin, triggerLogin,
      panelOpen, setPanelOpen, editRequest, setEditRequest, openPanelEdit,
      authFetch
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
