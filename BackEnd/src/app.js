const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

// app.use(cors({
//     origin: "https://ai-code-reviewer-frontend-60eu.onrender.com"
// }));

// Define an array of allowed origins
const allowedOrigins = [
  'http://localhost:5173',                                      // Your local Vite dev server
  'https://ai-code-reviewer-frontend-60eu.onrender.com'         // Your live Render frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app