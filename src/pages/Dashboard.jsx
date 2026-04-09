import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Nivel 1', aciertos: 90 },
  { name: 'Nivel 2', aciertos: 75 },
  { name: 'Nivel 3', aciertos: 60 },
  { name: 'Nivel 4', aciertos: 45 },
];

const recientes = [
  { jugador: 'Santi', edad: 5, nivel: 2, aciertos: '18/20', fecha: '2026-03-07' },
  { jugador: 'Gian', edad: 6, nivel: 3, aciertos: '15/20', fecha: '2026-03-07' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard de Desempeño</h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #eaeaea' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Filtrar por:</span>
        <select className="input-field" style={{ padding: '0.4rem', fontSize: '0.85rem' }}>
            <option>Rango de Edad (Todas)</option>
        </select>
        <select className="input-field" style={{ padding: '0.4rem', fontSize: '0.85rem' }}>
            <option>Nivel (Todos)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Partidas Jugadas</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>124</h2>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Promedio Aciertos</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>85%</h2>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Promedio Errores</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>15%</h2>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 24, height: 8, backgroundColor: 'var(--primary)', display: 'inline-block' }}></span> Promedio de Aciertos por Nivel
            </span>
        </div>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} onClick={() => navigate('/dashboard/detalles')}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={{stroke: '#E5E7EB'}} />
              <YAxis tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={{stroke: '#E5E7EB'}} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
              <Bar dataKey="aciertos" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={80} style={{ cursor: 'pointer' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Detalle de Sesiones Recientes</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Edad</th>
                <th>Nivel</th>
                <th>Aciertos</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recientes.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.jugador}</td>
                  <td>{r.edad}</td>
                  <td>{r.nivel}</td>
                  <td>{r.aciertos}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{r.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
