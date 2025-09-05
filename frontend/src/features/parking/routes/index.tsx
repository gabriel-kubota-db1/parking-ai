import { Navigate } from 'react-router-dom';
import { PrivateRoute } from '../../../routes/PrivateRoute';
import { ParkingDashboardPage } from '../pages/ParkingDashboardPage';

export const parkingRoutes = [
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '/dashboard', element: <ParkingDashboardPage /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
    ],
  },
];
