<template>
    <el-select v-model="pmParkId" :size="size" filterable remote clearable :remote-method="remoteMethod"
        :loading="searching" :disabled="disabled" placeholder="请输入关键字搜索" @change="change" @clear="clear">
        <el-option v-for="item in parkList" :key="item.pmParkId" :value="item.pmParkId" :label="item.parkName" />
        <el-option-group label="历史搜索记录">
            <el-option v-for="item in historyList" :key="item.pmParkId" :value="item.pmParkId" :label="item.parkName" />
        </el-option-group>
    </el-select>
</template>
<script>
import { getParkList } from '@/api/common'
import { getParkSearchResult, setParkSearchResult } from '@/utils/catch'
import { oneOf } from '@/utils'

export default {
    props: {
        value: {
            type: [String, Array]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            validator(val) {
                return oneOf(val, ['mini', 'small', 'medium'])
            }
        }
    },
    data() {
        return {
            pmParkId: this.value,
            parkList: [],
            searching: false,
            historyList: []
        }
    },
    watch: {
        value(val) {
            this.$emit('input', val)
        }
    },
    created() {
        this.historyList = getParkSearchResult()
    },
    methods: {
        remoteMethod(query) {
            if (query !== '') {
                this.searching = true;
                setTimeout(() => {
                    this.searching = false;
                    getParkList({
                        parkName: query
                    }).then((res) => {
                        this.parkList = res.data
                    })
                }, 200);
            } else {
                this.parkList = [];
            }
        },
        setHistory(pmParkId) {
            // 根据pmParkId查询选中的车场
            let park = null
            if (this.parkList.length) {
                park = this.parkList.find((item) => item.pmParkId === pmParkId)
            }
            // 是否存在历史记录
            const index = this.historyList.findIndex((item) => item.pmParkId === pmParkId)
            if (index < 0) {
                this.historyList.push({
                    ...park,
                    searchTime: Date.now()
                })
            } else {
                this.historyList[index].searchTime = Date.now()
            }
            this.historyList.sort((a, b) => b.searchTime - a.searchTime)
            setParkSearchResult(this.historyList)
            this.parkList = []
        },
        change(val) {
            this.$emit('change', val)
            this.$emit('input', val)
            if (val) {
                this.setHistory(val)
            }
        },
        clear() {
            this.parkList = []
        }
    }
}
</script>
