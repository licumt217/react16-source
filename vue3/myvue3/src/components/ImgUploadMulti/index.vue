<template>
    <div>
        <template>
            <div class="f12 text-muted">只支持JPG格式，大小不能超过5MB；点击可再次编辑上传；最多可上传5张！</div>
            <div style="position: relative; ">
                <el-upload
                    list-type="picture-card"
                    :headers="headers"
                    :action="api"
                    :before-upload="beforeUpload"
                    :on-error="uploadError"
                    :on-progress="uploadProgress"
                    :on-success="uploadSuccess"
                    :on-exceed="onExceed"
                    :on-remove="onRemove"
                    :show-file-list="true"
                    :limit="5"
                    :fileList="fileList"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </template>
        <!-- <div v-else class="review">
            <div class="delete-wrapper" @click="clear">
                <div class="delete">
                    <span>
                        <i class="el-icon-delete-solid" />删除
                    </span>
                </div>
            </div>
            <img :src="imgSrcArray" width="200" />
        </div>-->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        value: {
            type: Array
        },
        api: {
            type: String
        },

    },
    computed: {
        ...mapGetters([
            'token'
        ])
    },
    watch: {
        value: {



            // this.imgSrc = typeof newVal === 'stirng' ? newVal : newVal.ossUrl;


            handler(newVal) {
                this.imgSrcArray = newVal
                this.fileList = []
                this.imgSrcArray.forEach(element => {
                    this.fileList.push({
                        url: element.ossUrl
                    })
                });
            },
            immediate: true
        },
    },
    created() {
        this.headers.Authorization = this.token;
    },
    data() {
        return {
            fileList: [],
            file: null,
            imgSrcArray: this.value,
            headers: {
                Authorization: ''
            },
            loading: false
        };
    },
    methods: {
        onExceed(file, fileList) {
            this.$message.error('最多上传5张照片!');
        },
        onRemove(file, fileList) {

            let url = file.url;
            debugger
            let toDeleteIndex = this.imgSrcArray.findIndex((item) => {
                return item.ossUrl === url;
            })
            this.imgSrcArray.splice(toDeleteIndex, 1);

            // this.imgSrcArray.push(fileList[fileList.length - 1].response.data)
            // this.imgSrcArray = array;
            this.$emit('input', this.imgSrcArray)
            this.dispatch('ElFormItem', 'el.form.change', this.imgSrcArray)
        },

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
            this.updateImageArray(fileList)
        },
        updateImageArray(fileList) {
            debugger
            // const array = [];
            // fileList.forEach(element => {
            //     array.push(element.response.data)

            // });
            this.imgSrcArray.push(fileList[fileList.length - 1].response.data)
            // this.imgSrcArray = array;
            this.$emit('input', this.imgSrcArray)
            this.dispatch('ElFormItem', 'el.form.change', this.imgSrcArray)
        },
        clear() {
            this.imgSrcArray = '';
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
