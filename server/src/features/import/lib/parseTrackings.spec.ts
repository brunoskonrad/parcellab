import { TrackingCSV } from "../types";
import { mergeProducts, parseTrackingsCSVToOrders } from "./parseTrackings";

describe("features/import/lib/parseTrackings", () => {
  describe("parseTrackingsCSVToOrders", () => {
    it("returns empty array when theres no tracking CSV", () => {
      expect(parseTrackingsCSVToOrders([])).toStrictEqual([]);
    });

    it("parses tracking CSV into Orders", () => {
      expect(
        parseTrackingsCSVToOrders([
          createFixture({
            orderNo: "1234",
            articleNo: "ART-223",
            articleImageUrl: "https://image.com/image2.png",
            product_name: "Product 2",
            quantity: 1,
          }),
          createFixture({
            orderNo: "1234",
            articleNo: "ART-123",
            articleImageUrl: "https://image.com/image.png",
            product_name: "Product",
            quantity: 2,
          }),
          createFixture({
            orderNo: "7688",
            tracking_number: "7777",
          }),
        ])
      ).toStrictEqual([
        {
          orderNumber: "1234",
          trackingNumber: "4321",
          courier: expect.any(String),
          email: expect.any(String),
          address: {
            city: expect.any(String),
            countryIso3: expect.any(String),
            zipCode: expect.any(String),
            street: expect.any(String),
          },
          products: [
            expect.objectContaining({
              articleNumber: expect.any(String),
              imageUrl: expect.any(String),
              name: expect.any(String),
              quantity: expect.any(Number),
            }),
            expect.objectContaining({
              articleNumber: expect.any(String),
              imageUrl: expect.any(String),
              name: expect.any(String),
              quantity: expect.any(Number),
            }),
          ],
          checkpoints: [],
        },
        {
          orderNumber: "7688",
          trackingNumber: "7777",
          courier: expect.any(String),
          email: expect.any(String),
          address: {
            city: expect.any(String),
            countryIso3: expect.any(String),
            zipCode: expect.any(String),
            street: expect.any(String),
          },
          products: [],
          checkpoints: [],
        },
      ]);
    });
  });

  describe("mergeProducts", () => {
    it("returns empty array when trackings have no product", () => {
      const fixture: TrackingCSV[] = [
        createFixture(),
        createFixture(),
        createFixture(),
      ];

      expect(mergeProducts(fixture)).toStrictEqual([]);
    });

    it("returns merged products from tracking CSV", () => {
      const fixture: TrackingCSV[] = [
        createFixture(),
        createFixture({
          articleNo: "ART-223",
          articleImageUrl: "https://image.com/image2.png",
          product_name: "Product 2",
          quantity: 1,
        }),
        createFixture({
          articleNo: "ART-123",
          articleImageUrl: "https://image.com/image.png",
          product_name: "Product",
          quantity: 2,
        }),
      ];

      expect(mergeProducts(fixture)).toStrictEqual([
        {
          articleNumber: "ART-223",
          imageUrl: "https://image.com/image2.png",
          name: "Product 2",
          quantity: 1,
        },
        {
          articleNumber: "ART-123",
          imageUrl: "https://image.com/image.png",
          name: "Product",
          quantity: 2,
        },
      ]);
    });
  });
});

function createFixture(override: Partial<TrackingCSV> = {}): TrackingCSV {
  return {
    email: "test@email.com",
    orderNo: "1234",
    tracking_number: "4321",
    city: "Jest",
    zip_code: 99912,
    street: "Test Str. 12",
    destination_country_iso3: "JST",
    courier: "UNIT",
    ...override,
  };
}
