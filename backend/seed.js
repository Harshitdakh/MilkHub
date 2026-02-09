const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); 
const bcrypt = require('bcryptjs');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // 1. Clear existing users to prevent duplicates
    await User.deleteMany();

    // 2. Prepare Hashed Passwords
    const salt = await bcrypt.genSalt(10);
    
    // Create specific hashes for Mahavir and Rahul
    const mahavirHash = await bcrypt.hash("jai_jinendra", salt);
    const rahulHash = await bcrypt.hash("RAHUL1973", salt);
    // Default hash for everyone else
    const defaultHash = await bcrypt.hash("password123", salt);

    // 3. Mandsaur Locations
    const locations = ["Nai Abadi", "Dashrath Nagar", "Kalakhet", "Station Road", "Mandsaur City"];

    const users = [
      { 
        name: "Mahavir Dhud", 
        email: "mahavir@milkhub.com", 
        password: jai_jinendra, // Now correctly hashed string
        role: "seller",
        phone: "9876543210",
        location: "Nai Abadi, Mandsaur",
        language: "hi" 
      },
      { 
        name: "Rahul Sharma", 
        email: "rahul@gmail.com", 
        password: RAHUL1973, // Now correctly hashed string
        role: "buyer", 
        phone: "9000000001",
        location: "Dashrath Nagar",
        language: "hi" 
      },
      { 
        name: "Suresh Patidar", 
        email: "suresh@gmail.com", 
        password: defaultHash, 
        role: "buyer", 
        phone: "9000000002",
        location: "Kalakhet",
        language: "hi" 
      },
      { 
        name: "Ankit Jain", 
        email: "ankit@gmail.com", 
        password: defaultHash, 
        role: "buyer", 
        phone: "9000000003",
        location: "Station Road",
        language: "hi" 
      }
    ];

    // 4. Generate the remaining buyers to reach 20 total
    for(let i = 1; i <= 17; i++) {
      users.push({
        name: `Mandsaur Resident ${i}`,
        email: `user${i}@mandsaur.com`,
        password: defaultHash,
        role: "buyer",
        phone: `91000000${i < 10 ? '0' + i : i}`,
        location: locations[i % locations.length],
        language: i % 2 === 0 ? "hi" : "en"
      });
    }

    // 5. Insert and Close
    await User.insertMany(users);
    console.log("✅ Success: Mahavir and 20 Buyers added with Mandsaur locations!");
    
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();