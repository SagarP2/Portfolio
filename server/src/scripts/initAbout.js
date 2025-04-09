require('dotenv').config();
const mongoose = require('mongoose');
const About = require('../models/About');

async function initAbout() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techveda');
    console.log('Connected to MongoDB');

    const aboutCount = await About.countDocuments();
    console.log('Number of about documents:', aboutCount);

    if (aboutCount === 0) {
      const defaultAbout = new About({
        title: 'About Us',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        paragraphs: [
          'At Techveda, we believe in the power of technology to transform businesses and enhance lives. Founded in 2020, our journey began with a simple mission: to create digital solutions that make a difference.',
          'We\'re a team of passionate designers, developers, and strategists who thrive on solving complex problems through innovative technology. With expertise spanning web development, mobile applications, UI/UX design, and digital marketing, we bring a comprehensive approach to every project.',
          'What sets us apart is our commitment to understanding your unique needs. We don\'t just build products; we craft experiences that align with your business goals and resonate with your audience. Our collaborative process ensures that your vision is at the heart of everything we create.',
          'From startups to established enterprises, we\'ve helped clients across industries elevate their digital presence and achieve measurable results. We\'re excited about the possibilities that technology brings and look forward to helping you navigate the ever-evolving digital landscape.'
        ],
        highlights: [
          { text: 'Techveda', paragraphIndex: 0 }
        ]
      });

      await defaultAbout.save();
      console.log('Created default about document');
    } else {
      console.log('About document already exists');
    }

    const about = await About.findOne();
    console.log('Current about document:', about);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

initAbout(); 