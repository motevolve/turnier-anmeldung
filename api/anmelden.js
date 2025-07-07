import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, modus } = req.body;

  if (!name || !email || !["Challenger", "Champions"].includes(modus)) {
    return res.status(400).json({ error: "Ungültige Eingabe" });
  }

  try {
    const snapshot = await db
      .collection("teilnehmer")
      .where("modus", "==", modus)
      .get();

    if (snapshot.size >= 24) {
      return res.status(400).json({ error: "Modus voll" });
    }

    await db.collection("teilnehmer").add({ name, email, modus });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Fehler:", err);
    res.status(500).json({ error: "Serverfehler" });
  }
}
