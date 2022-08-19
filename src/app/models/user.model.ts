import mongoose, {Document} from 'mongoose';

interface Account extends Document{
  username: string,
  email: string,
  password: string,
  role: string
}

const schema = new mongoose.Schema<Account>({
  username: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String,
    select: false
  },
  role: {
    default: 'user',
    type: String,
  },
}, {
  timestamps: true,
});

export const AccountModel = mongoose.model('user', schema);
