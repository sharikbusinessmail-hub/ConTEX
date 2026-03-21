import { createBrowserRouter } from 'react-router';
import { ConTEXStorefront } from './pages/ConTEXStorefront';
import { CategoryPage } from './pages/CategoryPage';
import { SeedDatabase } from './pages/SeedDatabase';
import AdminProducts from './pages/AdminProducts';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ConTEXStorefront,
  },
  {
    path: '/seed',
    Component: SeedDatabase,
  },
  {
    path: '/collections/:gender',
    Component: CategoryPage,
  },
  {
    path: '/collections/:gender/:category',
    Component: CategoryPage,
  },
  {
    path: '/admin/products',
    Component: AdminProducts,
  },
]);