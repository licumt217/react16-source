<template>
    <div>
        <p class="f14 text-muted">{{ label }}</p>
        <p class="vertical-value">{{ value }}</p>
    </div>
</template>

<script>
export default {
    name: 'VerticalInfo',
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },

    },
};
</script>

<style>
.vertical-value {
    line-height: 1.8;
}
</style>

