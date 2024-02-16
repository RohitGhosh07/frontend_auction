import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, authenticated }) => {
  return authenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
