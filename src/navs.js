// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  }
];

const customAsideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '上映管理',
    to: '/post',
    icon: 'copy',
    children: [
      { text: '上映列表', to: '/post/list' },
      { text: '添加上映', to: '/post/create' },
    ],
  },
  {
    text: '电影管理',
    to: '/movie',
    icon: 'cascades',
    children: [
      { text: '上映列表', to: '/movie/list' },
      { text: '添加上映', to: '/movie/create' },
    ],
  },
  {
    text: '用户管理',
    to: '/user',
    icon: 'yonghu',
    children: [
      { text: '用户列表', to: '/user/list' },
      { text: '添加用户', to: '/user/create' },
      { text: '修改密码', to: '/user/pwd' },
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
