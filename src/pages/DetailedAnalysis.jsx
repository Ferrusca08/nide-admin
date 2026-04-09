import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'MA', value: 35, color: '#4CAF50' },
  { name: 'ME', value: 25, color: '#2196F3' },
  { name: 'PA', value: 15, color: '#FFEB3B' },
  { name: 'PE', value: 10, color: '#FF9800' },
  { name: 'PU', value: 45, color: '#F44336' },
];

const lineData = [
  { day: 'Lun', time: 12 },
  { day: 'Mar', time: 10 },
  { day: 'Mie', time: 8 },
  { day: 'Jue', time: 9 },
  { day: 'Vie', time: 7 },
  { day: 'Sab', time: 5 },
];

const ultimosJugadores = [
  { jugador: 'Leo', intentos: 2, estatus: 'Completado', fecha: '2026-03-07', _color: 'var(--success)' },
  { jugador: 'Erika', intentos: 5, estatus: 'En curso', fecha: '2026-03-06', _color: 'var(--warning)' },
];

const DetailedAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/dashboard')}>
        &larr; Dashboard General
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Análisis Detallado: Nivel 2</h1>
        <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
          Nivel 2: Sílabas Simples (M, P, S)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Acierto más común</p>
          <h2 style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem' }}>Sílaba "MA"</h2>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Sílaba con más errores</p>
          <h2 style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem' }}>Sílaba "PU"</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Distribución de Errores por Sílaba</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
            {pieData.map(entry => (
                <span key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ width: 12, height: 4, backgroundColor: entry.color }}></div> {entry.name}
                </span>
            ))}
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={0} outerRadius={120} dataKey="value" stroke="white" strokeWidth={2}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Tiempo Promedio de Respuesta (segundos)</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <div style={{ width: 16, height: 4, backgroundColor: 'var(--primary)' }}></div> Segundos por respuesta
            </span>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="time" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Últimos Jugadores en este Nivel (RF-31)</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Intentos</th>
                <th>Estatus</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ultimosJugadores.map((j, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{j.jugador}</td>
                  <td>{j.intentos}</td>
                  <td style={{ color: j._color, fontWeight: 500 }}>{j.estatus}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{j.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
