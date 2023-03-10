<template>
    <baidu-map ref="map" class="map" :center="mapConfig.center" :zoom="mapConfig.zoom" :style="styles"
        @zoomend="zoomend" @click="handleMapClick" @ready="mapReady">
        <div class="parkAround" v-if="showAroundParkBtn">
            <el-button type="primary" @click="queryParkAround">显示周边停车场</el-button>
        </div>
        <div class="search">
            <div class="input-wrapper"><input v-model="searchText" /></div>
            <span class="search-button" @click="search">
                <i class="el-icon-search"></i>
            </span>
        </div>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <bm-marker :position="mapConfig.center"></bm-marker>
        <bm-marker v-for="(marker, index) in markerList" :key="index" :position="marker.position" :icon="marker.icon"
            :title="marker.title" @click="markerClick">
            <bm-label v-if="marker.title && showLabel" :content="marker.title" :labelStyle="{
                color: '#333',
                borderColor: '#eee',
                fontSize: '12px',
                borderRadius: '2px',
                padding: '3px',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)'
            }" :offset="{ width: 25, height: -3 }"></bm-label>
        </bm-marker>
        <bm-info-window :position="infoWindow.position" :show="infoWindow.show" :title="infoWindow.title"
            :offset="infoWindow.offset" @close="infoWindowClose" @open="infoWindowOpen">
            <p class="f12" v-html="infoWindow.content"></p>
        </bm-info-window>
        <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"></bm-local-search>
    </baidu-map>
</template>
<script>
import Vue from 'vue'
import VueBMap from 'vue-baidu-map'
import { isEmptyObject } from '@/utils/tools'
import { getParkListByBaiduPosition } from '@/api/park-manage'

const MAP_KEY = '65d2O8PEq303twdTfO2lTux0'

Vue.use(VueBMap, {
    ak: MAP_KEY
});

export default {
    props: {
        zoom: {
            type: Number,
            default: 12
        },
        position: {
            type: Object
        },
        needInfoWindow: {
            type: Boolean,
            default: false
        },
        clickable: {
            type: Boolean,
            default: true
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object
        },
        showAroundParkBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

            infoWindow: {

            },
            mapConfig: {
                center: {
                    lng: 116.34048,
                    lat: 39.993708
                }
            },
            markerList: [],
            mapPosition: '',
            keyword: '',
            searchText: ''
        }
    },
    watch: {
        position: {
            handler(newVal) {
                if (newVal && !isEmptyObject(newVal)) {
                    this.mapConfig.center = newVal;
                }
            },
            deep: true,
            immediate: true
        },
        zoom: {
            handler(newVal) {
                if (newVal) {
                    this.mapConfig.zoom = newVal
                }
            },
            deep: true,
            immediate: true
        },
    },
    mounted() {


    },
    methods: {
        zoomend(e) {
            let zoom = e.target.getZoom();
            this.mapConfig.zoom = zoom;
        },
        queryParkAround() {
            const { lng, lat } = this.mapConfig.center;
            getParkListByBaiduPosition({
                lng,
                lat
            }).then(res => {
                this.markerList = res.data.map(item => {
                    const lng = parseFloat(item.longitude)
                    const lat = parseFloat(item.latitude)
                    return {
                        uid: item.uid,
                        position: {
                            lng,
                            lat
                        },
                        title: item.parkName,
                    }
                })
            })
        },
        convert(position) {
            return new Promise((resolve) => {
                const convertor = new BMap.Convertor()
                const point = new BMap.Point(...position)
                convertor.translate([point], 3, 5, (data) => {
                    if (data.status === 0) {
                        let { lng, lat } = data.points[0]
                        // 转换的坐标小数位太长，后台接收不了，需要处理一下
                        const point = {
                            lng: parseFloat(lng.toFixed(6)),
                            lat: parseFloat(lat.toFixed(6))
                        }
                        resolve(point)
                    }
                });
            })
        },
        mapReady({ BMap, map }) {
            this.map = map
            this.BMap = BMap
        },
        handleMapClick({ type, target, point, pixel, overlay }) {
            if (this.clickable) {
                // 如果点击的不是marker标记，则设置中心点
                if (overlay === null) {
                    this.mapConfig.center = point
                }
                this.$emit('change', point, 'bmap')
            }
        },
        infoWindowClose() {
            this.$emit('info-window-close')
        },
        infoWindowOpen() {
            this.$emit('info-window-open')
        },
        toggleBMapInfoWindow(target) {
            this.infoWindow.position = target.point
            this.infoWindow.content = `
          <div style="margin-bottom: 10px">${target.z.title}</div>`
            this.infoWindow.show = true
        },
        markerClick({ type, target }) {
            this.toggleBMapInfoWindow(target)
        },
        search() {
            this.keyword = this.searchText
        },
    }
}
</script>
<style lang="scss" type="text/scss" scoped>
.map {
    position: relative;
    width: 100%;
    height: 100%;

    .search {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 350px;
        background: #fff;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        border-radius: 2px;
        display: flex;

        .input-wrapper {
            flex: 1;

            input {
                width: 100%;
                padding: 10px;
                border: none;
                background: transparent;
                outline: none;
                height: 45px;
                line-height: 45px;
            }
        }

        .search-button {
            padding: 0 15px;
            line-height: 45px;
            cursor: pointer;
            color: #fff;
            background-color: #3385ff;

            >i {
                font-size: 22px;
                vertical-align: -4px;
            }
        }
    }

    .parkAround {
        position: absolute;
        right: 380px;
        top: 10px;
        font-weight: bold;

    }
}
</style>
