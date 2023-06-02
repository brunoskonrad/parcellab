import { parseCSV } from "./parseCSV";

type Fixture = {
  name: string;
  favouriteColour: string;
  favouriteNumber: number;
  lucky: boolean;
  optional?: string;
};

describe("lib/parseCSV", () => {
  it("parses csv into a JavaScript array", async () => {
    const fixture = `name;favouriteColour;favouriteNumber;lucky;optional
John Doe;Purple;42;true;
Billie Eilish;Black;23;true;
Someone;Yellow;12;false;I have something!`;

    const expected: Fixture[] = [
      {
        name: "John Doe",
        favouriteColour: "Purple",
        favouriteNumber: 42,
        lucky: true,
        optional: undefined,
      },
      {
        name: "Billie Eilish",
        favouriteColour: "Black",
        favouriteNumber: 23,
        lucky: true,
        optional: undefined,
      },
      {
        name: "Someone",
        favouriteColour: "Yellow",
        favouriteNumber: 12,
        lucky: false,
        optional: "I have something!",
      },
    ];

    expect(await parseCSV<Fixture>(fixture)).toStrictEqual(expected);
  });
});
