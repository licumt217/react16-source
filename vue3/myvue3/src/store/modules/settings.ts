import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
}

const mutations = {
    CHANGE_SETTING: (state: any, { key, value }: { key: any, value: any }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit }: { commit: any }, data: any) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

