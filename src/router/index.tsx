import { LayoutAdmin } from '../layout';
import Home from '../views/dashboard/index';

const router = [
  {
    path: '/',
    component: LayoutAdmin,
    routes: [
      {
        path: '/home',
        component: Home
      }
    ]
  }
]

export default router;