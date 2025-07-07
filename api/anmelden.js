import fs from "fs/promises";
import path from "path";

const MAX_TEILNEHMER_PRO_MODUS = 24;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }

  const { name, email, modus } = req.body;

  if (!name || !email || !modus) {
    return res.status(400).json({ error: "Bitte alle Felder ausfüllen." });
  }

  const erlaubteModi = ["Challenger", "Champions"];
  if (!erlaubteModi.includes(modus)) {
    return res.status(400).json({ error: "Ungültiger Modus" });
  }

  const filePath = path.join(process.cwd(), "teilnehmer.json");

  try {
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    const anzahl = data.filter(t => t.modus === modus).length;
    if (anzahl >= MAX_TEILNEHMER_PRO_MODUS) {
      return res.status(400).json({ error: "Dieser Modus ist voll!" });
    }

    data.push({ name, email, modus });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Fehler beim Schreiben der Datei:", err);
    return res.status(500).json({ error: "Serverfehler beim Speichern" });
  }
}
