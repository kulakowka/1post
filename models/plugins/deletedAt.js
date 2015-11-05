module.exports = exports = function deletedAtPlugin (schema, options) {
  schema.add({
    deletedAt: {
      type: Date
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true
    }
  })

  schema.pre('save', function (next) {
    if (!this.isModified('isDeleted')) return next()
    this.deletedAt = this.isDeleted ? new Date() : undefined
    next()
  })

  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}
