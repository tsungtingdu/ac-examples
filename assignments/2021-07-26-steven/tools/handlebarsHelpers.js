module.exports = {
  showDate: function (date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0]
  }
}
