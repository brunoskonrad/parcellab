import request from "supertest";
import { app } from "./app";
import { getOrders } from "./features/orders/actions/getOrders";
import {
  OrderDetail,
  getOrderByEmailAndNumber,
} from "./features/orders/actions/getOrderByEmailAndNumber";

jest.mock("./features/orders/actions/getOrders", () => {
  return {
    getOrders: jest.fn(),
  };
});
const mockGetOrders = getOrders as jest.MockedFunction<typeof getOrders>;

jest.mock("./features/orders/actions/getOrderByEmailAndNumber", () => {
  return {
    getOrderByEmailAndNumber: jest.fn(),
  };
});
const mockGetOrderByEmailAndNumber =
  getOrderByEmailAndNumber as jest.MockedFunction<
    typeof getOrderByEmailAndNumber
  >;

describe("app", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("/orders", () => {
    it("returns 200 when user has orders", (done) => {
      const fixture = [
        {
          address: {
            city: "Jest",
            countryIso3: "JST",
            street: "Unit test 123",
            zipCode: "15234",
          },
          orderNumber: "1234",
          deliveryStatusText: "Tests passing",
        },
      ];
      mockGetOrders.mockResolvedValue(fixture);

      request(app)
        .get("/orders")
        .set({ "X-Authentication-Email": "test@email.com" })
        .expect("Content-Type", /json/)
        .expect(200, fixture, done);
    });

    it("returns 200 with empty array when user has no orders", (done) => {
      mockGetOrders.mockResolvedValue([]);

      request(app)
        .get("/orders")
        .set({ "X-Authentication-Email": "test@email.com" })
        .expect("Content-Type", /json/)
        .expect(200, [], done);
    });

    it("returns 401 when missing authentication header", (done) => {
      mockGetOrders.mockResolvedValue([]);

      request(app).get("/orders").expect(401, done);
    });
  });

  describe("/orders/:id", () => {
    it("returns 200 when user has orders", (done) => {
      const fixture: OrderDetail = {
        address: {
          city: "Jest",
          countryIso3: "JST",
          street: "Unit test 123",
          zipCode: "15234",
        },
        checkpoint: {
          statusDetails: "Details",
          statusText: "Text",
        },
        orderNumber: "1234",
        trackingNumber: "4321",
        products: [
          {
            articleNumber: "ART-123",
            imageUrl: "https://image.com/image.png",
            name: "Product name",
            quantity: 2,
          },
        ],
      };
      mockGetOrderByEmailAndNumber.mockResolvedValue(fixture);

      request(app)
        .get("/orders/1234")
        .set({ "X-Authentication-Email": "test@email.com" })
        .expect("Content-Type", /json/)
        .expect(200, fixture, done);
    });

    it("returns 404 with empty array when user has no orders", (done) => {
      mockGetOrderByEmailAndNumber.mockResolvedValue(null);

      request(app)
        .get("/orders/1234")
        .set({ "X-Authentication-Email": "test@email.com" })
        .expect(404, done);
    });

    it("returns 401 when missing authentication header", (done) => {
      mockGetOrderByEmailAndNumber.mockResolvedValue(null);

      request(app).get("/orders/1234").expect(401, done);
    });
  });
});
