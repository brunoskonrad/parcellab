const fs = require("fs");
const path = require("path");

async function seedTrackings() {
  const formData = new FormData();

  const seedPath = path.join(__dirname, "../", "csv/trackings.csv");
  const open = fs.readFileSync(seedPath);
  const fileBlob = new Blob([open]);

  formData.append("csv", fileBlob);

  const response = await fetch("http://localhost:3020/import/trackings", {
    method: "POST",
    body: formData,
  });

  return response.ok;
}

async function seedCheckpoints() {
  const formData = new FormData();

  const seedPath = path.join(__dirname, "../", "csv/checkpoints.csv");
  const open = fs.readFileSync(seedPath);
  const fileBlob = new Blob([open]);

  formData.append("csv", fileBlob);

  const response = await fetch("http://localhost:3020/import/checkpoints", {
    method: "POST",
    body: formData,
  });

  return response.ok;
}

async function seed() {
  const trackings = await seedTrackings();

  if (trackings) {
    await seedCheckpoints();

    console.log("🌱 complete");
  }
}

seed();
