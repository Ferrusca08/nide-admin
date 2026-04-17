import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DetailedAnalysis = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnoData = async () => {
        try {
            const res = await fetch(`https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/estadisticas/alumno/${id}`);
            const data = await res.json();
            if (data.exito) {
                setStats(data);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };
    if (id) fetchAlumnoData();
  }, [id]);

  if (loading) {
      return <div style={{ padding: '3rem', textAlign: 'center' }}><h2>Analizando Partidas Individuales...</h2></div>;
  }

  if (!stats) {
      return <div style={{ padding: '3rem', textAlign: 'center', color: '#e11d48' }}><h2>Alumno no encontrado o sin datos.</h2></div>;
  }

  // Derived stats
  const peorSilaba = stats.peores_silabas && stats.peores_silabas.length > 0 ? stats.peores_silabas[0].name : 'N/A';
  const totalErroresGlobales = stats.errores_nivel.reduce((sum, n) => sum + parseInt(n.errores || 0), 0);
  const nivelMasJugado = stats.errores_nivel && stats.errores_nivel.length > 0 ? stats.errores_nivel[0].descripcion : 'Fase Inicial';

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/jugadores')}>
        &larr; Volver al Listado de Jugadores
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
            <span style={{color: 'white', background: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold'}}>Alumno #{id}</span>
            <h1 className="page-title" style={{ margin: '0.5rem 0 0 0' }}>Expediente de: {stats.perfil.nombre} ({stats.perfil.edad} años)</h1>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
          {nivelMasJugado}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #eab308' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Total de Errores Históricos</p>
          <h2 style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem' }}>{totalErroresGlobales}</h2>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Pregunta o Sílaba más crítica</p>
          <h2 style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem' }}>"{peorSilaba}"</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Descomposición de Peores Errores</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, flexWrap: 'wrap' }}>
            {stats.peores_silabas.map(entry => (
                <span key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ width: 12, height: 4, backgroundColor: entry.color }}></div> {entry.name}
                </span>
            ))}
            {stats.peores_silabas.length === 0 && <span>No se registraron errores</span>}
          </div>
          <div style={{ width: '100%', height: 300 }}>
            {stats.peores_silabas.length > 0 ? (
                <ResponsiveContainer>
                <PieChart>
                    <Pie data={stats.peores_silabas} cx="50%" cy="50%" innerRadius={0} outerRadius={120} dataKey="value" stroke="white" strokeWidth={2}>
                    {stats.peores_silabas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            ) : (
                <div style={{ textAlign:'center', paddingTop: '15%'}}>Información insuficiente de juego.</div>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Evolución de Comportamiento</h3>
          <p style={{fontSize: '0.85rem', color: '#666', marginTop: '-0.5rem', marginBottom: '1rem'}}>Línea de Vida Total de Errores Cronológicos</p>
          <div style={{ width: '100%', height: 300 }}>
            {stats.evolucion.length > 0 ? (
            <ResponsiveContainer>
              <LineChart data={stats.evolucion} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="time" stroke="#e11d48" strokeWidth={3} dot={{ r: 4, fill: '#e11d48' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            ) : (
             <div style={{ textAlign:'center', paddingTop: '15%'}}>No tiene partidas guardadas en su registro.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
