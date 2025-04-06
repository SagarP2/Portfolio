import mongoose from 'mongoose';

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
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service ID is required']
  },
  icon: {
    type: String,
    trim: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
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
subServiceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add text index for search functionality
subServiceSchema.index({ title: 'text', description: 'text' });

// Add compound index for serviceId and order
subServiceSchema.index({ serviceId: 1, order: 1 });

const SubService = mongoose.model('SubService', subServiceSchema);

export default SubService; 