import express, { Express, NextFunction, Request, Response } from "express";
import { getOrders } from "./features/orders/actions/getOrders";
import { getOrderByEmailAndNumber } from "./features/orders/actions/getOrderByEmailAndNumber";
import multer from "multer";
import { importTracking } from "./features/import/actions/importTrackings";
import { importCheckpoints } from "./features/import/actions/importCheckpoints";

export const app: Express = express();
const upload = multer();

/**
 * Checks if the user is authenticated. User needs to have an email set on the x-authentication-email header
 */
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

app.get("/orders", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const email = req.headers["x-authentication-email"];
    const orders = await getOrders(email);

    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/orders/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const email = req.headers["x-authentication-email"];
    const order = await getOrderByEmailAndNumber(email, req.params.id);

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
  async (req: Request, res: Response) => {
    if (req.file) {
      try {
        await importTracking(req.file.buffer.toString());
        res.status(201).send();
      } catch (error) {
        res.status(500).send();
      }
    } else {
      res.status(400).send();
    }
  }
);

app.post(
  "/import/checkpoints",
  upload.single("csv"),
  async (req: Request, res: Response) => {
    if (req.file) {
      try {
        await importCheckpoints(req.file.buffer.toString());
        res.status(201).send();
      } catch (error) {
        res.status(500).send();
      }
    } else {
      res.status(400).send();
    }
  }
);
