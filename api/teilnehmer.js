import { db } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const snapshot = await db.collection("teilnehmer").get();

    const teilnehmer = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(teilnehmer);
  } catch (error) {
    console.error("Fehler beim Laden der Teilnehmer:", error);
    res.status(500).json({ error: "Serverfehler beim Laden der Teilnehmer" });
  }
}
