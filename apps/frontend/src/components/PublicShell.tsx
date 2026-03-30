import { Mail, Menu, Phone, Search, ShoppingBag, UserCircle2 } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

export function PublicShell() {
  return (
    <div className="wedding-page">
      <header className="top-strip">
        <div className="top-strip__left">
          <span><Mail size={14} /> info.EventZen@gmail.com</span>
          <span><Phone size={14} /> +1 971-295-3811</span>
        </div>
        <div className="top-strip__right">
          <a href="#"><UserCircle2 size={14} /></a>
          <a href="#"><Mail size={14} /></a>
          <a href="#"><Search size={14} /></a>
        </div>
      </header>

      <section className="brand-row">
        <div className="brand-mark">EZ</div>
        <div className="brand-copy">
          <h1>EventZen</h1>
          <p>One Stop Event Solutions</p>
        </div>
        <div className="brand-actions">
          <button aria-label="Shopping"><ShoppingBag size={18} /></button>
          <button aria-label="Search"><Search size={18} /></button>
          <button aria-label="Menu"><Menu size={18} /></button>
        </div>
      </section>

      <nav className="main-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/create">Create Event</NavLink>
        <NavLink to="/events">Events</NavLink>
      </nav>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  )
}
