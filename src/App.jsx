import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DetailedAnalysis from './pages/DetailedAnalysis';
import PlayersList from './pages/PlayersList';
import AccountManagement from './pages/AccountManagement';

function App() {
  return (
    <Routes>
      {/* Rutas Públicas (Login) */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>

      {/* Rutas Privadas (Admin Panel) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/detalles" element={<DetailedAnalysis />} />
        <Route path="/jugadores" element={<PlayersList />} />
        <Route path="/cuentas" element={<AccountManagement />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
