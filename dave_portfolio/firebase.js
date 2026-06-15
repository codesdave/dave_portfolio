/* ============================================
   firebase.js — Asp Dave Digital Marketing Site
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAHslzTIem61NbSGMFotzoyrnt81Nc8nlI",
  authDomain:        "asp-dave-portfolio.firebaseapp.com",
  projectId:         "asp-dave-portfolio",
  storageBucket:     "asp-dave-portfolio.firebasestorage.app",
  messagingSenderId: "737873120964",
  appId:             "1:737873120964:web:bdfd842968f8428aeb8391"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

export async function submitContactForm(formData) {
  try {
    await addDoc(collection(db, "contacts"), {
      name:      formData.name,
      email:     formData.email,
      service:   formData.service,
      message:   formData.message,
      createdAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Firebase error:", error);
    return { success: false, error: error.message };
  }
}