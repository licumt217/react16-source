<template>
  <el-card :shadow="shadow" class="info-card-wrapper" :padding="padding">
    <div class="content-con">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
  import { oneOf } from '@/utils'

  export default {
    name: 'infoCard',
    props: {
      color: {
        type: String,
        default: '#2d8cf0'
      },
      icon: {
        type: String,
        default: ''
      },
      iconSize: {
        type: Number,
        default: 20
      },
      shadow: {
        type: String,
        default: 'always',
        validator: (val) => {
          return oneOf(val, ['always', 'hover', 'never'])
        }
      },
      padding: {
        type: Number,
        default: 16
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  .common{
    float: left;
    height: 100%;
    display: table;
    text-align: center;
  }
  .size{
    width: 100%;
    height: 100%;
  }
  .middle-center{
    display: table-cell;
    vertical-align: middle;
  }
  .info-card-wrapper{
    @extend .size;
    overflow: hidden;
    .ivu-card-body{
      @extend .size;
    }
    .content-con{
      @extend .size;
      position: relative;
      .left-area{
        @extend .common;
        & > .icon{
          @extend .middle-center;
        }
      }
      .right-area{
        @extend .common;
        & > div{
          @extend .middle-center;
        }
      }
    }
  }
</style>
