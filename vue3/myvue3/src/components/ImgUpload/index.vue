<template>
    <div>
        <template v-if="!imgSrc">
            <div class="f12 text-muted">只支持JPG格式，大小不能超过5MB；点击可再次编辑上传</div>
            <div style="position: relative; width: 200px;">
                <el-upload
                    style="width: 200px;"
                    list-type="picture-card"
                    :headers="headers"
                    :action="api"
                    :before-upload="beforeUpload"
                    :on-error="uploadError"
                    :on-progress="uploadProgress"
                    :on-success="uploadSuccess"
                    :show-file-list="false"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </template>
        <div v-else class="review">
            <div class="delete-wrapper" @click="clear">
                <div class="delete">
                    <span>
                        <i class="el-icon-delete-solid" />删除
                    </span>
                </div>
            </div>
            <img :src="imgSrc" width="200" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        value: {
            type: [Object,String]
        },
        api: {
            type: String
        }
    },
    computed: {
        ...mapGetters([
            'token'
        ])
    },
    watch: {
        value(newVal) {
            this.imgSrc = newVal ? (typeof newVal === 'string' ? newVal : newVal.ossUrl) : newVal;
        }
    },
    created() {
        this.headers.Authorization = this.token;
    },
    data() {
        return {
            file: null,
            imgSrc: this.value ? (typeof this.value === 'string' ? this.value : this.value.ossUrl) : this.value,
            headers: {
                Authorization: ''
            },
            loading: false
        };
    },
    methods: {
        beforeUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error('图片大小不能超过 5MB!');
            }
            return isLt5M;
        },
        uploadProgress() {
            this.loading = true;
        },
        uploadError() {
            this.$message.error('上传失败，请重新上传');
            this.loading = false;
        },
        uploadSuccess(response, file, fileList) {
            this.loading = false;
            if (response.code !== 200) {
                this.$message.warning('上传失败，请重新上传');
                return;
            }
            if (typeof response.data === 'string') {
                this.imgSrc = response.data;
            } else {
                this.imgSrc = response.data.picture || response.data;
            }
            this.$emit('input', this.imgSrc)
            this.dispatch('ElFormItem', 'el.form.change', this.imgSrc)
        },
        clear() {
            this.imgSrc = '';
            this.$emit('input', '');
            this.dispatch('ElFormItem', 'el.form.change', '')
        },
        dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        }
    }
};
</script>
<style lang="scss" type="text/scss" scoped>
.review {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;

    &:hover {
        .delete-wrapper {
            display: block;
        }
    }

    img {
        display: block;
    }

    .delete-wrapper,
    .delete {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .delete-wrapper {
        display: none;
    }

    .delete {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>
