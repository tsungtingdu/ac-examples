module.exports = {
    'isEqual': function (val1, val2, options) {
        return (val1 == val2) ? options.fn(this) : options.inverse(this)
    }
}