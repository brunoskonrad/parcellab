import { parse } from "csv-parse";

export function parseCSV<T>(csv: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const records: string[][] = [];

    // Initialize the parser
    const parser = parse({
      delimiter: ";",
    });
    // Use the readable stream api to consume records
    parser.on("readable", function () {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });
    // Catch any error
    parser.on("error", reject);

    // Test that the parsed records matched the expected records
    parser.on("end", function () {
      const [keys, ...entries] = records;

      const output: T[] = [];

      entries.forEach((entry) => {
        const individualEntry = entry.reduce((value, next, index) => {
          try {
            value[keys[index]] = JSON.parse(next);
          } catch (_err) {
            value[keys[index]] = next;
          } finally {
            if (value[keys[index]] === "") {
              value[keys[index]] = undefined;
            }
          }

          return value;
        }, {} as { [key: string]: any });

        output.push(individualEntry as T);
      });

      resolve(output);
    });

    parser.write(csv.trim());

    // Close the readable stream
    parser.end();
  });
}
