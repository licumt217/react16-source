import Cookies from 'js-cookie'

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+(Cookies.get('sidebarStatus') as any) : true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium'
}

const mutations = {
    TOGGLE_SIDEBAR: (state: any) => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', String(1))
        } else {
            Cookies.set('sidebarStatus', String(0))
        }
    },
    CLOSE_SIDEBAR: (state: any, withoutAnimation: any) => {
        Cookies.set('sidebarStatus', String(0))
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: any, device: any) => {
        state.device = device
    },
    SET_SIZE: (state: any, size: any) => {
        state.size = size
        Cookies.set('size', size)
    }
}

const actions = {
    toggleSideBar({ commit }: { commit: any }) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: { commit: any }, { withoutAnimation }: { withoutAnimation: any }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: { commit: any }, device: string) {
        commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }: { commit: any }, size: number) {
        commit('SET_SIZE', size)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
