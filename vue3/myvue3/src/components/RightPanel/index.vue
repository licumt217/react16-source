<template>
    <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
        <div class="rightPanel-background" />
        <div class="rightPanel">
            <div class="rightPanel-items">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { addClass, removeClass } from '@/utils'
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'

const route = useRoute();

const props = defineProps({
    clickNotClose: {
        type: Boolean,
        default: false
    },
    buttonTop: {
        type: Number,
        default: 250
    }
});


const show = computed({
    get() {
        return store.state.settings.showSettings
    },
    set(val) {
        store.dispatch('settings/changeSetting', {
            key: 'showSettings',
            value: val
        })
    }
})

function addEventClick() {
    window.addEventListener('click', closeSidebar)
}
function closeSidebar(evt: any) {
    const parent = evt.target.closest('.rightPanel')
    if (!parent) {
        show.value = false
        window.removeEventListener('click', closeSidebar)
    }
}
function insertToBody() {
    const elx = this.$refs.rightPanel
    const body: any = document.querySelector('body')
    body.insertBefore(elx, body.firstChild)
}

onMounted(() => {
    insertToBody()
    addEventClick()
})

onBeforeUnmount(() => {
    const elx = this.$refs.rightPanel
    elx.remove()
})

watch(show, (value) => {
    if (value && !props.clickNotClose) {
        addEventClick()
    }
    if (value) {
        addClass(document.body, 'showRightPanel')
    } else {
        removeClass(document.body, 'showRightPanel')
    }
})


</script>

<style>
.showRightPanel {
    overflow: hidden;
    position: relative;
    width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
    background: rgba(0, 0, 0, .2);
    z-index: -1;
}

.rightPanel {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
    transition: all .25s cubic-bezier(.7, .3, .1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
}

.show {
    transition: all .3s cubic-bezier(.7, .3, .1, 1);

    .rightPanel-background {
        z-index: 20000;
        opacity: 1;
        width: 100%;
        height: 100%;
    }

    .rightPanel {
        transform: translate(0);
    }
}

.handle-button {
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;

    i {
        font-size: 24px;
        line-height: 48px;
    }
}
</style>
