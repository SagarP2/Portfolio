const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  mainimage: {
    type: String,
    required: true
  },
  secondaryimage: {
    type: String
  },
  publishedYear: {
    type: Number
  },
  shortDescription: {
    type: String,
    trim: true
  },
  officialWebsiteLink: {
    type: String,
    trim: true
  },
  gitHubLink: {
    type: String,
    required: true,
    trim: true
  },
  services: [{
    type: String,
    trim: true
  }],
  industries: [{
    type: String,
    trim: true
  }],
  technicalDescription: {
    type: String,
    trim: true
  },
  learningDescription: {
    type: String,
    trim: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 