# Inventory Management System Backend

A robust RESTful API backend for managing inventory, products, suppliers, and categories. Built with **Node.js**, **Express**, and **TypeScript**, this project follows Object-Oriented Programming (OOP) principles and a clean **Controller-Service-Model** architecture.

## 🚀 Features

* **Product Management:** Create, read, and track products with SKU generation.
* **Inventory Control:** Adjust stock levels with transaction logging (Inbound/Outbound/Adjustment).
* **Stock Alerts:** Automatic status updates (Low Stock, Out of Stock) based on quantity.
* **Categorization:** Organize products into active categories.
* **Supplier Management:** Manage supplier details.
* **Search & Filtering:** Retrieve products with populated category and supplier details.
* **Clean Architecture:** Separation of concerns using Services and Controllers.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Tools:** Dotenv (Config), CORS (Security), Nodemon (Dev)

---

## ⚙️ Local Setup & Installation

Follow these steps to get the project running on your local machine.

### 1. Prerequisites
* Node.js (v14+ recommended)
* MongoDB installed and running locally OR a MongoDB Atlas connection string.

### 2. Clone the Repository
```bash
git clone <repository_url>
cd inventary_management_backend

```

### 3. Install Dependencies

```bash
npm install

```

### 4. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/inventory-app

```

*(Note: If using MongoDB Atlas, replace the URI with your cloud connection string)*

### 5. Seed the Database (Optional)

To populate the database with initial Categories (Electronics, Furniture) and Suppliers (Samsung, IKEA) for testing:

```bash
npm run seed

```

### 6. Run the Server

Start the development server with hot-reloading:

```bash
npm run dev

```

The server will start at `http://localhost:4000`.

---

## 📡 API Endpoints

### 📦 Products

| Method | Endpoint | Description | Body / Params |
| --- | --- | --- | --- |
| **GET** | `/api/products` | Get all products | - |
| **GET** | `/api/products/:id` | Get single product | `id` (URL Param) |
| **POST** | `/api/products` | Create a product | `{ name, price, category, supplier, stockLevel, minStockLevel }` |
| **PATCH** | `/api/products/:id/stock` | Adjust stock | `{ quantity: 10, type: "INBOUND" | "OUTBOUND", reason: "Restock" }` |

**Stock Adjustment Types:**

* `INBOUND`: Adds stock.
* `OUTBOUND`: Subtracts stock (Checks for sufficient quantity).
* `ADJUSTMENT`: Adds stock (Used for corrections).

### 🗂️ Categories

| Method | Endpoint | Description | Body / Params |
| --- | --- | --- | --- |
| **GET** | `/api/categories` | Get active categories | - |
| **POST** | `/api/categories` | Create category | `{ name, description }` |

### 🚚 Suppliers

| Method | Endpoint | Description | Body / Params |
| --- | --- | --- | --- |
| **GET** | `/api/suppliers` | Get all suppliers | - |
| **POST** | `/api/suppliers` | Create supplier | `{pK name, email, phone, address }` |

---

## VX Project Structure

```
src/
├── config/         # Database connection logic
├── controllers/    # Request handling (req, res)
├── middleware/     # Error handling and other interceptors
├── models/         # Mongoose Schemas & Interfaces
├── routes/         # API Route definitions
├── services/       # Business logic (Stock math, Validations)
├── app.ts          # Express App configuration
└── server.ts       # Server entry point

```
