const mongoose =  require('mongoose');
const cities = require('./cities');
const {places, descriptors}= require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>{
    console.log("started")
}).catch((err)=>{
    console.log(err)
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'63bd3bf8295a0ea817e41a97',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,            
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, rem magnam voluptates soluta cum blanditiis exercitationem quis dolorum error adipisci atque nostrum corporis et voluptatibus quam quos, ab impedit molestias.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dvufewumj/image/upload/v1674535843/yelpcampp/s42sekpcmpbm41l7cd5m.jpg',
                  filename: 'yelpcampp/s42sekpcmpbm41l7cd5m',
                },
                {
                  url: 'https://res.cloudinary.com/dvufewumj/image/upload/v1674535843/yelpcampp/dsngargoxwjthrmvrgrr.jpg',
                  filename: 'yelpcampp/dsngargoxwjthrmvrgrr',
                }
              ]
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
