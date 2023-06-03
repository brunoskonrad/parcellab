import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 3020;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const format = process.env.DEV === "product" ? "tiny" : "dev";
app.use(morgan(format));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL as string, {});

  app.listen(PORT, () => console.log(`Runnig on port ${PORT} ⚡`));
}

main();
