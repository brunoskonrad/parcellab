import bodyParser from "body-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import { importTracking } from "./features/import/TrackingImporter";
import mongoose from "mongoose";
import { OrderModel } from "./features/orders/OrderModel";
import { importCheckpoints } from "./features/import/CheckpointsImporter";
import cors from "cors";
import { getOrders } from "./features/orders/actions/getOrders";
import { getOrderByEmailAndNumber } from "./features/orders/actions/getOrderByEmailAndNumber";

const upload = multer();

dotenv.config();

const PORT = process.env.PORT || 3020;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const email = req.headers["x-authentication-email"];

  if (!email) {
    res.sendStatus(401);
  } else {
    next();
  }
}

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.get("/orders", isAuthenticated, async (_req: Request, res: Response) => {
  try {
    const orders = await getOrders();

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const email = req.headers["x-authentication-email"];
    const order = getOrderByEmailAndNumber(email, req.params.id);

    if (order) {
      res.status(200).send(order);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

app.post(
  "/import/trackings",
  upload.single("csv"),
  (req: Request, res: Response) => {
    if (req.file) {
      importTracking(req.file.buffer.toString())
        .then(() => {
          res.status(201).send();
        })
        .catch(() => {
          res.status(500).send();
        });
    } else {
      res.status(400).send();
    }
  }
);

app.post(
  "/import/checkpoints",
  upload.single("csv"),
  (req: Request, res: Response) => {
    if (req.file) {
      importCheckpoints(req.file.buffer.toString())
        .then(() => {
          res.status(201).send();
        })
        .catch(() => {
          res.status(500).send();
        });
    } else {
      res.status(400).send();
    }
  }
);

async function main() {
  await mongoose.connect(process.env.DATABASE_URL as string, {});

  app.listen(PORT, () => console.log(`Runnig on port ${PORT} ⚡`));
}

main();
