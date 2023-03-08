<template>
    <button>
        <slot></slot>
    </button>
</template>

<script type='text/ecmascript-6'>


export default {
    data() {
        return {

        }
    },
    props: [''],
    computed: {

    },
    mounted() {

    },
    methods: {
        noop() {

        }
    }
}
</script>

<style lang='less' scoped>
button {
    cursor: pointer;
    border: 0;
    outline: 0;
    border-radius: 5px;
    width: 112px;
    height: 40px;
    box-shadow: none;
    color: #fff;
    background-color: #4e6ef2;
    font-size: 17px;
    line-height: 41px;
    line-height: 40px;
    font-weight: 400;
    letter-spacing: normal;
    box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.5);

}
</style>