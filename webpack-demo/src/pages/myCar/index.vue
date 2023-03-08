<template>
    <div v-title="'登录停简单'">
        <my-header>我的汽车</my-header>
        <div>
            <button @click="back">返回登录页面</button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import _ from 'lodash'
import MyHeader from '@components/MyHeader'


export default {
    components: {
        MyHeader
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
            console.log(_.join(['aaac', 'bbbc']))
            this.$router.push('/login')
        }
    }
}

</script>


