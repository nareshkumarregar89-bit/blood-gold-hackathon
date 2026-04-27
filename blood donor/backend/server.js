const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Mongoose Schemas
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  lives: { type: Number, default: 0 },
  points: { type: Number, default: 500 },
  location: String,
  phone: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const Donor = mongoose.model('Donor', donorSchema);

const inventorySchema = new mongoose.Schema({
  group: { type: String, unique: true },
  count: { type: Number, default: 0 }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

const sosSchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  hospital: String,
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

const SOS = mongoose.model('SOS', sosSchema);

// Initial Inventory Setup (if empty)
const seedInventory = async () => {
  const count = await Inventory.countDocuments();
  if (count === 0) {
    const initialData = [
      { group: 'A+', count: 12 }, { group: 'A-', count: 5 },
      { group: 'B+', count: 18 }, { group: 'B-', count: 3 },
      { group: 'AB+', count: 8 }, { group: 'AB-', count: 2 },
      { group: 'O+', count: 25 }, { group: 'O-', count: 7 }
    ];
    await Inventory.insertMany(initialData);
  }
};
seedInventory();

// Routes
app.get('/api/seed', async (req, res) => {
  try {
    const donorsCount = await Donor.countDocuments();
    if (donorsCount === 0) {
      const initialDonors = [
        { name: "Rahul Sharma", bloodGroup: "O+", lives: 42, points: 8400, location: "Malviya Nagar", phone: "9876543210", email: "rahul@example.com" },
        { name: "Priya Singh", bloodGroup: "A-", lives: 38, points: 7600, location: "Vaishali Nagar", phone: "9876543211", email: "priya@example.com" },
        { name: "Amit Verma", bloodGroup: "B+", lives: 31, points: 6200, location: "C-Scheme", phone: "9876543212", email: "amit@example.com" }
      ];
      await Donor.insertMany(initialDonors);
    }
    await seedInventory();
    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/donors', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/donors/register', async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    const formatted = items.reduce((acc, curr) => {
      acc[curr.group] = curr.count;
      return acc;
    }, {});
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const sorted = await Donor.find().sort({ points: -1 });
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/sos', async (req, res) => {
  try {
    const newRequest = new SOS(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const donors = await Donor.find();
    const sosRequests = await SOS.find({ status: 'Active' });
    res.json({
      livesSaved: donors.reduce((acc, curr) => acc + (curr.lives || 0), 0),
      activeDonors: donors.length,
      emergencyRequests: sosRequests.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
