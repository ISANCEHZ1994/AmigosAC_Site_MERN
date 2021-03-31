import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from '../yugioh_store_backend/routes/store_routes'; // importing the routes from file datingRoutes from folder routes
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Mongo Connection - we are now connected to MongoDB and can use it however we like
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/card-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Body-Parser Setup 
app.use(express.json({ extended: false })); 

// CORS (Cross Origin Resource Sharing) Setup
app.use( cors() ); 
// this is what makes it ok for frontend to get information from backend

routes(app);

// EXPRESS ROUTING ---------------------------------------->

// we created the route '/'  with a callback function to run
app.get('/', ( req, res ) => 
    res.send(`The company website is running on port: ${PORT}`)
)

app.listen( PORT, () => console.log(`Server started on ${PORT}`) );