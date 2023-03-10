<template>
    <baidu-map ref="map" class="map" :center="mapConfig.center" :zoom="zoom" :style="styles" @click="handleClick"
        @ready="mapReady">
        <div class="search">
            <div class="input-wrapper"><input v-model="searchText" /></div>
            <span class="search-button" @click="search">
                <i class="el-icon-search"></i>
            </span>
        </div>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <bm-marker :position="mapConfig.center">
        </bm-marker>
        <bm-marker v-for="(marker, index) in markerList" :key="Math.random()" :position="marker.position"
            :icon="marker.icon" :title="marker.title" @click="markerClick">
            <bm-label v-if="marker.title && showLabel" :content="marker.title" :labelStyle="{
                color: '#333',
                borderColor: '#eee',
                fontSize: '12px',
                borderRadius: '2px',
                padding: '3px',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.3)'
            }" :offset="{ width: 25, height: -3 }"></bm-label>
        </bm-marker>
        <bm-info-window v-if="needInfoWindow" :position="infoWindow.position" :show="infoWindow.show"
            :title="infoWindow.title" :offset="infoWindow.offset" @close="infoWindowClose" @open="infoWindowOpen">
            <p class="f12" v-html="infoWindow.content"></p>
        </bm-info-window>
        <bm-local-search :keyword="keyword" :auto-viewport="true" :panel="false"></bm-local-search>
    </baidu-map>
</template>
<script>
import Vue from 'vue'
import VueBMap from 'vue-baidu-map'
import { isEmptyObject } from '@/utils/tools'

const MAP_KEY = '65d2O8PEq303twdTfO2lTux0'

Vue.use(VueBMap, {
    ak: MAP_KEY
});

export default {
    props: {
        zoom: {
            type: Number,
            default: 17
        },
        position: {
            type: Object
        },
        markerData: {
            type: Array
        },
        clickable: {
            type: Boolean,
            default: true
        },
        needInfoWindow: {
            type: Boolean,
            default: false
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        infoWindow: {
            type: Object
        },
        styles: {
            type: Object
        }
    },
    data() {
        return {
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
                    this.mapConfig.center = newVal
                }
            },
            deep: true,
            immediate: true
        },
        markerData(val) {
            this.markerList = val
        }
    },
    methods: {
        mapReady({ BMap, map }) {
            this.map = map
            this.BMap = BMap
        },
        handleClick({ type, target, point, pixel, overlay }) {
            if (this.clickable) {
                // 如果点击的不是marker标记，则设置中心点
                if (overlay === null) {
                    this.mapConfig.center = point
                }
                this.$emit('change', point)
            }
        },
        markerClick({ type, target }) {
            this.$emit('marker-click', target)
        },
        search() {
            this.keyword = this.searchText
        },
        convert(position) {
            return new Promise((resolve) => {
                const convertor = new BMap.Convertor()
                const point = new BMap.Point(...position)
                convertor.translate([point], 3, 5, (data) => {
                    if (data.status === 0) {
                        this.mapConfig.center = data.points[0]
                        let { lng, lat } = data.points[0]
                        // 转换的坐标小数位太长，后台接收不了，需要处理一下
                        const point = {
                            lng: parseFloat(lng.toFixed(8)),
                            lat: parseFloat(lat.toFixed(8))
                        }
                        this.$emit('change', point)
                        resolve(point)
                    }
                });
            })
        },
        centerAndZoom(point, zoom) {
            this.map.centerAndZoom(point, zoom)
        },
        getCenter() {
            return this.map.getCenter()
        },
        infoWindowClose() {
            this.$emit('info-window-close')
        },
        infoWindowOpen() {
            this.$emit('info-window-open')
        },
        getStaticImage() {
            const center = `${this.mapConfig.center.lng},${this.mapConfig.center.lat}`
            const width = this.$refs.map.$el.clientWidth
            const height = this.$refs.map.$el.clientHeight
            return `http://api.map.baidu.com/staticimage/v2?ak=${MAP_KEY}&mcode=666666&center=${center}&width=${width}&height=${height}&zoom=16&markers=${center}&markerStyles=m,,0xff0000`
        },
        reset() {
            this.keyword = ''
            this.searchText = ''
            this.mapConfig.center = this.position
            this.getCenter()
        }
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
}
</style>
