import elementVariables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

import { ISettingsState } from "@/store/type";
import { MutationTree, ActionTree } from 'vuex';

const state: ISettingsState = {
  theme: elementVariables.theme,
  fixedHeader: defaultSettings.fixedHeader,
  showSettings: defaultSettings.showSettings,
  showTagsView: defaultSettings.showTagsView,
  showSidebarLogo: defaultSettings.showSidebarLogo,
  sidebarTextTheme: defaultSettings.sidebarTextTheme,
}

const mutations: MutationTree<ISettingsState> = {
  CHANGE_SETTING(state, payload) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (state as any)[key] = value
    }
  }
}

const actions: ActionTree<ISettingsState, ISettingsState> = {
  ChangeSetting({ commit }, payload) {
    commit('CHANGE_SETTING', payload)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
}
