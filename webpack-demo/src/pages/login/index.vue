<template>
    <div>
        <my-header>登录</my-header>
        <img src="../../assets/images/tjd.png" style="width:50px;" />
        <div id="div"></div>

        <div>
            <my-button @click.native="go('myCar')">我的汽车</my-button>
            <my-button @click.native="go('myOrder')">我的订单</my-button>
            <my-button @click.native="go('myWallet')">我的钱包</my-button>
            <my-button @click.native="genDiv">div</my-button>
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
        console.log(process.env.NODE_ENV)
    },
    methods: {
        genDiv() {
            console.log(m + 3)
            jQuery("#div").html("xxxxxx")
        },
        go(path) {
            this.$router.push('/' + path)
        }
    }
}

</script>


<style lang="less" scoped>
@import url("../../assets/css/common.css");
</style>
