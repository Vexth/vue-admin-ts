import Vue from 'vue'
import store from "@/store";
import { isArray } from '@/utils/validate'
import settings from '@/settings'

const { errorLog: needErrorLog } = settings

const checkNeed = () => {
  const env = process.env.NODE_ENV
  if (isArray(needErrorLog) && env) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info) {
    store.dispatch('AddErrorLog', { err, vm, info, url: window.location.href })
  }
}
