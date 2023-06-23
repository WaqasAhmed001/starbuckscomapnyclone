const express = require('express');
const mongoose = require('mongoose');
const Join = require('./messageSchema');
const Login = require('./loginSchema');
const cors = require('cors');



// Create Express app
const app = express();
app.use(express.json());
// After creating the app instance
app.use(cors());


// Connect to MongoDB
// mongoose.connect('mongodb+srv://<username>:<password>@<cluster>/<database>',
mongoose.connect('mongodb+srv://wkhanami99:Khan1234..@cluster0.p82gisk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes
// Add your routes here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/joinNow', (req, res) => {
    const { name, email, phone, password } = req.body;
    
    const newjoin = new Join({
      name,
      email,
      phone,
      password
    });
  
    newjoin.save()
      .then(() => {
        res.status(201).json({ success: true, message: 'Data saved successfully' });
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
  });

  
  app.post('/loginNow', (req, res) => {
    const {  email, password } = req.body;
    
    Join.findOne({ email: email, password: password})
      .then((joinBttn) => {
        if (joinBttn) {
          const newlogin = new Login({
            email: email,
            password: password
          });
    
          newlogin.save()
            .then(() => {
              res.status(201).json({ success: true, message: 'Login successfully added' });
            })
            .catch((error) => {
              res.status(500).json({ success: false, error: error.message });
            });
        } else {
          res.status(404).json({ success: false, message: 'join failed' });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
  });
 
//for OTP

const twilio = require('twilio');
const accountSid = 'AC73cc212df9d17f068be2f6b72839a659';
const authToken = 'fbd0a1e70f6e306a2a6717a88c192a00';
const client = twilio(accountSid, authToken);

function generateOTP() {

//ye 5 ki length ka random number generate krta

  const otpLength = 5;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const joinNow = async (req, res) => {
  // console.log('errrrrorooooorr')
  const { name, email, phone, password } = req.body;
  const user = await Join.findOne({ email });
  if (!user) {
    // try {
      // const newSignUp = await signUp.create({ fname, sname, dateofbirth, phonenumb, gender, password, email, cnic })
      const otp = generateOTP();
      // const otp = 54321 
      client.messages
      .create({
        body: `Your OTP is: ${otp}`,
        from: '+14066257292',
        to: '+923135828354'
      })
      .then((message) => {
        console.log('Message sent:', message.sid)
      } )
      .catch((error) => console.error('Error sending message:', error));
      res.status(201).json({otp})
      console.log('else')
    // }
    // catch (error) {
    //   console.log(error)
    //   res.status(500).json({ error: error.message });
    // }
  }
  else {
    // const otp = 54321 
    res.status(202).json('This email already exist');

    // console.log('else')
  }
}
