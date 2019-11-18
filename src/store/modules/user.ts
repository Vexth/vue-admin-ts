import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/sessionStorage'
import router, { resetRouter } from '@/router'
import permission from './permission'
import { IUserState } from "@/store/type";
import { MutationTree, ActionTree } from 'vuex';

const state: IUserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
}

const mutations: MutationTree<IUserState> = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_NAME(state, name) {
    state.name = name
  },

  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },

  SET_INTRODUCTION(state, introduction) {
    state.introduction = introduction
  },

  SET_ROLES(state, roles) {
    state.roles = roles
  },

  SET_EMAIL(state, email) {
    state.email = email
  },
}

const actions: ActionTree<IUserState, IUserState> = {
  async Login({ commit }, userInfo: { username: string, password: string}) {
    let { username, password } = userInfo
    username = username.trim()
    const { data } = await login({ username, password })
    setToken(data.accessToken)
    commit('SET_TOKEN', data.accessToken)
  },
  ResetToken({ commit }) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
  },
  async GetUserInfo({ commit, state }) {
    if (state.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo({ /* Your params here */ })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction, email } = data.user
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    commit('SET_ROLES', roles)
    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
    commit('SET_INTRODUCTION', introduction)
    commit('SET_EMAIL', email)
  },
  async ChangeRoles({ commit, state, dispatch }, role) {
    // Dynamically modify permissions
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    
    await dispatch('GetUserInfo')
    resetRouter()
    // Generate dynamic accessible routes based on roles
    permission.mutations.GenerateRoutes(state.roles as any)
    // Add generated routes
    router.addRoutes(permission.state.dynamicRoutes)
    // Reset visited views and cached views
    dispatch('delAllViews')
  },
  async LogOut({ commit ,state, dispatch }) {
    if (state.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    dispatch('delAllViews')
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
}
