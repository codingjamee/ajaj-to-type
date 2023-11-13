import { Schema, model } from 'mongoose';


const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  madeAt: {
    type: Date,
    default: null,
  },
});

const RefreshTokenModel = model('RefreshToken', refreshTokenSchema);

export { RefreshTokenModel };
