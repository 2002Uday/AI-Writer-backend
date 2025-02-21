const express = require("express");
require('dotenv').config();
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoutes')
const cors = require('cors');

const connectDB = require('./dbConnect');
const app = express();
const Port = process.env.PORT
// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors())
app.use('/api/auth', userRoute);
app.use('/api/chat', chatRoute);

app.get('/', (req, res) => {
    res.json({message: "Hello World! Home Page"})
});

app.listen(Port, () => {
    console.log('Server is Started on Port:', Port);
})