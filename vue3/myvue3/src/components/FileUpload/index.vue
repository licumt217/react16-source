<template>
  <div>
    <el-upload
      ref="upload"
      v-if="!fileSrc"
      :action="api"
      :headers="headers"
      :accept="accept"
      :on-error="uploadError"
      :on-success="uploadSuccess"
    >
      <el-button icon="ios-cloud-upload-outline">选择文件上传</el-button>
      <slot></slot>
    </el-upload>
    <template v-else>
      <div ref="pdfView" class="pdf-view-wrapper">
        <div class="delete-wrapper" @click="handleDelete">
          <div class="delete">
            <span><i class="el-icon-delete-solid" />删除</span>
          </div>
        </div>
      </div>
      <el-button type="text" @click="handleView">查看合同</el-button>
    </template>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import PDFJS from 'pdfjs-dist'
  import pdfjsWoker from 'pdfjs-dist/build/pdf.worker.entry'

  PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWoker;

  export default {
    props: {
      value: {
        typ: String
      },
      api: {
        type: String
      },
      accept: {
        type: String
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    watch: {
      value (newVal) {
        if (newVal) {
          this.fileSrc = newVal
          this.renderThumb(newVal)
        } else {
          this.fileSrc = ''
        }
      }
    },
    created() {
      this.headers.Authorization = this.token;
      if (this.fileSrc) {
        this.renderThumb(this.fileSrc)
      }
    },
    data() {
      return {
        headers: {
          Authorization: ''
        },
        fileSrc: this.value
      };
    },
    methods: {
      uploadError(error, file, fileList) {
        console.log(error)
      },
      uploadSuccess(response, file, fileList) {
        if (file.raw.type !== 'application/pdf') {
          this.$notify.warning('格式错误，请重新上传')
          this.$refs.upload.clearFiles()
          return
        }
        if (response.code !== 200) {
          this.$notify.warning('上传失败，请重新上传')
          return
        }
        if (typeof response.data === 'string') {
          this.fileSrc = response.data
        } else {
          this.fileSrc = response.data
        }
        this.$emit('input', this.fileSrc)
        this.dispatch('ElFormItem', 'el.form.change', this.fileSrc)
      },
      renderThumb(src) {
        PDFJS.getDocument(src).promise.then(doc => {
          doc.getPage(1).then(page => {
            const vp = page.getViewport({
              scale:1
            })
            const canvas = document.createElement('canvas')
            canvas.width = canvas.height = 150
            const scale = Math.min(canvas.width / vp.width, canvas.height / vp.height)
            this.$refs.pdfView.appendChild(canvas)
            return page.render({
              canvasContext: canvas.getContext('2d'),
              viewport: page.getViewport({scale}),
            }).promise.then(() => {
              return canvas
            })
          })
        },()=>{
          //文件不存在等。显示空，为了能够将错误文件删除
          const canvas = document.createElement('canvas')
          canvas.width = canvas.height = 150
          this.$refs.pdfView.appendChild(canvas)
        })
      },
      handleView() {
        window.open(this.fileSrc)
      },
      handleDelete() {
        this.$confirm('是否删除已上传的文件？', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$emit('clear')
        }).catch(function() {});
      },
      clear() {
        this.$refs.pdfView.removeChild(this.$refs.pdfView.childNodes[0])
        this.fileSrc = ''
        this.$emit('input', '')
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
<style lang="scss" scoped>
  .pdf-view-wrapper {
    max-width: 150px;
    max-height: 150px;
    position: relative;

    &:hover {
      .delete-wrapper {
        display: block;
      }
    }
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
</style>
