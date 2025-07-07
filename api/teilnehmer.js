import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const snapshot = await db.collection("teilnehmer").get();

    const teilnehmer = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(teilnehmer);
  } catch (err) {
    console.error("Fehler beim Abrufen der Teilnehmer:", err);
    res.status(500).json({ error: "Serverfehler beim Laden der Teilnehmer" });
  }
}
