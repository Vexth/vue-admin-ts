import { GetterTree } from 'vuex'
import { IRootState } from "./type";

const getters: GetterTree<IRootState, IRootState> = {
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  language: state => state.app.language,

  logs: state => state.errorLog.logs,

  routes: state => state.permission.routes,
  dynamicRoutes: state => state.permission.dynamicRoutes,

  theme: state => state.settings.theme,
  fixedHeader: state => state.settings.fixedHeader,
  showSettings: state => state.settings.showSettings,
  showTagsView: state => state.settings.showTagsView,
  showSidebarLogo: state => state.settings.showSidebarLogo,
  sidebarTextTheme: state => state.settings.sidebarTextTheme,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  email: state => state.user.email,
}

export default getters;
