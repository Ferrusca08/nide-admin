import React from 'react';

const admins = [
  { nombre: 'Carlos González', email: 'carlos@tec.mx', estado: 'Activo', acceso: 'Hoy, 10:30 AM' },
  { nombre: 'Gianfranco Ortigoza', email: 'gian@tec.mx', estado: 'Activo', acceso: 'Ayer, 04:15 PM' },
];

const AccountManagement = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Gestión de Cuentas de Administrador</h1>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Registrar Nuevo Administrador</h3>
        
        <form style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label className="input-label">Nombre Completo</label>
            <input type="text" className="input-field" placeholder="Ej. Emiliano Ferrusca" />
          </div>
          <div className="input-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label className="input-label">Correo Electrónico</label>
            <input type="email" className="input-field" placeholder="admin@nide.org" />
          </div>
          <div className="input-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label className="input-label">Contraseña Temporal</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          
          <div style={{ flexBasis: '100%', marginTop: '1rem' }}>
            <button type="button" className="btn btn-success" style={{ padding: '0.6rem 2rem' }}>Crear Cuenta Autorizada</button>
          </div>
        </form>
      </div>

      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 700 }}>Administradores Existentes</h3>
      
      <div className="card" style={{ padding: '0 0' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '1.5rem' }}>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Último Acceso</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, paddingLeft: '1.5rem' }}>{a.nombre}</td>
                  <td>{a.email}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.85rem' }}>{a.estado}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{a.acceso}</td>
                  <td>
                    <button className="btn btn-danger" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', backgroundColor: '#e11d48' }}>Desactivar</button>
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
