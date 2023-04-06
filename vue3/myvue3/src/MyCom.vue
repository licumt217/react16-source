<script setup lang="ts">
import {
    reactive,
    onMounted, onUnmounted, onUpdated, onBeforeMount, onBeforeUnmount, onBeforeUpdate,
    ref,
    computed,
} from 'vue';

import type { Ref } from 'vue';

const props = defineProps({
    ppp: {
        type: String
    }
})

const out = () => {
    console.log("out...")
}



</script>

<template>
    <button @click="out()">
        <slot></slot>
    </button>
</template>

<style scoped></style>
