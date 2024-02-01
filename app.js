require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://somud6711:Qv5mtWMJMN9NY1eI@somucluster.pcztszd.mongodb.net/MYDB?retryWrites=true&w=majority',{
  //useNewUrlParser: true,
  //useUnifiedTopology: true,

}).then(() => {
  console.log("Connected To MongoDB...");
}).catch((err) => {
  console.error("Error Connecting To MongoDB:", err);
  process.exit(1); // Exit the application if there's a connection error
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    // Add additional validation like regex or custom functions for email format
  },
  phone: String,
  password: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type:String,
    required: false,
  },
  tc: Boolean,
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(express.json());

app.post('/submit-form', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: 'An error occurred while saving user data' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

