import {
    reactive,
    onMounted, onUnmounted, onUpdated, onBeforeMount, onBeforeUnmount, onBeforeUpdate,
    nextTick,
    ref,
    watch,
    computed,
    provide,
    inject,
    readonly
} from 'vue';

export function useMouse() {
    const x = ref(0);
    const y = ref(0);

    function update(e: any) {
        x.value = e.pageX;
        y.value = e.pageY;
    }

    onMounted(() => {
        window.addEventListener('mousemove', update)
    })

    onUnmounted(() => {
        window.removeEventListener("mousemove", update)
    })

    return {
        x, y
    }
}





