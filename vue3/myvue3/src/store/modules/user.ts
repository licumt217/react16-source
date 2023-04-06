import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const Profile = new URL("@/assets/image/profile.jpg", import.meta.url).href;

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permissions: [],
        id: '',
        phone: ''
    },

    mutations: {
        SET_TOKEN: (state: any, token: any) => {
            state.token = token
        },
        SET_NAME: (state: any, name: any) => {
            state.name = name
        },
        SET_PHONE: (state: any, phone: any) => {
            state.phone = phone
        },
        SET_AVATAR: (state: any, avatar: any) => {
            state.avatar = avatar
        },
        SET_ROLES: (state: any, roles: any) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state: any, permissions: any) => {
            state.permissions = permissions
        },
        SET_USER_ID: (state: any, id: any) => {
            state.id = id
        }
    },

    actions: {
        // 登录
        Login({ commit }: { commit: any }, userInfo: any) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then((res: any) => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve(null)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit }: { commit: any, state: any }) {
            return new Promise((resolve, reject) => {
                getInfo().then((res: any) => {
                    const user = res.user
                    const avatar = user.avatar == ""
                        ? Profile
                        : user.avatar;
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                        commit('SET_USER_ID', res.user.userId)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.nickName)
                    commit('SET_PHONE', user.phonenumber)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit }: { commit: any, state: any }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve(null)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }: { commit: any }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve(null)
            })
        }
    }
}

export default user
