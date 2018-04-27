/**
 * 定义应用路由
 */
import React from 'react';
import {
  Router,
  // browserHistory,
  hashHistory,
} from 'react-router';

// 路由配置规则参考： https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
// 一下部分是由 ICE 相关工具自动生成的路由，请勿随意改变，否则可能会出现一些异常情况
// <!-- auto generated routes start -->
import SelectSeats from './pages/SelectSeats';
import CustomLayout5 from './layouts/CustomLayout5';
import MovieDetail from './pages/MovieDetail';
import CustomLayout4 from './layouts/CustomLayout4';
import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import Dashboard from './pages/Dashboard';
import CateList from './pages/CateList';
import CreateCate from './pages/CreateCate';
import UserList from './pages/UserList';
import CreateUser from './pages/CreateUser';
import EditPassword from './pages/EditPassword';
import BasicSetting from './pages/BasicSetting';
import NavigationSetting from './pages/NavigationSetting';
import BlankLayout from './layouts/BlankLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
const autoGeneratedRoutes = [{
  path: 'seats/:arrangeId',
  childRoutes: [],
  component: CustomLayout5,
  indexRoute: {
    component: SelectSeats
  }
}, {
  path: 'movieDetail/:movieId',
  childRoutes: [],
  component: CustomLayout5,
  indexRoute: {
    component: MovieDetail
  }
}, {
  path: '/login',
  childRoutes: [],
  component: BlankLayout,
  indexRoute: {
    component: Login
  }
}, {
  path: '/setting',
  childRoutes: [{
    path: 'basic',
    childRoutes: [],
    component: BasicSetting
  }, {
    path: 'navigation',
    childRoutes: [],
    component: NavigationSetting
  }],
  component: HeaderFooterLayout,
  indexRoute: {
    component: BasicSetting
  }
}, {
  path: '/user',
  childRoutes: [{
    path: 'list',
    childRoutes: [],
    component: UserList
  }, {
    path: 'create',
    childRoutes: [],
    component: CreateUser
  }, {
    path: 'pwd',
    childRoutes: [],
    component: EditPassword
  }],
  component: HeaderFooterLayout,
  indexRoute: {
    component: UserList
  }
}, {
  path: '/cate',
  childRoutes: [{
    path: 'list',
    childRoutes: [],
    component: CateList
  }, {
    path: 'create',
    childRoutes: [],
    component: CreateCate
  }],
  component: HeaderFooterLayout,
  indexRoute: {
    component: CateList
  }
}, {
  path: '/',
  childRoutes: [{
    path: '*',
    childRoutes: [],
    component: NotFound
  }],
  component: HeaderFooterLayout,
  indexRoute: {
    component: Dashboard
  }
}];
// <!-- auto generated routes end -->

// 自定义路由，如果 path 相同则会覆盖自动生成部分的路由配置
const customRoutes = [];

export default (
  <Router
    history={hashHistory}
    routes={[...autoGeneratedRoutes, ...customRoutes]}
  />
);
