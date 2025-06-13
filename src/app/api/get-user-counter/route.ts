import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, dbName } from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'userId is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection('counter');

    let doc = await collection.findOne({ userId });
    console.log("Document trouvé:", doc);
    console.log("userId", userId);

    if (!doc) {
      const newDoc = { userId, value: 0 };
      const result = await collection.insertOne(newDoc);
      doc = { ...newDoc, _id: result.insertedId };
    }

    return NextResponse.json({ count: doc.value });
  } catch (error) {
    console.error("Erreur API /get-user-counter :", error); // 🔥 Affiche l'erreur dans Vercel
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
