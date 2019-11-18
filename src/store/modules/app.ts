import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from '@/utils/sessionStorage'
import { getLocale } from '@/lang'

import { IAppState, DeviceType } from "@/store/type";
import { MutationTree, ActionTree } from 'vuex';

const state: IAppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  size: getSize() || 'mini',
  language: getLocale(),
}

const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR(state, withoutAnimation) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },
  CLOSE_SIDEBAR(state, withoutAnimation) {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },
  TOGGLE_DEVICE(state, device) {
    state.device = device
  },
  SET_LANGUAGE(state, language) {
    state.language = language
    setLanguage(state.language)
  },
  SET_SIZE(state, size) {
    state.size = size
    setSize(state.size)
  }
}

const actions: ActionTree<IAppState, IAppState> = {
  ToggleSideBar({ commit }, withoutAnimation) {
    commit('TOGGLE_SIDEBAR', withoutAnimation)
  },

  CloseSideBar({ commit }, withoutAnimation) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },

  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },

  SetLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },

  SetSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
}
