import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './ExamplesDocsApp';
import navConfig from './nav.config.json';
import routes from './router.config';
import SideNav from './components/side-nav';
import DemoBlock from './components/demo-block';
import ZanUI from 'src/index.js';

import 'packages/zanui-css/src/index.css';

Vue.use(VueRouter);
Vue.use(ZanUI);
Vue.component('side-nav', SideNav);
Vue.component('demo-block', DemoBlock);

let routesConfig = routes(navConfig);
routesConfig.push({
  path: '/',
  redirect: '/component/button'
});

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routesConfig
});

let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    indexScrollTop = document.body.scrollTop;
  }
  document.title = route.meta.title || document.title;
  next();
});

router.afterEach(route => {
  if (route.path !== '/') {
    document.body.scrollTop = 0;
  } else {
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop;
    });
  }
});

new Vue({ // eslint-disable-line
  render: h => h(App),
  router
}).$mount('#app-container');
