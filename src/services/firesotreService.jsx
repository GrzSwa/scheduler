import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const addAppointment = async (appointment) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), appointment);
    return docRef.id;
  } catch (e) {
    throw e;
  }
};

export const getAppointments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return appointments;
  } catch (e) {
    throw e;
  }
};

export const updateAppointment = async (id, updatedData) => {
  try {
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, updatedData);
  } catch (e) {
    throw e;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const docRef = doc(db, "appointments", id);
    await deleteDoc(docRef);
  } catch (e) {
    throw e;
  }
};
