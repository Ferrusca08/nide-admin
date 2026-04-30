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
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#444', marginBottom: '1rem' }}>Educación Interactiva para Todos</p>
            </div>

            {/* Banner Image */}
            <div style={{ width: '100%', marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
                <img src="/ninos_jugando.jpg" alt="Niños Jugando" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
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
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#3b82f6' }}>
                        Continuar
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Login;
