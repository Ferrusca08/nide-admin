import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#fcf3f3', display: 'flex', flexDirection: 'column' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/favicon.jpg" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    Fundación NIDE A.C.
                </div>
                <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Administrador</Link>
                    <Link to="/juego" style={{ textDecoration: 'none', color: '#333' }}>Juego</Link>
                    <Link to="/acerca-de" style={{ textDecoration: 'none', color: '#333' }}>NIDE</Link>
                </nav>
            </header>

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            <footer style={{ padding: '2rem 4rem', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#666', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: 'black' }}>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 600, color: '#333' }}>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
