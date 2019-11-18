import { ITagsViewState } from "@/store/type";
import { MutationTree, ActionTree } from 'vuex';

const state: ITagsViewState = {
  visitedViews: [],
  cachedViews: [],
}

const mutations: MutationTree<ITagsViewState> = {
  ADD_VISITED_VIEW(state, view) {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW(state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEW(state, view) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  DEL_OTHERS_VISITED_VIEWS(state, view) {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  DEL_ALL_VISITED_VIEWS(state) {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = []
  },
  UPDATE_VISITED_VIEW(state, view) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions: ActionTree<ITagsViewState, ITagsViewState> = {
  addView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
    commit('ADD_CACHED_VIEW', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  delView({ commit }, view) {
    commit('DEL_VISITED_VIEW', view)
    commit('DEL_CACHED_VIEW', view)
  },
  delCachedView({ commit }, view) {
    commit('DEL_CACHED_VIEW', view)
  },
  delOthersViews({ commit }, view) {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
    commit('DEL_OTHERS_CACHED_VIEWS', view)
  },
  delAllViews({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS')
    commit('DEL_ALL_CACHED_VIEWS')
  },
  delAllCachedViews({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS')
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
}
