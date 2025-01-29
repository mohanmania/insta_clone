import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Send a message to Firestore
export const sendMessage = async (text, userId) => {
  try {
    await addDoc(collection(db, 'messages'), {
      text,
      userId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Subscribe to messages in Firestore
export const subscribeToMessages = (setMessages) => {
  const q = query(collection(db, 'messages'), orderBy('createdAt'));
  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMessages(messages);
  });
};
