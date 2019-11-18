import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'
import { IRootState } from "./type";

import getters from "./getters";

import app from "./modules/app";
import errorLog from "./modules/error-log";
import permission from "./modules/permission";
import settings from "./modules/settings";
import tagsView from "./modules/tags-view";
import user from "./modules/user";

Vue.use(Vuex)

const modules: ModuleTree<any> = {
  app,
  errorLog,
  permission,
  settings,
  tagsView,
  user,
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  getters,
  modules,
})
