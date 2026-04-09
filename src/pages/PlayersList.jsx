import React from 'react';

const players = [
  { nombre: 'Santi', edad: '5 años', partidas: 12, nivel: 'Nivel 3', aciertos: '92%' },
  { nombre: 'Gian', edad: '6 años', partidas: 8, nivel: 'Nivel 2', aciertos: '85%' },
  { nombre: 'Leo', edad: '4 años', partidas: 15, nivel: 'Nivel 2', aciertos: '78%' },
  { nombre: 'Erika', edad: '5 años', partidas: 5, nivel: 'Nivel 1', aciertos: '95%' },
];

const PlayersList = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Listado de Jugadores</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
            type="text" 
            placeholder="Buscar por nombre..." 
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
                <th>Edad</th>
                <th>Partidas Jugadas</th>
                <th>Último Nivel</th>
                <th>% Aciertos Promedio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, paddingLeft: '1.5rem' }}>{p.nombre}</td>
                  <td>
                    <span className="badge blue">{p.edad}</span>
                  </td>
                  <td>{p.partidas}</td>
                  <td>{p.nivel}</td>
                  <td>{p.aciertos}</td>
                  <td>
                    <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Ver Detalle</button>
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
