import { IErrorLogState } from "@/store/type";
import { MutationTree, ActionTree } from 'vuex';

const state: IErrorLogState = {
  logs: [],
}

const mutations: MutationTree<IErrorLogState> = {
  ADD_ERROR_LOG(state, log) {
    state.logs.push(log)
  },

  CLEAR_ERROR_LOG(state) {
    state.logs.splice(0)
  }
}

const actions: ActionTree<IErrorLogState, IErrorLogState> = {
  AddErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  ClearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
}
