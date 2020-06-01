import { LayoutAdmin } from '../layout';
import Home from '../views/home/index';
import Resume from '../views/resume';
import ArticleList from '../views/article/list';
import {
  DesktopOutlined,
  FileTextOutlined,
  ProfileOutlined,
  // UserOutlined,
} from '@ant-design/icons';

const router = [
  {
    path: '/',
    component: LayoutAdmin,
    breadcrumbName: '博客后台',
    children: [
      {
        path: '/home',
        component: Home,
        breadcrumbName: '首页',
        icon: DesktopOutlined
      },
      {
        path: '/resume',
        component: Resume,
        breadcrumbName: '简历',
        icon: FileTextOutlined
      },
      {
        path: '/article/list',
        component: ArticleList,
        breadcrumbName: '文章列表',
        icon: ProfileOutlined
      },
    ]
  }
]

export default router;