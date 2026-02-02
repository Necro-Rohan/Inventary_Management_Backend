import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import CategoryRoutes from "./routes/category.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import SupplierRoutes from "./routes/supplier.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();


interface App_Interface{
  startServer(): void;
  connectDatabase(): void;
  initializeRoutes(): void;
}

export default class App implements App_Interface{
  PORT: number | string;
  app: express.Application;
  
  constructor(PORT: number| string = 4000) {
    this.PORT = PORT;
    this.app = express();
    this.startServer()
    this.connectDatabase()
    this.initializeRoutes()
  }

  startServer(): void {
    this.app.listen(this.PORT, () => {
        console.log(`Server is listening on Port http://localhost:${this.PORT}`)
      })
  }

  async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI || "")
      console.log("Database Connected")
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  initializeRoutes(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.get("/", (req, res) => {
      return res.status(200).send("Welcome, Server Working")
    })
    this.app.use("/api/categories", CategoryRoutes)
    this.app.use("/api/products", ProductRoutes)
    this.app.use("/api/suppliers", SupplierRoutes)

    this.app.use(errorHandler)
  }
}