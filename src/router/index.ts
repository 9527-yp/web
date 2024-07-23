import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Layout from "@/layout/index.vue";

export const routes: RouteRecordRaw[] = [
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
  // {
  //   path: '/system',
  //   name: 'system',
  //   component: Layout,
  //   redirect: '/system/user',
  //   children: [
  //     {
  //       path: '/system/user', // [唯一]
  //       component: () => import("@/views/system/user/index.vue"),
  //       meta: {
  //         title: "用户管理", // 标题
  //         icon: "User", // 图标
  //         isHide: "0", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
  //         isLink: "", // 是否外链[有值则是外链]
  //         isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
  //         isFull: "1", // 是否缓存全屏[0是，1否]
  //         isAffix: "0" // 是否缓存固定路由[0是，1否]
  //       }
  //     },
  //     {
  //       path: '/system/role', // [唯一]
  //       component: () => import("@/views/system/role/index.vue"),
  //       meta: {
  //         title: "角色管理", // 标题
  //         icon: "Camera", // 图标
  //         isHide: "0", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
  //         isLink: "", // 是否外链[有值则是外链]
  //         isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
  //         isFull: "1", // 是否缓存全屏[0是，1否]
  //         isAffix: "0" // 是否缓存固定路由[0是，1否]
  //       }
  //     },
  //     {
  //       path: '/system/menu', // [唯一]
  //       component: () => import("@/views/system/menu/index.vue"),
  //       meta: {
  //         title: "菜单管理", // 标题
  //         icon: "Menu", // 图标
  //         isHide: "0", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
  //         isLink: "", // 是否外链[有值则是外链]
  //         isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
  //         isFull: "1", // 是否缓存全屏[0是，1否]
  //         isAffix: "0" // 是否缓存固定路由[0是，1否]
  //       }
  //     },
  //   ]
  // }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
