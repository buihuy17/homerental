import mongoose, {Document} from 'mongoose';

interface Account extends Document {
  title: string,
  email: string,
  password: string,
  role: string,
  image: Object,
  descriptionHTML: string,
  descriptionText: string,
}

const schema = new mongoose.Schema<Account>({
  title: {
    type: String,
  },
  image: {
    public_id: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  descriptionHTML: {
    type: String,
  },
  descriptionText: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const BlogModel = mongoose.model('blog', schema);
