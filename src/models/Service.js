import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Service slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add text index for search functionality
serviceSchema.index({ title: 'text', description: 'text' });

// Add unique index for slug
serviceSchema.index({ slug: 1 }, { unique: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service; 