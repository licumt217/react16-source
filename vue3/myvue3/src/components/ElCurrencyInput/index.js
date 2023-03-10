import ElCurrencyInput from './component'
import VMoney from './directive'
import options from './options'

export {
  ElCurrencyInput,
  VMoney,
  options
}

function install (Vue, globalOptions) {
  if (globalOptions) {
    Object.keys(globalOptions).map(function(key){
      options[key] = globalOptions[key]
    })
  }
  Vue.directive('money', VMoney)
  Vue.component('ElCurrencyInput', ElCurrencyInput)
}

export default install

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
