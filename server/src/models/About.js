const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'About Us'
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  paragraphs: [{
    type: String,
    required: true,
    trim: true
  }],
  highlights: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    paragraphIndex: {
      type: Number,
      required: true
    }
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure there's only one about document
aboutSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    if (count > 0) {
      throw new Error('Only one about document can exist');
    }
  }
  next();
});

// Add a method to update the about document
aboutSchema.statics.updateAbout = async function(updateData) {
  console.log('updateAbout method called with:', updateData);
  
  try {
    // Find the existing about document
    let about = await this.findOne();
    
    if (!about) {
      console.log('No existing about document found, creating new one');
      about = new this(updateData);
    } else {
      console.log('Updating existing about document');
      // Update the fields
      about.title = updateData.title;
      about.image = updateData.image;
      about.paragraphs = updateData.paragraphs;
      about.highlights = updateData.highlights || [];
      about.updatedAt = Date.now();
    }
    
    // Save the document
    console.log('Saving about document:', about);
    await about.save();
    console.log('About document saved successfully');
    
    return about;
  } catch (error) {
    console.error('Error in updateAbout method:', error);
    throw error;
  }
};

const About = mongoose.model('About', aboutSchema);

module.exports = About; 