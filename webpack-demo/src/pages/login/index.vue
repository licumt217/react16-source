<template>
    <div>
        <my-header>登录</my-header>
        <img src="../../assets/images/tjd.png" style="width:50px;" />

        <div>
            <my-button @click.native="go('myCar')">我的汽车</my-button>
            <my-button @click.native="go('myOrder')">我的订单</my-button>
            <my-button @click.native="go('myWallet')">我的钱包</my-button>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import MyHeader from '@components/MyHeader'
import MyButton from '../../components/MyButton/index.vue'
import Utils from 'Utils';


export default {
    components: {
        MyHeader, MyButton
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
        go(path) {
            this.$router.push('/' + path)
        }
    }
}

</script>


<style lang="less" scoped>
div>button {
    margin: 0 1em;
}
</style>
