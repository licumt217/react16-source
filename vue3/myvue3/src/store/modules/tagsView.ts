const state = {
    visitedViews: [],
    cachedViews: []
}

const mutations = {
    ADD_VISITED_VIEW: (state: any, view: any) => {
        if (state.visitedViews.some((v: any) => v.path === view.path)) return
        state.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            })
        )
    },
    ADD_CACHED_VIEW: (state: any, view: any) => {
        if (state.cachedViews.includes(view.name)) return
        if (!view.meta.noCache) {
            state.cachedViews.push(view.name)
        }
    },

    DEL_VISITED_VIEW: (state: any, view: any) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
    },
    DEL_CACHED_VIEW: (state: any, view: any) => {
        const index = state.cachedViews.indexOf(view.name)
        index > -1 && state.cachedViews.splice(index, 1)
    },

    DEL_OTHERS_VISITED_VIEWS: (state: any, view: any) => {
        state.visitedViews = state.visitedViews.filter((v: any) => {
            return v.meta.affix || v.path === view.path
        })
    },
    DEL_OTHERS_CACHED_VIEWS: (state: any, index: any) => {
        if (index > -1) {
            state.cachedViews = state.cachedViews.slice(index, index + 1)
        } else {
            state.cachedViews = []
        }
    },

    DEL_ALL_VISITED_VIEWS: (state: any) => {
        // keep affix tags
        const affixTags = state.visitedViews.filter((tag: any) => tag.meta.affix)
        state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: (state: any) => {
        state.cachedViews = []
    },

    UPDATE_VISITED_VIEW: (state: any, view: any) => {
        for (let v of state.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view)
                break
            }
        }
    }
}

const actions = {
    addView({ dispatch }: { dispatch: any }, view: any) {
        dispatch('addVisitedView', view)
        dispatch('addCachedView', view)
    },
    addVisitedView({ commit }: { commit: any }, view: any) {
        commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }: { commit: any }, view: any) {
        commit('ADD_CACHED_VIEW', view)
    },

    delView({ dispatch, state }: { dispatch: any, state: any }, view: any) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view)
            dispatch('delCachedView', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    delVisitedView({ commit, state }: { commit: any, state: any }, view: any) {
        return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view)
            resolve([...state.visitedViews])
        })
    },
    delCachedView({ commit, state }: { commit: any, state: any }, view: any) {
        return new Promise(resolve => {
            commit('DEL_CACHED_VIEW', view)
            resolve([...state.cachedViews])
        })
    },

    delOthersViews({ dispatch, state }: { dispatch: any, state: any }, view: any) {
        return new Promise(resolve => {
            dispatch('delOthersVisitedViews', view)
            dispatch('delOthersCachedViews', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    delOthersVisitedViews({ commit, state }: { commit: any, state: any }, view: any) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve([...state.visitedViews])
        })
    },
    delOthersCachedViews({ commit, state }: { commit: any, state: any }, view: any) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_CACHED_VIEWS', view)
            resolve([...state.cachedViews])
        })
    },

    delAllViews({ dispatch, state }: { dispatch: any, state: any }, view: any) {
        return new Promise(resolve => {
            dispatch('delAllVisitedViews', view)
            dispatch('delAllCachedViews', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    delAllVisitedViews({ commit, state }: { commit: any, state: any }) {
        return new Promise(resolve => {
            commit('DEL_ALL_VISITED_VIEWS')
            resolve([...state.visitedViews])
        })
    },
    delAllCachedViews({ commit, state }: { commit: any, state: any }) {
        return new Promise(resolve => {
            commit('DEL_ALL_CACHED_VIEWS')
            resolve([...state.cachedViews])
        })
    },

    updateVisitedView({ commit }: { commit: any }, view: any) {
        commit('UPDATE_VISITED_VIEW', view)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
