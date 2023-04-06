import profile from '@/assets/image/profile.jpg'

const getters = {
    sidebar: (state: any) => state.app.sidebar,
    size: (state: any) => state.app.size,
    device: (state: any) => state.app.device,
    visitedViews: (state: any) => state.tagsView.visitedViews,
    cachedViews: (state: any) => state.tagsView.cachedViews,
    token: (state: any) => state.user.token,
    avatar: (state: any) => state.user.avatar || profile,
    name: (state: any) => state.user.name,
    phone: (state: any) => state.user.phone,
    introduction: (state: any) => state.user.introduction,
    roles: (state: any) => state.user.roles,
    permissions: (state: any) => state.user.permissions,
    permission_routes: (state: any) => state.permission.routes,
    park: (state: any) => state.park,
    userId: (state: any) => state.user.id
}
export default getters
