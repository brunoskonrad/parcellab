const fs = require("fs");
const path = require("path");

async function seedResource(resource) {
  const formData = new FormData();

  const seedPath = path.join(__dirname, "../", `csv/${resource}.csv`);
  const open = fs.readFileSync(seedPath);
  const fileBlob = new Blob([open]);

  formData.append("csv", fileBlob);

  const response = await fetch(`http://localhost:3020/import/${resource}`, {
    method: "POST",
    body: formData,
  });

  return response.ok;
}

async function seedTrackings() {
  return seedResource("trackings");
}

async function seedCheckpoints() {
  return seedResource("checkpoints");
}

async function seed() {
  const trackings = await seedTrackings();

  if (trackings) {
    await seedCheckpoints();

    console.log("🌱 complete");
  }
}

seed();
