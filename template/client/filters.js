export default ({
  install(Vue) {
    Vue.filter('date', (date, format) => {
      if (!date) return ''
      else date = new Date(date)

      format = (format || 'short').toLowerCase()

      return format === 'long'
        ? date.toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
        : date.toLocaleString(undefined, { month: '2-digit', day: '2-digit', year: '2-digit' })
    })

    Vue.filter('decimal', (n, digits = 2) => {
      if ((n !== 0) && !n) return ''
      else {
        const decimalFormat = { minimumFractionDigits: digits, maximumFractionDigits: digits }
        return Number(n).toLocaleString(undefined, decimalFormat)
      }
    })

    Vue.filter('int', n => {
      if ((n !== 0) && !n) return ''
      else return Math.round(n).toLocaleString()
    })

    Vue.filter('currency', (n, decimals = 2) => {
      const negative = (n < 0)
      const number = Math.abs(Number(n) || 0)
      const numberString = number.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

      return `${negative ? '-' : ''}\$${numberString}`
    })
  }
})
