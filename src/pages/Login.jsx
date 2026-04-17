import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (data.exito) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('adminData', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                setError(data.mensaje || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error de conexión con el servidor.');
        }
    }

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            
            {/* Hero Section */}
            <div style={{ textAlign: 'center', padding: '3rem 0 2rem 0' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem' }}>¡Aprende Jugando!</h1>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#444', marginBottom: '2rem' }}>Educación Interactiva para Todos</p>
                <a href="#login" style={{ textDecoration: 'none', color: '#1a1a1a', fontWeight: 'bold', fontSize: '0.9rem' }}>Descubre Más &gt;</a>
            </div>

            {/* Banner Placeholder (Green grass like the mockup) */}
            <div style={{ width: '100%', height: '300px', backgroundColor: '#e2f0d9', backgroundImage: 'linear-gradient(#e2f0d9, #c5e0b4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
                <p style={{ color: '#5b8c38', fontWeight: 'bold' }}>[ Imagen de Niños Jugando con Tren Ferromex ]</p>
            </div>

            {/* Login Card */}
            <div id="login" className="card" style={{ maxWidth: '450px', width: '100%', marginBottom: '4rem', padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Inicia Sesión en Tu Cuenta</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Accede a un mundo de aprendizaje y diversión educativa.</p>
                
                <form onSubmit={handleLogin}>
                    {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
                    <div className="input-group">
                        <label className="input-label">Nombre de Usuario</label>
                        <input className="input-field" type="text" placeholder="Introduce tu usuario aquí" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label">Contraseña</label>
                        <input className="input-field" type="password" placeholder="•••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <input type="checkbox" defaultChecked /> Recordarme
                        </label>
                        <a href="#" style={{ color: '#555', textDecoration: 'none', fontWeight: 500 }}>¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#3b82f6' }}>
                        Continuar
                    </button>
                    
                    <button type="button" className="btn" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'white', border: '1px solid #ccc', color: '#333', fontWeight: 600 }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '0.5rem' }}>G</span> Iniciar sesión con Google
                    </button>
                    
                    <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
                        ¿No tienes cuenta? <a href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 'bold' }}>Regístrate ahora.</a>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default Login;
