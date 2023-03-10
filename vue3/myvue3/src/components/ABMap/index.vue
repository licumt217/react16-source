<template>
    <div>
        <div class="el-tabs__header is-top">
            <div class="el-tabs__nav-wrap is-top">
                <div class="el-tabs__nav-scroll">
                    <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">
                        <div class="el-tabs__active-bar is-top"
                            :style="{ width: '96px', transform: 'translateX(' + (activeName === 'bmap' ? 0 : 100) + 'px)' }">
                        </div>


                        <div id="tab-bmap" aria-controls="pane-bmap" role="tab" class="el-tabs__item is-top "
                            @click="tabClick('bmap')" :class="activeName === 'bmap' ? 'is-active' : ''">百度地图</div>


                        <div id="tab-amap" aria-controls="pane-amap" role="tab" class="el-tabs__item is-top "
                            @click="tabClick" :class="activeName === 'amap' ? 'is-active' : ''">
                            高德地图</div>
                    </div>
                </div>
            </div>
        </div>


        <div :style="{ position: activeName === 'bmap' ? 'static' : 'absolute', top: '-20000px' }">
            <b-map-new ref="bmap" :styles="mapStyles" @change="syncLngLat" :zoom="zoom"
                :showAroundParkBtn="showAroundParkBtn"
                :position="{ lat: parseFloat(bmapLat), lng: parseFloat(bmapLng) }">
            </b-map-new>
        </div>
        <div v-show="activeName === 'amap'">
            <a-map-new ref="amap" :styles="mapStyles" :position="[parseFloat(amapLng), parseFloat(amapLat)]"
                :showAroundParkBtn="showAroundParkBtn" :zoom="zoom" @change="syncLngLat">
            </a-map-new>
        </div>
    </div>



</template>
<script>
import BMapNew from '@/components/BMapNew'
import AMapNew from '@/components/AMapNew/index'
import { isEmptyObject } from '@/utils/tools'



export default {
    components: {
        BMapNew,
        AMapNew
    },
    props: {
        zoom: {
            type: Number,
            default: 16
        },
        bmapPosition: {
            type: Object,
        },
        amapPosition: {
            type: Object,
        },
        readonly: {
            type: Boolean,
            default: false
        },
        showAroundParkBtn: {
            type: Boolean,
            default: true
        }


    },
    watch: {
        bmapPosition: {
            handler(newVal) {
                if (newVal && !isEmptyObject(newVal) && newVal.lng) {
                    const { lng, lat } = newVal;
                    this.bmapLng = lng;
                    this.bmapLat = lat
                }
            },
            deep: true,
            immediate: true
        },
        amapPosition: {
            handler(newVal) {
                if (newVal && !isEmptyObject(newVal) && newVal.lng) {
                    const { lng, lat } = newVal;
                    this.amapLng = lng;
                    this.amapLat = lat
                }
            },
            deep: true,
            immediate: true
        },
    },
    data() {
        return {
            bmapLng: 116.397497,
            bmapLat: 39.906888,
            amapLng: 116.397497,
            amapLat: 39.906888,
            activeName: 'bmap',
            mapStyles: {
                height: '400px',
                display: 'block'
            }
        }
    },
    methods: {
        syncLngLat(point, mapType) {

            let syncCommon = () => {
                if (this.readonly) {
                    return;
                }
                this.$emit('sync', {
                    lng: this.bmapLng,
                    lat: this.bmapLat,
                }, {
                    lng: this.amapLng,
                    lat: this.amapLat,

                })
            }

            const { lat, lng } = point;
            if (mapType === 'bmap') {
                this.bmapLng = lng;
                this.bmapLat = lat;
                this.syncLngLatFromBaidu2Gaode(lng, lat).then(syncCommon)
            } else {//从高德地图切换到百度地图，百度地图的中心点不能自动更新，因为百度地图在隐藏状态设置中心点时，位置不对。（好像隐藏时地图高度是0的原因）
                this.amapLng = lng;
                this.amapLat = lat;
                this.syncLngLatFromGaode2Baidu(lng, lat).then(syncCommon)
                this.callback = true;

            }

        },
        // 将百度地图坐标同步到高德地图
        syncLngLatFromBaidu2Gaode(lng, lat) {
            return new Promise((resolve) => {
                const position = [lng, lat]
                this.$refs.amap.convert(position).then(point => {
                    const { lng, lat } = point;
                    this.amapLng = lng;
                    this.amapLat = lat;
                    resolve()
                })
            })

        },
        // 将高德地图坐标同步到百度地图
        syncLngLatFromGaode2Baidu(lng, lat, tag) {
            return new Promise((resolve) => {
                const position = [lng, lat]
                this.$refs.bmap.convert(position).then(point => {
                    const { lng, lat } = point;
                    this.bmapLng = lng
                    this.bmapLat = lat
                    resolve()
                })
            })



        },
        tabClick(tab) {

            if (tab === 'bmap') {
                this.activeName = 'bmap'
                if (this.callback) {
                    //百度地图隐藏后，设置的中心点不生效的问题
                    setTimeout(() => {
                        this.bmapLng = this.bmapLng + 0.000001
                        this.bmapLat = this.bmapLat + 0.000001
                        this.callback = undefined;
                    }, 150)
                }


            } else {
                this.activeName = 'amap'
            }

        },

    }
}
</script>
<style lang="scss" type="text/scss" scoped>
</style>
