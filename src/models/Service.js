import mongoose from 'mongoose';

// Define the SubService schema for embedded documents
const subServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Sub-service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Sub-service description is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  features: {
    type: [String],
    default: []
  }
});

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
  longDescription: {
    type: String,
    trim: true
  },
  process: {
    type: String,
    trim: true
  },
  features: {
    type: [String],
    default: []
  },
  icon: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String,
    trim: true
  },
  // Add subServices as an embedded array of documents with a default empty array
  subServices: {
    type: [subServiceSchema],
    default: []
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

const Service = mongoose.model('Service', serviceSchema);

export default Service; 