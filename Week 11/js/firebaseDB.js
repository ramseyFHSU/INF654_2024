// Import the functions you need from the Firebase SDK
import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Add a task
export async function addTaskToFirebase(task) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return { id: docRef.id, ...task };
  } catch (e) {
    console.error("Error adding task: ", e);
  }
}

export async function getTasksFromFirebase() {
  const tasks = [];
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error retrieving tasks: ", e);
  }
  return tasks;
}

export async function deleteTaskFromFirebase(id) {
  try {
    await deleteDoc(doc(db, "tasks", id));
  } catch (e) {
    console.error("Error deleting task: ", e);
  }
}

export async function updateTaskInFirebase(id, updatedData) {
  console.log(updatedData, id);
  try {
    const taskRef = doc(db, "tasks", id);
    console.log(taskRef);
    await updateDoc(taskRef, updatedData);
  } catch (e) {
    console.error("Error updating task: ", e);
  }
}
