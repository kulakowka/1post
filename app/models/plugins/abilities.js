var adminUsername = process.env.ADMIN_USERNAME || 'kulakowka'

var rules = {

  edit: function (user, model) {
    return user._id.equals(model.creator._id) || user.username === adminUsername
  },

  delete: function (user, model) {
    return user._id.equals(model.creator._id) || user.username === adminUsername
  }
}

module.exports = exports = function abilitiesPlugin (schema, options) {
  schema.methods.can = function can (rule, model) {
    return rules[rule](this, model)
  }
}
