<template>
    <div :class="{ 'hidden': hidden }" class="pagination-container">
        <el-pagination :background="background" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :layout="layout" :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { scrollTo } from '@/utils/scroll-to'

const props = defineProps({
    total: {
        type: Number,
        required: true
    },
    page: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 20
    },
    pageSizes: {
        type: Array,
        default() {
            return [10, 20, 30, 50]
        }
    },
    layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
        type: Boolean,
        default: true
    },
    autoScroll: {
        type: Boolean,
        default: true
    },
    hidden: {
        type: Boolean,
        default: false
    },

});

const emit = defineEmits(['pagination', 'update:page', 'update:limit'])

function handleSizeChange(val: any) {
    emit('pagination', { page: currentPage, limit: val })
    if (props.autoScroll) {
        scrollTo(0, 800, undefined)
    }
}
function handleCurrentChange(val: any) {
    emit('pagination', { page: val, limit: pageSize })
    if (props.autoScroll) {
        scrollTo(0, 800, undefined)
    }
}

const currentPage = computed({
    get() {
        return props.page
    },
    set(val) {
        emit('update:page', val)
    }
})

const pageSize = computed({
    get() {
        return props.limit
    },
    set(val) {
        emit('update:limit', val)
    }
})

</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding: 32px 16px;
}

.pagination-container.hidden {
    display: none;
}
</style>
