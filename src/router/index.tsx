import {
  DesktopOutlined,
  FileTextOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LayoutAdminRoute } from '../layout';
import Home from '../views/home/index';
import Resume from '../views/resume';
import ArticleList from '../views/article/list';
import Login from '../views/login';
import ArticleRoute from '../views/article';
import AppRoute from '../App';
import SystemRoute from '../views/system';
import SystemUsers from '../views/system/users';

const routes = [
  {
    component: AppRoute,
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        component: LayoutAdminRoute,
        routes: [
          {
            path: '/home',
            component: Home,
            name: '首页',
            icon: DesktopOutlined,
          },
          {
            path: '/resume',
            component: Resume,
            name: '简历',
            icon: FileTextOutlined,
          },
          {
            path: '/article',
            component: ArticleRoute,
            name: '文章管理',
            routes: [
              {
                path: '/article/list',
                component: ArticleList,
                name: '文章列表',
                icon: ProfileOutlined,
              }
            ]
          },
          {
            path: '/system',
            component: SystemRoute,
            name: '系统管理',
            routes: [
              {
                path: '/system/users',
                component: SystemUsers,
                name: '用户管理',
                icon: UserOutlined,
              }
            ]
          }
        ]
      }
    ]
  }
];

export default routes;