import React, { useState, useEffect } from 'react';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
      try {
          const res = await fetch('https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/alumno/list');
          const data = await res.json();
          if (data.exito) {
              setPlayers(data.alumnos);
          }
      } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchPlayers(); }, []);

  const handleCrear = async () => {
      if (!nombre || !edad) return alert('Completa el nombre y la edad del infante');
      setLoading(true);
      try {
          const res = await fetch('https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/alumno/crear', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre, edad })
          });
          const data = await res.json();
          if (data.exito) {
              alert(`¡Infante creado en la base de datos!\n\nSU PIN ÚNICO DE ACCESO AL JUEGO ES: ${data.pin}\n\nPor favor, anótalo y compártelo al alumno antes de cerrar esto.`);
              setNombre('');
              setEdad('');
              fetchPlayers();
          } else {
              alert('Error: ' + data.mensaje);
          }
      } catch (e) {
          alert('Error de conexión al generar infante');
      }
      setLoading(false);
  };

  const handleDarBaja = async (player) => {
      const confirmado = window.confirm(
          `¿Estás seguro de que deseas DAR DE BAJA a ${player.nombre}?\n\nEsta acción desactivará al alumno. Su historial de partidas se conservará en la base de datos.`
      );
      if (!confirmado) return;

      try {
          const res = await fetch(`https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/alumno/baja/${player.id_alumno}`, {
              method: 'PUT',
          });
          const data = await res.json();
          if (data.exito) {
              alert(`✅ ${player.nombre} ha sido dado de baja correctamente.`);
              fetchPlayers();
          } else {
              alert('Error al dar de baja: ' + data.mensaje);
          }
      } catch (e) {
          alert('Error de conexión al intentar dar de baja.');
      }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Listado de Jugadores</h1>

      {/* Formulario de Alta de Infantes */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Dar de Alta Nuevo Alumno</h3>
        <form style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: '1 1 250px', marginBottom: 0 }}>
            <label className="input-label">Nombre del Niño/a</label>
            <input type="text" className="input-field" placeholder="Ej. Mateo Gómez" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>
          <div className="input-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
            <label className="input-label">Edad</label>
            <input type="number" className="input-field" placeholder="Ej. 6" value={edad} onChange={e => setEdad(e.target.value)} min="2" max="15" />
          </div>
          <div style={{ flexBasis: '100%', marginTop: '1rem' }}>
            <button type="button" onClick={handleCrear} disabled={loading} className="btn btn-success" style={{ padding: '0.6rem 2rem' }}>
              {loading ? 'Generando PIN...' : 'Registrar Infante y Generar PIN Seguro'}
            </button>
          </div>
        </form>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
            type="text" 
            placeholder="Buscar por nombre o PIN..." 
            className="input-field" 
            style={{ flex: 1, backgroundColor: 'white' }} 
        />
        <button className="btn" style={{ backgroundColor: '#E3E9F3', color: 'var(--text-main)' }}>Filtrar por Edad</button>
        <button className="btn" style={{ backgroundColor: '#E3E9F3', color: 'var(--text-main)' }}>Nivel Alcanzado</button>
      </div>

      <div className="card" style={{ padding: '0 0' }}>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: '1.5rem' }}>Nombre del Jugador</th>
                <th>PIN Secreto</th>
                <th>Edad</th>
                <th>Partidas Jugadas</th>
                <th>Nivel Máximo</th>
                <th>Fecha Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 && (
                <tr><td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>Descargando datos reales de la BD...</td></tr>
              )}
              {players.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, paddingLeft: '1.5rem', color: 'var(--text-main)' }}>{p.nombre}</td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', background: '#ffe4e6', color: '#be123c', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{p.pin}</span>
                  </td>
                  <td>
                    <span className="badge blue">{p.edad} años</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{p.partidas || 0}</td>
                  <td>Nivel {p.nivel || 0}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.fecha_reg}</td>
                  <td style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => window.location.href = '#/dashboard/detalles/' + p.id_alumno}
                      style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                    >
                      Ver Detalle
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDarBaja(p)}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem', backgroundColor: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', fontWeight: 600 }}
                    >
                      Dar de Baja
                    </button>
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

export default PlayersList;
