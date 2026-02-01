import express from "express";
import mongoose from "mongoose";


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
      await mongoose.connect("")
      console.log("Database Connected")
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  initializeRoutes(): void {
    this.app.use(express.json())
    this.app.get("/", (req, res) => {
      return res.status(200).send("Welcome, Server Working")
    })
  }
}