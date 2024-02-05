const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({ // refresh, id-user + можно добавить ip, browser
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = model('Token', TokenSchema);
