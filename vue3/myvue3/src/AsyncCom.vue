<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import {
    reactive,
    onMounted, onUnmounted, onUpdated, onBeforeMount, onBeforeUnmount, onBeforeUpdate,
    nextTick,
    ref,
    watch,
    computed,
    provide,
    inject,
    readonly,
    isRef,
    unref
} from 'vue';
import { useMouse } from './mouse'

const show = ref(false)

const { x, y } = useMouse();
function xxx() {
    return new Promise((r) => {
        setTimeout(() => {
            r(null)
        }, 2000)
    })
}

await xxx();

show.value = true;

const open = ref(false)

</script>

<template>
    <h1 v-if="show">哈哈哈哈</h1>
</template>

<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
}
</style>
