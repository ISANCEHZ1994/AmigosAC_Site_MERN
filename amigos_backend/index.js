import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser'; // I have heard that express does the same thing! - CONSIDER CHANGING 
import cors from 'cors';
import routes from '../yugioh_store_backend/routes/store_routes'; // importing the routes from file datingRoutes from folder routes
import axios from 'axios';
import { DataSchema } from './models/dataModel';


const app = express();
const PORT = 3001;

// Mongo Connection - we are now connected to MongoDB and can use it however we like
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/card-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Body-Parser Setup 
// used to transpile the request into something that mongo/database can understand
app.use(bodyparser.urlencoded( { extended: true } ) ); // allows use to pass the request and encode it properly
app.use(bodyparser.json()); 

axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(function (response) {
    // onSuccess(response)
    // console.log(response.data.data.map(c=>c.name),'should have gotten all names?') // CONFIRM this does gives me ALL NAMES
  })
  .catch(function (error) {
    console.log(error);
  });

// const Data = mongoose.model('Data', DataSchema)
// var Data = mongoose.model('Data', repSchema);

// function onSuccess(response) {
//     var array = response;
//   //  var arraytobe = response;
//   var arrayLength = Object.keys(array).length 
//     console.log(arrayLength)
//    for(var i = 0; i <= arrayLength; i++) {
//       var name = array.data[i].name;
//       var desc = array.data[i].description;
//       var url = array.data[i].html_url;
//       console.log( name + " " + desc + " " + url);

//       assignDataValue(name, desc, url)
//     }
// }

// function assignDataValue(name, desc, url) {

//     var upData = new Data()
//        upData.name = name;
//        upData.description = desc;
//        upData.url = url;
 
//        upData.save();
//  }

// CORS (Cross Origin Resource Sharing) Setup
app.use( cors() ); 
// allows restricted resources on a web page to be requested from another 
// domain outside the domain from which the first resource was served

routes(app);

// EXPRESS ROUTING ---------------------------------------->

// we created the route '/'  with a callback function to run
app.get('/', ( req, res ) => // when we have a REQUEST we want a RESPONSE --> ALWAYS DO IT THIS WAY
    res.send(`My card store is on port ${PORT} LET'S GOOOOOOO`)
)

app.listen(PORT, () => 
    console.log(`MY card server is running on ${PORT}`)
)