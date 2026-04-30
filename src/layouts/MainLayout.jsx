import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, LogOut, ArrowLeft } from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  
  return (
    <div className="layout-app">
      <aside className="layout-sidebar">
        <div className="layout-sidebar-title">
          Panel Administrativo
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} />
            Resumen General
          </NavLink>
          <NavLink to="/jugadores" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Users size={20} />
            Listado de Jugadores
          </NavLink>
          <NavLink to="/cuentas" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <UserCog size={20} />
            Gestión de Cuentas
          </NavLink>
        </nav>
        
        <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <button 
            className="nav-item" 
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', outline: 'none' }}
            onClick={() => {
                localStorage.removeItem('isAuthenticated');
                navigate('/login');
            }}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
      
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
