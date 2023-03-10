<template>
    <el-input v-model.trim="inputValue" :maxlength="maxlength" :size="size" @blur="handleChange" :disabled="disabled"
        :placeholder="placeholder" />
</template>
<script>
import { oneOf } from '@/utils'

export default {
    props: {
        value: {
            type: [String, Number]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 5
        },
        max: {
            type: Number,
            default: 100
        },
        min: {
            type: Number,
            default: 0.01
        },
        size: {
            type: String,
            validator(val) {
                return oneOf(val, ['mini', 'small', 'medium'])
            }
        },
        placeholder: {
            type: String,
            default: "请输入"
        },
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    methods: {

        handleChange() {

            let value = this.inputValue;
            value = value.replace(/[^0-9.]/g, '');//非数字和点替换为空

            if (value.indexOf(".") != -1 && value.split('.').length > 2) {//多个小数点只保留第一个
                let splitArray = value.split(".");
                let left = String(splitArray[0]);
                splitArray.shift();
                value = left + "." + splitArray.join("")
            }

            if (value.indexOf(".") === 0) {//小数点在首位的话，前边补0
                value = "0" + value;
            }

            if (value.indexOf(".") > -1 && value.split(".")[1].length > 2) {//小数点后边最多两位
                value = value.split(".")[0] + "." + value.split(".")[1].substr(0, 2)
            }

            if (value.indexOf(".") > -1) {
                if (value.split(".")[1].length === 0) {//小数点后没值，去掉小数点
                    value = value.split(".")[0];
                } else if (value.split(".")[1].length === 1 && value.split(".")[1][0] === "0") {//小数点后只有一位且为0，去掉
                    value = value.split(".")[0];
                } else {//小数点后有两位，且都是0，则去掉小数
                    if (value.split(".")[1][0] === "0" && value.split(".")[1][1] === "0") {
                        value = value.split(".")[0];
                    }
                }
            }

            if (Number(value) > this.max) {
                value = this.max
            }
            if (Number(value) < this.min) {
                value = this.min
            }

            this.inputValue = value;
            this.$emit('input', value)
        },
    }
}
</script>
