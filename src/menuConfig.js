// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: '模型管理',
    path: '/management',
    icon: 'home2',
  },
  {
    name: '模型市场',
    path: '/market',
    icon: 'cascades',
  },
  {
    name: '视频监控',
    path: '/performance',
    icon: 'repair',
  },
  {
    name: '摄像头管理',
    path: '/cmanagement',
    icon: 'home2',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice/issues/new',
    icon: 'question2',
    external: true,
    newWindow: true,
  },
];

const headerMenuConfig = asideMenuConfig;

export default headerMenuConfig;
