const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service ID is required'],
    index: true
  },
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
    required: [true, 'Image URL is required'],
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  features: {
    type: [String],
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

subServiceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for faster queries
subServiceSchema.index({ title: 'text', description: 'text' });
subServiceSchema.index({ serviceId: 1, order: 1 });

const SubService = mongoose.model('SubService', subServiceSchema);

module.exports = SubService; 