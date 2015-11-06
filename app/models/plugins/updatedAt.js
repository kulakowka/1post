module.exports = exports = function updatedAtPlugin (schema, options) {
  schema.add({
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true
    }
  })

  schema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
  })

  if (options && options.index) {
    schema.path('updatedAt').index(options.index)
  }
}
