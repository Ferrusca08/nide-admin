import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#fcf3f3', display: 'flex', flexDirection: 'column' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>≡</div>
                    Nombre del proyecto (Mockup Tec de Monterrey)
                </div>
                <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    <a href="/login" style={{ textDecoration: 'none', color: '#333' }}>Administrador</a>
                    <a href="#" style={{ textDecoration: 'none', color: '#333' }}>Juego</a>
                    <a href="#" style={{ textDecoration: 'none', color: '#333' }}>Contacto</a>
                </nav>
            </header>
            
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            
            <footer style={{ padding: '2rem 4rem', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#666', background: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: 'black' }}>
                    Mockup 0
                </div>
                <p>© 2023 Academia Avanzada. Todos los derechos reservados.</p>
                <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 600, color: '#333' }}>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Política de Privacidad</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Términos de Uso</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Soporte</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</a>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
