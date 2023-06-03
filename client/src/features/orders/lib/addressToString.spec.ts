import { addressToString } from "./addressToString";
import type { OrderAddress } from "./ordersApi";

describe("features/orders/lib/addressToString", () => {
  it("returns the string version of OrderAddress", () => {
    const fixture: OrderAddress = {
      city: "Jest",
      countryIso3: "JST",
      street: "Unit test 123",
      zipCode: "15234",
    };

    expect(addressToString(fixture)).toStrictEqual("Unit test 123 15234 Jest");
  });
});
