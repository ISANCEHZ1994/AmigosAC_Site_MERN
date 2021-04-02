import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import axios from 'axios';

const app = express();

const PORT = process.env.PORT || 3001;

// Mongo Connection - we are now connected to MongoDB and can use it however we like
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb+srv://ISANCHEZ94:Is092094@amigossite.36dzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

// Body-Parser via Express Setup 
app.use(express.json({ extended: false })); 

// CORS (Cross Origin Resource Sharing) Setup
app.use( cors() ); 

// routes(app);

// EXPRESS ROUTING ---------------------------------------->

// we created the route '/'  with a callback function to run
app.get('/', ( req, res ) => 
    res.send(`The company website is running on port: ${PORT}`)
)

app.listen( PORT, () => console.log(`Server started on ${PORT}`) );