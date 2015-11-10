
var rules = {
  
  edit: function (user, model) {
    return user._id.equals(model.creator._id)
  },

  delete: function (user, model) {
    return user._id.equals(model.creator._id)
  }
}

module.exports = exports = function abilitiesPlugin (schema, options) {
  
  schema.methods.can = function can (rule, model) {
    return rules[rule](this, model)
  }
}
