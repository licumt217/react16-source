<template>
  <el-input
    type="tel"
    v-model="formattedValue"
    v-money="{precision, decimal, thousands, prefix, suffix}"
    @change="change"
    :size="size"
  />
</template>

<script>
import money from './directive'
import defaults from './options'
import { format, unformat } from './utils'
import { oneOf } from '@/utils'

export default {
  name: 'ElCurrencyInput',
  props: {
    value: {
      required: true,
      type: [Number, String],
      default: 0
    },
    masked: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: () => defaults.precision
    },
    decimal: {
      type: String,
      default: () => defaults.decimal
    },
    thousands: {
      type: String,
      default: () => defaults.thousands
    },
    prefix: {
      type: String,
      default: () => defaults.prefix
    },
    suffix: {
      type: String,
      default: () => defaults.suffix
    },
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ['mini', 'small', 'medium'])
      }
    }
  },

  directives: { money },

  data() {
    return {
      formattedValue: ''
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        const formatted = format(newValue, this.$props)
        if (formatted !== this.formattedValue) {
          this.formattedValue = formatted
        }
      }
    }
  },

  methods: {
    change(evt) {
      this.$emit('input', this.masked ? evt : unformat(evt, this.precision))
    }
  }
}
</script>
