const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Database Connection ---
// Ensure 'password123' (or your actual password) and 'enoch_db' are correct
const sequelize = new Sequelize("enoch_db", "root", "hEnok@19", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

// --- Model Definition ---
const Order = sequelize.define(
  "Order",
  {
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    // Disables the 'createdAt' and 'updatedAt' requirements
    timestamps: false,
  },
);

// --- Sync Database ---
sequelize
  .sync()
  .then(() => console.log("✅ Connected to MySQL & Tables Synced"))
  .catch((err) => console.error("❌ MySQL connection error:", err));

// --- Routes ---

app.get("/", (req, res) => {
  res.send("🚀 Backend (MySQL) is running...");
});

// Create Test Order
app.get("/create-test", async (req, res) => {
  try {
    const testOrder = await Order.create({
      items: [{ id: 1, price: 80 }],
      total: 80,
      phone: "0911111111",
      method: "telebirr",
    });

    res.json({
      message: "✅ Test order saved to MySQL!",
      order: testOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Checkout API
app.post("/api/checkout", async (req, res) => {
  try {
    const { cart, paymentMethod, phoneNumber } = req.body || {};

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    const newOrder = await Order.create({
      items: cart,
      total: totalAmount,
      phone: phoneNumber,
      method: paymentMethod,
    });

    res.json({
      success: true,
      message: "Order saved to database!",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get All Orders[cite: 1]
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
