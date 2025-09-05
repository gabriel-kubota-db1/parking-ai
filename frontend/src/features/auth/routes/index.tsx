import { Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';

export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <Navigate to="/login" /> },
];
