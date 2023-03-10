<template>
    <div>
        <el-table :data="checkData">
            <el-table-column label="审核提交时间" prop="submitTime"></el-table-column>
            <el-table-column label="提交人" prop="submitName"></el-table-column>
            <el-table-column label="提交人手机号" prop="phone"></el-table-column>
            <el-table-column label="审核时间" prop="verifyTime"></el-table-column>
            <el-table-column label="审核状态" prop="status" :formatter="statusFormatter"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="viewDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="pageNum"
            :limit.sync="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :auto-scroll="false"
            @pagination="getList"
        ></pagination>
        <el-dialog title="审核详情" :visible.sync="detailVisible" :modal-append-to-body="false">
            <el-row type="flex">
                <el-col>
                    <p class="f12 text-muted">审核提交时间</p>
                    <p>{{ verifyInfo.submitTime }}</p>
                </el-col>
                <el-col>
                    <p class="f12 text-muted">提交人</p>
                    <p>{{ verifyInfo.submitName }}</p>
                </el-col>
                <el-col>
                    <p class="f12 text-muted">提交审核人手机号</p>
                    <p>{{ verifyInfo.phone }}</p>
                </el-col>
                <el-col>
                    <p class="f12 text-muted">审核时间</p>
                    <p>{{ verifyInfo.verifyTime }}</p>
                </el-col>
                <el-col>
                    <p class="f12 text-muted">审核状态</p>
                    <p>{{ statusDict[verifyInfo.status] }}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <p class="f12 text-muted">审核备注</p>
                    <p>{{ verifyInfo.verifyRemark | fillBlankContent }}</p>
                </el-col>
            </el-row>
            <el-divider />
            <el-row class="verify-table text-muted" style="border-top: 1px solid #f5f5f5;">
                <el-col class="p10" :span="6">变更项目</el-col>
                <el-col class="p10" :span="9">变更前</el-col>
                <el-col class="p10" :span="9">变更后</el-col>
            </el-row>
            <el-row
                type="flex"
                class="verify-table"
                v-for="item in modifyDetail"
                :key="item.pmParkModifyDetailId"
            >
                <el-col class="p10" :span="6">{{ item.columnName }}</el-col>
                <el-col class="p10" :span="9">
                    <div v-if="item.oldValue && item.oldValue.indexOf('http://') > -1">
                        <img :src="item.oldValue" width="100" />
                    </div>
                    <div v-else>{{ item.oldValue }}</div>
                </el-col>
                <el-col class="p10" :span="9">
                    <div v-if="item.newValue && item.newValue.indexOf('http://') > -1">
                        <img :src="item.newValue" width="100" />
                    </div>
                    <div v-else>{{ item.newValue }}</div>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import { getDepartmentByCompanyId, getModifyDetail, getVerifyDetail, getVerifyList } from '@/api/park-manage'
import { oneOf } from '@/utils'
import { mapGetters } from 'vuex'
import { parseStrTime } from '@/utils/tools'
import clonedeep from 'lodash.clonedeep'
import debounce from 'lodash.debounce'
import { getParkId } from '@/utils/catch'

export default {
    props: {
        type: {
            type: Object,
            validator: (obj) => {
                // 1 基础信息  2 对账信息  3 配置信息 5 发票信息
                return oneOf(obj.verifyType, ['1', '2', '3', '5'])
            },
            required: true
        }
    },
    computed: {
        ...mapGetters([
            'park'
        ]),
        baseData() {
            return this.park.baseData
        }
    },
    data() {
        return {
            checkData: [],
            total: 0,
            pageNum: 1,
            pageSize: 5,
            detailVisible: false,
            verifyInfo: {},
            modifyDetail: [],
            statusDict: {},
            parkTypeDict: {},
            attributionDict: {},
            yetaiDict: {},
            cycleDict: {},
            settleTypeDict: {},
            payeeDict: {},
            typeDict: {},
            entranceStateDict: {},
            baseInfo: {},
            oldRegionList: [],
            newRegionList: []
        }
    },
    watch: {
        type: {
            handler: debounce(function () {
                this.getList()
            }, 100)
        }
    },
    created() {
        this.getDicts('park_info_verify_status').then(res => {
            res.data.forEach(item => {
                this.$set(this.statusDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_type').then(res => {
            res.data.forEach(item => {
                this.$set(this.parkTypeDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_attribution').then(res => {
            res.data.forEach(item => {
                this.$set(this.attributionDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_yetai').then(res => {
            res.data.forEach(item => {
                this.$set(this.yetaiDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_check_type').then(res => {
            res.data.forEach(item => {
                this.$set(this.typeDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_check_cycle').then(res => {
            res.data.forEach(item => {
                this.$set(this.cycleDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('pay_settle_type').then(res => {
            res.data.forEach(item => {
                this.$set(this.settleTypeDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_check_payee').then(res => {
            res.data.forEach(item => {
                this.$set(this.payeeDict, item.dictValue, item.dictLabel)
            })
        })
        this.getDicts('park_entrance_state').then(res => {
            res.data.forEach(item => {
                this.$set(this.entranceStateDict, item.dictValue, item.dictLabel)
            })
        })
    },
    methods: {
        getList() {
            const { verifyType, businessType } = this.type
            let data = {
                type: verifyType,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                pmParkId: getParkId()
            }
            if (businessType) {
                data.businessType = businessType
            }
            getVerifyList(data).then(res => {
                this.checkData = res.rows
                this.total = res.total
            })
        },
        viewDetail(row) {
            getVerifyDetail({
                pmParkVerifyId: row.pmParkVerifyId
            }).then(res => {
                this.verifyInfo = res.data
            })
            getModifyDetail({
                verifyId: row.pmParkVerifyId
            }).then(res => {
                this.getDepartmentList(res.data)
                setTimeout(() => {
                    this.modifyDetail = this.formatData(res.data)
                }, 500)
            })
            setTimeout(() => {
                this.detailVisible = true
            }, 500)
        },
        getDepartmentList(data) {
            for (let i in data) {
                const item = data[i]
                if (item.columnKey === 'gmCompanyId') {
                    if (item.oldValue) {
                        this.getDepartmentByCompanyId(item.oldValue).then(list => {
                            this.oldRegionList = list
                        })
                    }
                    if (item.newValue) {
                        this.getDepartmentByCompanyId(item.newValue).then(list => {
                            this.newRegionList = list
                        })
                    }
                    break
                }
            }
        },
        getDepartmentByCompanyId(val) {
            return new Promise((resolve, reject) => {
                getDepartmentByCompanyId({ companyId: val }).then(res => {
                    resolve(res.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        statusFormatter(row) {
            return this.statusDict[row.status]
        },
        formatData(data) {
            const newData = clonedeep(data)
            const { verifyType } = this.type
            return newData.map(item => {
                if (verifyType === '1') {
                    switch (item.columnKey) {
                        case `attribution`:
                            item.oldValue = this.attributionDict[item.oldValue]
                            item.newValue = this.attributionDict[item.newValue]
                            break
                        case 'gmCompanyId':
                            if (this.baseData.companyList) {
                                const oldCompany = this.baseData.companyList.find(company => company.gmCompanyId === item.oldValue)
                                const newCompany = this.baseData.companyList.find(company => company.gmCompanyId === item.newValue)
                                item.columnName = '公司名称'
                                if (oldCompany) {
                                    item.oldValue = oldCompany.name
                                }
                                if (newCompany) {
                                    item.newValue = newCompany.name
                                }
                            }
                            break
                        case 'openTime':
                        case 'closeTime':
                            if (item.oldValue) {
                                item.oldValue = parseStrTime(item.oldValue)
                            }
                            item.newValue = parseStrTime(item.newValue)
                            break
                        case 'parkType':
                            item.oldValue = this.parkTypeDict[item.oldValue]
                            item.newValue = this.parkTypeDict[item.newValue]
                            break
                        case 'gmRegionId':
                            const oldRegion = this.oldRegionList.find(company => company.gmRegionId === item.oldValue)
                            const newRegion = this.newRegionList.find(company => company.gmRegionId === item.newValue)
                            item.columnName = '所属部门'
                            if (oldRegion) {
                                item.oldValue = oldRegion.name
                            }
                            if (newRegion) {
                                item.newValue = newRegion.name
                            }
                            break
                        case 'parkYTS':
                            item.oldValue = this.yetaiDict[item.oldValue]
                            item.newValue = this.yetaiDict[item.newValue]
                            break
                    }
                } else if (verifyType === '2') {
                    switch (item.columnKey) {
                        case 'cycle':
                            item.oldValue = this.cycleDict[item.oldValue]
                            item.newValue = this.cycleDict[item.newValue]
                            break
                        case 'settleType':
                            item.oldValue = this.settleTypeDict[item.oldValue]
                            item.newValue = this.settleTypeDict[item.newValue]
                            break
                        case 'isEnable':
                            if (item.oldValue !== null) {
                                item.oldValue = item.oldValue === '0' ? '启用' : '停用'
                            }
                            item.newValue = item.newValue === '0' ? '启用' : '停用'
                            break
                        case 'payeeType':
                            item.oldValue = this.payeeDict[item.oldValue]
                            item.newValue = this.payeeDict[item.newValue]
                            break;
                        case 'businessType':
                            item.oldValue = this.typeDict[item.oldValue]
                            item.newValue = this.typeDict[item.newValue]
                            break
                    }
                } else if (verifyType === '3') {
                    /**
                     * 配置信息中有两个表的字段，避免字段冲突，添加新的判断
                     * modifyTable 表映射
                     * 3: 车场收费表
                     * 4: 车场出入口表
                     */
                    if (item.modifyTable === '3') {
                        switch (item.columnKey) {
                            case 'isNatureDay':
                            case 'isTimekeep':
                            case 'nightIsTimekeep':
                                if (item.oldValue !== null) {
                                    item.oldValue = item.oldValue === '0' ? '是' : '否'
                                }
                                item.newValue = item.newValue === '0' ? '是' : '否'
                                break
                            case 'isSingle':
                            case 'nightIsSingle':
                                if (item.oldValue !== null) {
                                    item.oldValue = item.oldValue === '0' ? '按时收费' : '按次收费'
                                }
                                item.newValue = item.newValue === '0' ? '按时收费' : '按次收费'
                                break
                            case 'dayFeeStartTime':
                            case 'dayFeeEndTime':
                            case 'nightFeeStartTime':
                            case 'nightFeeEndTime':
                                if (item.oldValue) {
                                    item.oldValue = parseStrTime(item.oldValue)
                                }
                                item.newValue = parseStrTime(item.newValue)
                                break
                        }
                    } else if (item.modifyTable === '4') {
                        switch (item.columnKey) {
                            case 'isAutoLift':
                                if (item.oldValue !== null) {
                                    item.oldValue = item.oldValue === '0' ? '是' : '否'
                                }
                                item.newValue = item.newValue === '0' ? '是' : '否'
                                break
                            case 'state':
                                item.oldValue = this.entranceStateDict[item.oldValue]
                                item.newValue = this.entranceStateDict[item.newValue]
                                break
                        }
                    }
                }
                return item
            })
        }
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
.verify-table {
    border-left: 1px solid #f5f5f5;

    > .el-col {
        border-bottom: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;
    }
}
</style>
