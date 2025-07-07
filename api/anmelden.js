const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../teilnehmer.json");

function loadTeilnehmer() {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
}

function saveTeilnehmer(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, modus } = req.body;
  if (!name || !email || !modus) {
    return res.status(400).json({ error: "Ungültige Eingaben" });
  }

  const teilnehmer = loadTeilnehmer();

  const modusCount = teilnehmer.filter(t => t.modus === modus).length;
  if (modusCount >= 24) {
    return res.status(400).json({ error: `Maximale Teilnehmerzahl für ${modus} erreicht.` });
  }

  teilnehmer.push({ name, email, modus });
  saveTeilnehmer(teilnehmer);

  res.status(200).json({ success: true });
};
