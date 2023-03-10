<template>
  <el-row type="flex" :gutter="5">
    <el-col v-for="item in level" :key="item">
      <el-select
        ref="provinceSelect"
        style="width: 100%"
        v-if="item === 1"
        v-model="provinceCode"
        placeholder="请选择省"
        clearable
        filterable
        @change="provinceChange"
        :size="size"
      >
        <el-option v-for="province in provinceList" :value="province.regionCode" :key="province.ddRegionCodeId" :label="province.regionName" />
      </el-select>
      <el-select
        style="width: 100%"
        v-if="item === 2"
        ref="citySelect"
        v-model="cityCode"
        placeholder="请选择市"
        clearable
        filterable
        :size="size"
        @change="cityChange"
      >
        <el-option v-for="city in cityList" :value="city.regionCode" :key="city.ddRegionCodeId" :label="city.regionName"/>
      </el-select>
      <el-select
        style="width: 100%"
        v-if="item === 3"
        ref="districtSelect"
        v-model="districtCode"
        placeholder="请选择区/县"
        clearable
        filterable
        @change="districtChange"
      >
        <el-option v-for="district in districtList" :value="district.regionCode" :key="district.ddRegionCodeId" :label="district.regionName"/>
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
  import { getProvince, getChildDataByArea } from '@/api/common';
  import { oneOf } from '@/utils'

  export default {
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      level: {
        type: Number,
        default: 3,
        validator: (val) => {
          return oneOf(val, [1, 2, 3]);
        }
      },
      size: {
        type: String,
        validator: (val) => {
          return oneOf(val, ['small', 'medium', 'mini'])
        }
      }
    },
    data() {
      return {
        provinceList: [],
        cityList: [],
        districtList: [],
        provinceCode: '',
        cityCode: '',
        districtCode: '',
        areaCode: ['', '', ''],
        areaData: [null, null, null]
      };
    },
    watch: {
      value(val) {
        this.getAreaData(val)
      },
      level(newVal) {
        this.areaData.length = newVal
      }
    },
    created() {
      this.getProvinceData();
      const isEmpty = this.value.every(item => item === '' || item === null);
      if (!isEmpty) {
        this.getAreaData(this.value)
      }
    },
    methods: {
      async getProvinceData() {
        try {
          const ret = await getProvince();
          if (ret.data) {
            this.provinceList = ret.data;
          }
        } catch (e) {
          throw e;
        }
      },
      async getChildData(code, type) {
        if (!code) {
          return;
        }
        try {
          const ret = await getChildDataByArea({
            regionCode: code
          });
          if (ret.data) {
            if (type === 1) {
              this.cityList = ret.data;
            } else if (type === 2) {
              this.districtList = ret.data;
            }
          }
        } catch (e) {
          throw e;
        }
      },
      getAreaData(data) {
        const [provinceCode, cityCode, districtCode] = data;
        this.provinceCode = provinceCode;
        this.cityCode = cityCode;
        this.districtCode = districtCode;
        this.areaCode = [...data];
        this.getChildData(provinceCode, 1);
        this.getChildData(cityCode, 2);
      },
      provinceChange(val) {
        this.clearAreaData();
        if (val) {
          if (this.level === 2) {
            this.getChildData(val, 1);
          }
          const data = this.provinceList.find(item => item.regionCode === val);
          this.updateAreaData(val, data, 0);
        }
      },
      cityChange(val) {
        this.clearDistrict()
        if (val) {
          if (this.level === 3) {
            this.getChildData(val, 2);
          }
          const data = this.cityList.find(item => item.regionCode === val);
          this.updateAreaData(val, data, 1);
        }
      },
      districtChange(val) {
        const data = this.districtList.find(item => item.regionCode === val);
        this.updateAreaData(val, data, 2);
      },
      updateAreaData(code, data, index) {
        this.areaCode[index] = code || '';
        this.areaData[index] = data || {};
        this.setArrayLength();
        this.$emit('input', this.areaCode, this.areaData);
        this.$emit('change', this.areaCode, this.areaData);
      },
      setArrayLength() {
        this.areaData.length = this.level;
        this.areaCode.length = this.level;
      },
      clearDistrict() {
        this.districtList = [];
        this.districtCode = null;
        this.updateAreaData(null, null, 1);
        this.updateAreaData(null, null, 2);
      },
      clearAreaData() {
        this.areaCode = [null, null, null];
        this.areaData = [null, null, null];
        this.cityList = [];
        this.districtList = [];
        this.provinceCode = null;
        this.cityCode = null;
        this.districtCode = null;
        this.setArrayLength();
        this.$emit('input', this.areaCode, this.areaData);
        this.$emit('change', this.areaCode, this.areaData);
      }
    }
  };
</script>
