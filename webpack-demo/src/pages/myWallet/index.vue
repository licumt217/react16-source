<template>
    <div v-title="'登录停简单'">
        <h1>我的钱包</h1>
        <div>
            <button @click="back">返回登录页面</button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">



export default {
    components: {
    },
    directives: {
    },
    data() {
        return {

        }
    },
    computed: {

    },
    mounted() {
    },
    methods: {
        back() {
            this.$router.push('/login')
        }
    }
}

</script>


