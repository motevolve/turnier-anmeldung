const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../teilnehmer.json");

module.exports = (req, res) => {
  if (!fs.existsSync(filePath)) return res.status(200).json([]);
  const data = fs.readFileSync(filePath);
  res.status(200).json(JSON.parse(data));
};
