import React, { useState, useEffect } from 'react';

const AccountManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdmins = async () => {
      try {
          const res = await fetch('https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/admin/list');
          const data = await res.json();
          if (data.exito) {
              setAdmins(data.admins);
          }
      } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleDesactivar = async (id_admin) => {
      if (!window.confirm('¿Estás seguro de que deseas eliminar este administrador?')) return;
      try {
          const res = await fetch(`https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/admin/baja/${id_admin}`, { method: 'DELETE' });
          const data = await res.json();
          if (data.exito) {
              alert('Administrador eliminado');
              fetchAdmins();
          } else {
              alert('Error: ' + data.mensaje);
          }
      } catch (e) {
          alert('Error de conexión con el servidor');
      }
  };

  const handleCambiarPassword = async (id_admin) => {
      const nuevaContrasena = window.prompt('Introduce la nueva contraseña para este administrador:');
      if (!nuevaContrasena) return;
      try {
          const res = await fetch(`https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/admin/password/${id_admin}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contrasena: nuevaContrasena })
          });
          const data = await res.json();
          if (data.exito) {
              alert('Contraseña actualizada correctamente.');
          } else {
              alert('Error: ' + data.mensaje);
          }
      } catch (e) {
          alert('Error de conexión con el servidor');
      }
  };

  const handleCrear = async () => {
      if (!nombre || !contrasena) return alert('Completa los campos de usuario y contraseña');
      setLoading(true);
      try {
          const res = await fetch('https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/admin/crear', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre, contrasena })
          });
          const data = await res.json();
          if (data.exito) {
              alert('Administrador dado de alta exitosamente.');
              setNombre('');
              setContrasena('');
              fetchAdmins();
          } else {
              alert('Error: ' + data.mensaje);
          }
      } catch (e) {
          alert('Error de conexión con el backend o API Gateway');
      }
      setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Gestión de Cuentas de Administrador</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Registrar Nuevo Administrador</h3>
        
        <form style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label className="input-label">Nombre de Usuario (Login)</label>
            <input type="text" className="input-field" placeholder="ej. emiliano.admin" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="input-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label className="input-label">Contraseña de Acceso</label>
            <input type="password" className="input-field" placeholder="••••••••" value={contrasena} onChange={e => setContrasena(e.target.value)} />
          </div>
          
          <div style={{ flexBasis: '100%', marginTop: '1rem' }}>
            <button type="button" onClick={handleCrear} disabled={loading} className="btn btn-success" style={{ padding: '0.6rem 2rem' }}>
              {loading ? 'Creando...' : 'Crear Cuenta Autorizada'}
            </button>
          </div>
        </form>
      </div>

      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 700 }}>Administradores Existentes</h3>
      
      <div className="card" style={{ padding: '0 0' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '1.5rem' }}>ID Admin</th>
                <th>Nombre de Usuario</th>
                <th>Fecha Registro</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 && (
                <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>Cargando administradores reales...</td></tr>
              )}
              {admins.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, paddingLeft: '1.5rem' }}>#{a.id_admin}</td>
                  <td style={{ color: 'var(--text-main)' }}>{a.nombre}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{a.fecha_reg ? new Date(a.fecha_reg).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary" onClick={() => handleCambiarPassword(a.id_admin)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', backgroundColor: '#3b82f6' }}>Cambiar Clave</button>
                        <button className="btn btn-danger" onClick={() => handleDesactivar(a.id_admin)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', backgroundColor: '#e11d48' }}>Desactivar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
