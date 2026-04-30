import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totales: { partidas_jugadas: 0, promedio_errores_global: 0 },
    niveles: [],
    por_edad: [],
    infantes_riesgo: []
  });
  const [loading, setLoading] = useState(true);
  const [edadFiltro, setEdadFiltro] = useState('Todas');

  useEffect(() => {
    const fetchGeneralStats = async () => {
        setLoading(true);
        try {
            const url = `https://ampi8wp2ei.execute-api.us-east-1.amazonaws.com/estadisticas/general${edadFiltro !== 'Todas' ? `?edad=${edadFiltro}` : ''}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.exito) setStats(data);
        } catch (e) {
            console.error("Error cargando estadisticas: ", e);
        }
        setLoading(false);
    };
    fetchGeneralStats();
  }, [edadFiltro]);

  if (loading) {
      return <div style={{ padding: '3rem', textAlign: 'center' }}><h2>Cargando motor analítico...</h2></div>;
  }

  // Calculate percentages
  const promedioGeneralErrores = parseFloat(stats.totales.promedio_errores_global).toFixed(1);
  const porcentajeAciertoGeneral = Math.max(0, 100 - (promedioGeneralErrores * 10)).toFixed(1);

  return (
    <div className="animate-fade-in">
      <h1 className="page-title">Dashboard Analítico (En Vivo)</h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #eaeaea' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Filtrar por:</span>
        <select className="input-field" style={{ padding: '0.4rem', fontSize: '0.85rem' }} value={edadFiltro} onChange={e => setEdadFiltro(e.target.value)}>
            <option value="Todas">Rango de Edad (Todas)</option>
            {stats.por_edad.map((e, i) => (
                <option value={e.edad} key={i}>Alumnos de {e.edad} años</option>
            ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Universo de Partidas</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>{stats.totales.partidas_jugadas}</h2>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Promedio Global de Aciertos</p>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--success)', margin: 0 }}>{porcentajeAciertoGeneral}%</h2>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Errores Brutos Promedio</p>
          <h2 style={{ fontSize: '2.5rem', color: '#e11d48', margin: 0 }}>{promedioGeneralErrores}</h2>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 24, height: 8, backgroundColor: 'var(--primary)', display: 'inline-block' }}></span> Precisión Promediada por Nivel Académico
            </span>
        </div>
        <div style={{ width: '100%', height: 400 }}>
          {stats.niveles.length > 0 ? (
          <ResponsiveContainer>
            <BarChart data={stats.niveles} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} onClick={() => navigate('/dashboard/detalles')}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={{stroke: '#E5E7EB'}} />
              <YAxis tick={{fill: '#6E6E73', fontSize: 12}} tickLine={false} axisLine={{stroke: '#E5E7EB'}} domain={[0, 100]} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
              <Bar dataKey="aciertos" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={80} style={{ cursor: 'pointer' }} />
            </BarChart>
          </ResponsiveContainer>
          ) : (
            <div style={{textAlign: 'center', margin: 'auto', paddingTop: '10%'}}><p>Aún no hay partidas jugadas para graficar niveles.</p></div>
          )}
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #e11d48' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#e11d48' }}>
            ⚠️ Alerta Temprana: Infantes en Riesgo de Rezago
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Nuestro algoritmo detecta a los estudiantes cuya cantidad de errores incrementó severamente entre su primera partida histórica y la última registrada. El sistema sugiere atención personalizada guiada por el educador.
        </p>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Jugador Afectado</th>
                <th>Edad</th>
                <th>Errores Iniciales</th>
                <th>Errores Última Partida</th>
                <th>Estado Sugerido</th>
              </tr>
            </thead>
            <tbody>
              {stats.infantes_riesgo && stats.infantes_riesgo.length > 0 ? stats.infantes_riesgo.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{r.nombre}</td>
                  <td>{r.edad} años</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{r.errores_iniciales}</td>
                  <td style={{ color: '#e11d48', fontWeight: 600 }}>{r.errores_finales} ⬆</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3' }}>Intervención Requerida</span>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: 'var(--success)', fontWeight: 'bold' }}>
                        ¡Excelente! No se detectan alumnos manifestando aumento de errores a través del tiempo.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
