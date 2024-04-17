const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router.js');
const dotenv = require('dotenv');


dotenv.config();
app.use(cors());
app.use(express.json({}))
app.use(express.urlencoded({
     extended: true
}))


// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.set('port', process.env.PORT || 8080)
let server = app.listen(app.get('port'),
   function(err){
       if(err) throw err;
       var message = 'Server is running @ http://localhost:' + server.address().port
       console.log(message);
   }
)
app.use('/api/v1',router)