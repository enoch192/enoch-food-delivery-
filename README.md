# ENOCH Food Delivery 🍕

A full-stack web application designed for browsing local Ethiopian culinary menus, managing a dynamic shopping cart, and processing digital checkouts. Built with a decoupled architecture, this project integrates a vanilla JavaScript frontend client with a Node.js/Express API backend and a persistent MySQL database via Sequelize ORM.

---

## 🏗️ Architecture & Directory Layout

The project enforces a clean separation of concerns by isolating the client interface from the backend server logic:

```text
enoch-food-delivery/
│
├── backend/
│   ├── server.js          # Express app configuration, database syncing, & API routes
│   ├── package.json       # Backend dependencies (express, cors, sequelize, mysql2)
│   └── package-lock.json  # Dependency tree lockfile
│
├── frontend/
│   ├── index.html         # User interface structure & payment forms
│   ├── style.css          # Core layouts, flexbox/grid system, & responsive rules
│   └── app.js             # Menu rendering, cart state engine, & fetch API integration
│
├── .gitignore             # Excludes node_modules and local environments from version control
└── README.md              # Project documentation & setup guide
