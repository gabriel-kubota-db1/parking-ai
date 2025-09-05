import { useRoutes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authRoutes } from '../features/auth/routes';
import { parkingRoutes } from '../features/parking/routes';
import { PageLayout } from '../components/PageLayout';

export const AppRoutes = () => {
  const { user } = useAuth();

  const commonRoutes = [{ path: '/', element: <div>Home</div> }];
  const routes = user ? parkingRoutes : authRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <PageLayout>{element}</PageLayout>;
};
