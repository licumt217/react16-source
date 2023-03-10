<template>
    <div class="map-wrapper">

        <div class="parkAround" v-if="showAroundParkBtn">
            <el-button type="primary" @click="queryParkAround">显示周边停车场</el-button>
        </div>
        <el-amap-search-box class="map-search" ref="mapSearchBox" :search-option="searchOption"
            :on-search-result="searchResult" />
        <el-amap ref="map" class="map" :amap-manager="amapManager" :center="mapConfig.center" :zoom="mapConfig.zoom"
            :style="styles" :scroll-wheel="false" :plugin="plugin" :events="mapEvents()">

            <el-amap-marker :position="mapConfig.center" :icon="mapConfig.icon" />

            <el-amap-marker v-for="(marker, index) in markerList" :key="index" :position="marker.position"
                :icon="mapConfig.icon" :title="marker.title" :events="markerEvents()" />

            <el-amap-info-window :position="infoWindow.position" :content="infoWindow.content"
                :visible="infoWindow.visible" :events="infoWindow.events" />

        </el-amap>
    </div>
</template>
<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { isEmptyObject } from '@/utils/tools'
import { getParkListByGaodePosition } from '@/api/park-manage'
const MAP_KEY = '5e24ff08acf9af0452a48a6c9cc1beaf'

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: MAP_KEY,
    plugin: [
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.PolyEditor',
        'AMap.CircleEditor',
        'AMap.Geocoder'
    ],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.15'
});

let amapManager = new VueAMap.AMapManager()

export default {
    props: {
        position: {
            type: Array
        },
        markerData: {
            type: Array
        },
        styles: {
            type: Object
        },
        zoom: {
            type: Number,
            default: 12
        },
        showAroundParkBtn: {
            type: Boolean,
            default: true
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
    data() {
        return {
            infoWindow: {
                position: [0, 0],
                content: '',
                events: {
                    open: () => {
                        this.infoWindow.visible = true
                    },
                    close: () => {
                        this.infoWindow.visible = false
                    }
                },
                offset: [0, -15],
                visible: false
            },
            markerList: [],
            amapManager,
            mapConfig: {
                center: [116.333857, 39.988067],
                zoom: 17,
                icon: 'https://api.map.baidu.com/images/marker_red_sprite.png'
            },
            searchOption: {
                city: '全国', // 兴趣点城市
                citylimit: false, // 是否强制限制在设置的城市内搜索
                map: null, // 展现结果的地图实例
                panel: '', // 结果列表将在此容器中进行展示。
                autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                pageSize: 5, // 单页显示结果条数
                pageIndex: 1 // 页码
            },
            plugin: [{
                pName: 'ToolBar'
            }]
        }
    },
    methods: {
        queryParkAround() {
            const [lng, lat] = this.mapConfig.center;
            getParkListByGaodePosition({
                lng,
                lat
            }).then(res => {
                this.markerList = res.data.map(item => {
                    const wLongitude = parseFloat(item.wLongitude)
                    const wLatitude = parseFloat(item.wLatitude)
                    return {
                        position: [wLongitude, wLatitude],
                        title: item.parkName
                    }
                })
            })
        },
        convert(position) {
            return new Promise((resolve, reject) => {
                /* global AMap */
                AMap.convertFrom(position, 'baidu', (status, result) => {
                    if (result.info === 'ok') {
                        const location = result.locations[0]
                        resolve(location)
                    }
                });
            })
        },
        mapEvents() {
            return {
                click: ({ lnglat }) => {
                    let { lat, lng } = lnglat;
                    this.mapConfig.center = [lng, lat];
                    this.$emit('change', lnglat, 'amap')
                }
            };
        },
        markerEvents() {
            return {
                click: ({ lnglat, target }) => {
                    target.point = lnglat
                    this.toggleAMapInfoWindow(target)
                }
            };
        },
        toggleAMapInfoWindow(target) {

            const { lng, lat } = target.point
            this.infoWindow.position = [lng, lat]
            this.infoWindow.content = `<div style="margin-bottom: 10px; font-size: 12px">${target.w.title}</div>`
            this.infoWindow.visible = true
        },
        searchResult(pois) {
            this.markerList = []
            let latSum = 0
            let lngSum = 0
            pois.forEach(poi => {
                let { lng, lat } = poi
                lngSum += lng
                latSum += lat
                this.markerList.push({
                    position: [poi.lng, poi.lat]
                })
            })
            let center = {
                lng: lngSum / pois.length,
                lat: latSum / pois.length
            };
            this.mapConfig.center = [center.lng, center.lat];
        },
        reset() {
            this.markerList = []
            this.mapConfig.center = this.position
            this.$refs.mapSearchBox.keyword = ''
            this.$refs.map.$$getCenter()
        }
    }
}
</script>
<style lang="scss" type="text/scss" scoped>
.map-wrapper {
    position: relative;
    height: 100%;
}

.map {
    width: 100%;
    height: 100%;
}

.map-search {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 999;
    width: 350px;
}

.parkAround {
    position: absolute;
    right: 380px;
    top: 10px;
    font-weight: bold;
    z-index: 999;

}
</style>
