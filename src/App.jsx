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
import NideLanding from './pages/NideLanding';
import AcercaDe from './pages/AcercaDe';
import Juego from './pages/Juego';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/nide" element={<NideLanding />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>

      {/* Rutas Privadas (Admin Panel) */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/detalles/:id" element={<DetailedAnalysis />} />
        <Route path="/jugadores" element={<PlayersList />} />
        <Route path="/cuentas" element={<AccountManagement />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
