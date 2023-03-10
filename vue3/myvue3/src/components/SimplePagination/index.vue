<template>
  <div class="p10">
    <el-row type="flex" align="middle" class="pull-right">
      <el-button icon="el-icon-arrow-left" size="mini" :disabled="currentPage === 1" @click="handleAction('prev')"></el-button>
      <span class="pl10 pr10 f12">{{ currentPage }}</span>
      <el-button icon="el-icon-arrow-right" size="mini" :disabled="count < pageSize" @click="handleAction('next')"></el-button>
    </el-row>
  </div>
</template>
<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: this.page
    }
  },
  watch: {
    page(val) {
      this.currentPage = val
    }
  },
  methods: {
    handleAction(type) {
      if (type === 'prev') {
        if (this.currentPage > 1) {
          --this.currentPage
        }
      } else if (type === 'next') {
        ++this.currentPage
      }
      this.$emit('update:page', this.currentPage)
      this.$emit('pagination', this.currentPage)
      scrollTo(0, 800)
    }
  }
}
</script>
