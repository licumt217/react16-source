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

onBeforeMount(() => {
    console.log('C: ' + "onBeforeMount")
})

onMounted(() => {
    console.log('C: ' + "onMounted")
})

onBeforeUpdate(() => {
    console.log('C: ' + "onBeforeUpdate")
})

onUpdated(() => {
    console.log('C: ' + "onUpdated")
})

onBeforeUnmount(() => {
    console.log('C: ' + "onBeforeUnmount")
})

onUnmounted(() => {
    console.log('C: ' + "onUnmounted")
})

console.log(22222)





const books = reactive({
    books: [999, 2, 3]
})

defineExpose({
    books
})

const len = computed<number>({
    get() {
        return books.books.length;
    },
    set(val) {
        books.books.push(val)
    }
})

console.log(len.value)

const res = {
    name: ref('li'),
    age: ref(18)
}

// let { age, name } = res;



const change = () => {
    // age.value++;
    len.value = 5;
}




</script>

<template>
    <header>

        <div class="wrapper">

            <nav @click="change">
                <p>len:{{ len }}</p>
                <p>books:{{ books }}</p>
                <p>parent:{{ ppp }}</p>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
