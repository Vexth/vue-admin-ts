import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'

import { IPermissionState } from "@/store/type";
import { MutationTree, ActionTree } from 'vuex';

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

const state: IPermissionState = {
  routes: [],
  dynamicRoutes: [],
}

const mutations: MutationTree<IPermissionState> = {
  SET_ROUTES(state, routes) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  }
}

const actions: ActionTree<IPermissionState, IPermissionState> = {
  GenerateRoutes({ commit }, roles) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit('SET_ROUTES', accessedRoutes)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
}
