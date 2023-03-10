import defaults from './options'


function format(input, opt = defaults) {
    //如果是数字类型，则格式化为带对应精度的字符串形式
  if (typeof input === 'number') {
    input = input.toFixed(fixed(opt.precision))
  }
    //负数符号处理
  var negative = input.indexOf('-') >= 0 ? '-' : ''

  var numbers = onlyNumbers(input)
  var currency = numbersToCurrency(numbers, opt.precision)
  var parts = toStr(currency).split('.')
  var integer = parts[0]
  var decimal = parts[1]
  integer = addThousandSeparator(integer, opt.thousands)
  return opt.prefix + negative + joinIntegerAndDecimal(integer, decimal, opt.decimal) + opt.suffix
}

function unformat (input, precision) {
  var negative = input.indexOf('-') >= 0 ? -1 : 1
  var numbers = onlyNumbers(input)
  var currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency) * negative
}
/**
 * 将非数字字符去除
 * @param {*} input 
 * @returns 
 */
function onlyNumbers (input) {
  return toStr(input).replace(/\D+/g, '') || '0'
}

// Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
//如果n介于最小最大之间，返回n，否则大于最大值，则返回最大。小于最小值，则返回最小
function fixed (precision) {
  return between(0, precision, 20)
}
/**
 * 如果n介于最小最大之间，返回n，否则大于最大值，则返回最大。小于最小值，则返回最小
 * @param {*} min 
 * @param {*} n 
 * @param {*} max 
 * @returns 
 */
function between (min, n, max) {
  return Math.max(min, Math.min(n, max))
}

function numbersToCurrency (numbers, precision) {
  var exp = Math.pow(10, precision)
  var float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}
//给字符串类型的数值添加货币分隔符,
function addThousandSeparator (integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

function currencyToIntegerAndDecimal (float) {
  return toStr(float).split('.')
}
//将整数和小数拼接起来
function joinIntegerAndDecimal (integer, decimal, separator) {
  return decimal ? integer + separator + decimal : integer
}

function toStr (value) {
  return value ? value.toString() : ''
}

function setCursor (el, position) {
  var setSelectionRange = function () { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setSelectionRange()
    setTimeout(setSelectionRange, 1) // Android Fix
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event (name) {
  var evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  return evt
}

export {
  format,
  unformat,
  setCursor,
  event
}
