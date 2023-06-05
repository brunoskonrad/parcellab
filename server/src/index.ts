import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 3020;

const format = process.env.DEV === "product" ? "tiny" : "dev";
app.use(morgan(format));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL as string, {});

  app.listen(PORT, () => console.log(`Runnig on port ${PORT} ⚡`));
}

main();
