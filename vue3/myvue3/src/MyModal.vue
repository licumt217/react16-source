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

const { x, y } = useMouse();

const open = ref(false)

</script>

<template>
    <button @click="open = true">Open Modal</button>

    <Teleport to="body">
        <div v-if="open" class="modal" to="body">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>
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
