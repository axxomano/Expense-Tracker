const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.use(cors({origin: '*'}));


app.post('/users/signup', async (req, res) => {
    console.log(req.body); // Log the entire request body
  const { name, email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    bcrypt.hash(password,10,async(err,hash)=>{
        if(err) console.log(err)
        const newUser = await User.create({ name, email, password : hash });
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    })

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/users/login', async (req, res) => {
    console.log(req.body); // Log the entire request body
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(409).json({ message: 'Email doesnot exist' });
    }

    bcrypt.compare(password,existingUser.password, 
      (err,result)=>{
        if(err) throw new Error('Something went wrong!')
        if(result==true)
        return res.status(200).json({message: 'Logged in Succesfully'})
        else
        return res.status(400).json({message: 'Wrong Password'})
      })
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
