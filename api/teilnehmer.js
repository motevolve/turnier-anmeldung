import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "teilnehmer.json");

  try {
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);
    res.status(200).json(data);
  } catch (err) {
    console.error("Fehler beim Lesen:", err);
    res.status(500).json({ error: "Fehler beim Lesen der Teilnehmerliste." });
  }
}
