module.exports = exports = function createdAtPlugin (schema, options) {
  schema.add({
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }
  })

  if (options && options.index) {
    schema.path('createdAt').index(options.index)
  }
}
