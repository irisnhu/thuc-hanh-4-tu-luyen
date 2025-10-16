const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Thêm dòng này
app.use(express.json());
app.use('/api', userRoutes);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));