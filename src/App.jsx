import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <section className={'App'}>
      <header className={'App-header'}>
        <h1>Market</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={'App-footer'}>
        <p>Creator Denis Repyev</p>
      </footer>
    </section>
  )
}
