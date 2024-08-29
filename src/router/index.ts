import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import useUserStore from '@/stores/modules/user'
import useAuthStore from '@/stores/modules/auth'
import { initDynamicRouter } from "@/router/modules/dynamicRouter.ts";

import Layout from "@/layout/index.vue";

export const layoutRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "登录"
    },
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: '/home/index', // [唯一]
        component: () => import("@/views/Home/index.vue"),
        meta: {
          title: "首页", // 标题
          icon: "HomeFilled", // 图标
          isHide: "0", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
          isLink: "", // 是否外链[有值则是外链]
          isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
          isFull: "1", // 是否缓存全屏[0是，1否]
          isAffix: "0" // 是否缓存固定路由[0是，1否]
        }
      }
    ]
  },
];

export const routes: RouteRecordRaw[] = [
  /** 首页 */
  {
    path: "/home/index", // [唯一]
    component: () => import("@/views/Home/index.vue"),
    meta: {
      title: "首页", // 标题
      icon: "HomeFilled", // 图标 HomeFilled
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: "", // 是否外链[有值则是外链]
      isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
      isFull: "1", // 是否缓存全屏[0是，1否]
      isAffix: "0" // 是否缓存固定路由[0是，1否]
    }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes: [...layoutRouter ,...routes]
})

/**
 * @description 前置路由
 * */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

  const userStore = useUserStore();
  const authStore = useAuthStore();

  // 2、标题切换，没有防止后置路由，是因为页面路径不存在，title会变成undefined
  const title = import.meta.env.VITE_WEB_TITLE;
  document.title = to.meta.title || title;

  // 3、判断是访问登陆页，有Token访问当前页面，token过期访问接口，axios封装则自动跳转登录页面，没有Token重置路由到登陆页。
  if (to.path.toLocaleLowerCase() === '/login') {
    // 有Token访问当前页面
    if (userStore.token) {
      return next(from.fullPath);
    } else {
      // koiMsgWarning("账号身份已过期，请重新登录🌻");
    }
    // 没有Token重置路由到登陆页。
    resetRouter();
    return next();
  }

  // 4、判断访问页面是否在路由白名单地址[静态路由]中，如果存在直接放行。
  // if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 5、判断是否有 Token，没有重定向到 login 页面。
  if (!userStore.token) return next({ path: '/login', replace: true });

  // 6、如果没有菜单列表[一级扁平化路由 OR 递归菜单路由数据判断是否存在都阔以]，就重新请求菜单列表并添加动态路由。
  if (!authStore.getMenuList.length) {
    // 注意：authStore.getMenuList，不能持久化菜单数据，否则这里一直有值，就不会走这里，而且持久化之后还会被篡改数据。
    // 获取相关菜单数据 && 按钮数据 && 角色数据 && 用户信息。
    console.log("刷新页面");
    await initDynamicRouter();
    return next({ ...to, replace: true }); // ...to 保证路由添加完了再进入页面 (可以理解为重进一次) replace: true 重进一次, 不保留重复历史
  }
  // 7、正常访问页面。
  return next();
})

/**
 * @description 重置路由
 */
export const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.getMenuList.forEach((route: any) => {
    const { name } = route;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
};

export default router
