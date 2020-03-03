import 'mongoose-bcrypt';
import bcrypt from 'bcrypt-nodejs';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';

import mongoose from '../../database';

const { Schema } = mongoose;

const Phones = new Schema(
  {
    area: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    phones: {
      type: [Phones],
      required: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    lastLogin: {
      type: Date,
      trim: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

UserSchema.statics.comparePassword = (candidatePassword, password) => {
  const isMatch = bcrypt.compareSync(candidatePassword, password);
  return isMatch;
};

UserSchema.statics.generateToken = _id => {
  return jwt.sign({ _id }, process.env.APP_KEY, {
    expiresIn: 60 * 30,
  });
};

UserSchema.plugin(require('mongoose-bcrypt'), {
  rounds: 8,
});

export default mongoose.model('User', UserSchema);
