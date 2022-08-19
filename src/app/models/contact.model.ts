import mongoose, {Document} from 'mongoose';

interface Account extends Document {
  fullName: string,
  email: string,
  phoneNumber: string,
  message: string,
  contactReq: Boolean,
}

const schema = new mongoose.Schema<Account>({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    maxLength: 11,
  },
  message: {
    type: String,
  },
  contactReq: {
    type: Boolean,
    default: false,
  }
}, {
  //config to createdAt, updatedAt
  timestamps: true,
});

export const ContactModel = mongoose.model('contact', schema);
