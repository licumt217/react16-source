<template>
  <div class="map-wrapper">
    <el-row class="map-container" type="flex">
      <el-col style="flex: auto">
        <b-map
          ref="bmap"
          :position="bMapCenter"
          :marker-data="bmapMarkerData"
          :info-window="bMapInfoWindowData"
          need-info-window
          v-show="isBMap"
          @change="baiduChange"
          @marker-click="bmapMarkerClick"
        ></b-map>
        <a-map
          ref="amap"
          :position="aMapCenter"
          :marker-data="amapMarkerData"
          :info-window="aMapInfoWindowData"
          need-info-window
          v-show="isAMap"
          @change="amapChange"
          @marker-click="amapMarkerClick"
        ></a-map>
      </el-col>
      <el-col style="flex: 0 0 300px">
        <ul class="map-tab">
          <li :class="{active: isBMap }" @click="select('bmap')">
            <span>百度地图坐标</span>
          </li>
          <li :class="{active: isAMap }" @click="select('amap')">
            <span>高德地图坐标</span>
          </li>
        </ul>
        <el-form>
          <el-row class="pl30 pr30">
            <el-col>
              <el-form-item label="抓取坐标经纬值">
                <el-input v-model="mapPosition" disabled />
              </el-form-item>
              <div class="mb10">
                <el-button type="primary" class="mr10" @click="getMapPosition">填写经纬度</el-button>
              </div>
              <div class="mb10">
                <el-button type="primary" @click="syncPosition">同步经纬度至{{ isBMap ? '高德':'百度' }}</el-button>
              </div>
              <div v-if="showParking">
                <el-button type="primary" @click="getParkList">显示周边停车场</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import BMap from '@/components/BMap/index'
  import AMap from '@/components/AMap/index'
  import { isEmptyObject } from '@/utils/tools'
  import { getParkListByBaiduPosition, getParkListByGaodePosition } from '@/api/park-manage'

  export default {
    props: {
      bMapPosition: {
        type: Object
      },
      aMapPosition: {
        type: Object
      },
      showParking: {
        type: Boolean,
        default: true
      }
    },
    components: {
      BMap,
      AMap
    },
    computed: {
      isBMap() {
        return this.type === 'bmap'
      },
      isAMap() {
        return this.type === 'amap'
      }
    },
    watch: {
      bMapPosition: {
        handler(newVal) {
          if (newVal && !isEmptyObject(newVal)) {
            this.bMapCenter = { lat: parseFloat(newVal.lat), lng: parseFloat(newVal.lng) }
            this.$bmapPosition = newVal
            this.mapPosition = `${newVal.lng},${newVal.lat}`
          }
        },
        deep: true,
        immediate: true
      },
      aMapPosition: {
        handler(newVal) {
          if (newVal && !isEmptyObject(newVal)) {
            this.aMapCenter = [parseFloat(newVal.lng), parseFloat(newVal.lat)]
            this.$amapPosition = { lat: parseFloat(newVal.lat), lng: parseFloat(newVal.lng) }
          }
        },
        deep: true,
        immediate: true
      }
    },
    data () {
      return {
        type: 'bmap',
        mapPosition: '',
        amapMarkerData: [],
        bmapMarkerData: [],
        bMapInfoWindowData: {
          position: null,
          title: '车场名称',
          show: false,
          content: '',
          offset: {
            width: 0,
            height: -15
          }
        },
        aMapInfoWindowData: {
          position: [0, 0],
          content: '',
          events: {
            open: () => {
              this.aMapInfoWindowData.visible = true
            },
            close: () => {
              this.aMapInfoWindowData.visible = false
            }
          },
          offset: [0, -15],
          visible: false
        },
        bMapCenter: null,
        aMapCenter: null
      }
    },
    created() {
      this.amapMarkerDic = {}
    },
    methods: {
      select(type) {
        this.type = type;
        let mapPosition = null
        if (type === 'bmap') {
          setTimeout(() => {
            if(this.bmapPoint) {
              this.$refs.bmap.centerAndZoom(this.bmapPoint, 17)
            }
          }, 50)
          if (this.$bmapPosition) {
            mapPosition = this.$bmapPosition
          }
        } else {
          if (this.$amapPosition) {
            mapPosition = this.$amapPosition
          }
        }
        this.mapPosition = mapPosition ? `${mapPosition.lng},${mapPosition.lat}` : ''
      },
      baiduChange(point) {
        this.mapPosition = `${point.lng},${point.lat}`
        this.$bmapPosition = point
        this.bmapPoint = point
      },
      amapChange(point) {
        this.mapPosition = `${point.lng},${point.lat}`
        this.$amapPosition = point
      },
      getMapPosition() {
        let mapPosition = null
        if (this.isBMap) {
          mapPosition = this.$bmapPosition
        } else {
          mapPosition = this.$amapPosition
        }
        this.mapPosition = `${mapPosition.lng},${mapPosition.lat}`
        this.$emit('change', this.type, mapPosition)
      },
      syncPosition() {
        if (this.isBMap) {
          this.syncAMapPosition();
        } else {
          this.syncBMapPosition();
        }
      },
      // 将百度地图坐标同步到高德地图
      syncAMapPosition() {
        const position = [this.$bmapPosition.lng, this.$bmapPosition.lat]
        this.$refs.amap.convert(position).then(point => {
          this.$emit('sync-success', 'amap', point)
          this.$amapPosition = point
        })
      },
      // 将高德地图坐标同步到百度地图
      syncBMapPosition() {
        const position = [this.$amapPosition.lng, this.$amapPosition.lat]
        this.$refs.bmap.convert(position).then(point => {
          this.$emit('sync-success', 'bmap', point)
          this.$bmapPosition = point
        })
      },
      getMarkListByBaidu() {
        getParkListByBaiduPosition({
          lng: this.$bmapPosition.lng,
          lat: this.$bmapPosition.lat
        }).then(res => {
          this.bmapMarkerDic = {}
          this.bmapMarkerData = res.data.map(item => {
            const lng = parseFloat(item.longitude)
            const lat = parseFloat(item.latitude)
            this.bmapMarkerDic[this.getMarkerKey(lng, lat)] = item.uid
            return {
              uid: item.uid,
              position: {
                lng,
                lat
              },
              title: item.parkName,
              infoWindowVisible: true
            }
          })
        })
      },
      getMarkDataByGaode() {
        getParkListByGaodePosition({
          lng: this.$amapPosition.lng,
          lat: this.$amapPosition.lat
        }).then(res => {
          this.amapMarkerData = res.data.map(item => {
            const wLongitude = parseFloat(item.wLongitude)
            const wLatitude = parseFloat(item.wLatitude)
            this.amapMarkerDic[this.getMarkerKey(wLongitude, wLatitude)] = item.uid
            return {
              position: [wLongitude, wLatitude],
              title: item.parkName
            }
          })
        })
      },
      getParkList() {
        if (this.isBMap) {
          this.getMarkListByBaidu()
        } else {
          this.getMarkDataByGaode()
        }
      },
      bmapMarkerClick(target) {
        const { lng, lat } = target.point
        const key = this.getMarkerKey(lng, lat)
        target.uid = this.bmapMarkerDic[key]
        this.$emit('marker-click', 'bmap', target)
        this.toggleBMapInfoWindow(target)
      },
      toggleBMapInfoWindow(target) {
        this.bMapInfoWindowData.position = target.point
        this.bMapInfoWindowData.content = `
          <div style="margin-bottom: 10px">${target.z.title}</div>
          <div style="color: gray">点击坐标即可获取uid</div>`
        this.bMapInfoWindowData.show = true
      },
      amapMarkerClick(target) {
        const { lng, lat } = target.w.position  // 取这个对象里的坐标是因为跟传入的坐标一致，为了取对应的uid
        const key = this.getMarkerKey(lng, lat)
        if (typeof this.amapMarkerDic[key] !== 'undefined') {
          target.uid = this.amapMarkerDic[key]
          this.$emit('marker-click', 'amap', target)
          this.toggleAMapInfoWindow(target)
        }
      },
      toggleAMapInfoWindow(target) {
        const { lng, lat } = target.point
        this.aMapInfoWindowData.position = [lng, lat]
        this.aMapInfoWindowData.content = `
          <div style="margin-bottom: 10px; font-size: 12px">${target.w.title}</div>
          <div style="color: gray; font-size: 12px">点击坐标即可获取uid</div>`
        this.aMapInfoWindowData.visible = true
      },
      getMarkerKey(lng, lat) {
        lng = lng.toString()
        lat = lat.toString()
        return `${lng.replace(/\./, '')}${lat.replace(/\./, '')}`
      },
      getStaticImage() {
        if (this.type === 'bmap') {
          return this.$refs.bmap.getStaticImage()
        }
      },
      reset() {
        this.mapPosition = null
        this.amapMarkerData = []
        this.bmapMarkerData = []
        this.$refs.bmap.reset()
        this.$refs.amap.reset()
        this.type = 'bmap'
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  @import "~@/assets/styles/element-theme/variables";

  .map-wrapper {
    border: 1px solid #eee;
    height: 100%;
  }
  .map-container {
    position: relative;
    height: 100%;
  }
  .map-tab {
    display: flex;
    z-index: 999;
    list-style: none;
    padding: 20px 10px;
    margin: 0;

    > li {
      &.active {
        color: $--color-primary;

        span {
          padding: 5px;
          border-bottom: 2px solid $--color-primary;
        }
      }
      flex: 1;
      font-size: 14px;
      padding: 0 20px;
      background: #fff;
      cursor: pointer;
      text-align: center;
    }
  }
</style>
