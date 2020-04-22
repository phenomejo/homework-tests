import Vue from 'vue'
import Vuex from 'vuex'
import factools from '@/api/factools'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    catalogList: [],
    totalCatalog: {},
  },
  getters: {},
  mutations: {
    setCatalog (state, payload) {
      state['catalogList'] = payload
    },
    setTotalCatalog (state, payload) {
      state['totalCatalog'] = payload
    }
  },
  actions: {
    async getCatalog ({ commit }, params) {
      const { data, meta } = await factools.filter({ params })
      commit('setCatalog', data)
      commit('setTotalCatalog', meta)
    }
  }
})

// export default store