import app from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addQuestion(question) {
    if (!this.auth.currentUser) {
      return alert("User not Login");
    }
    return this.db.doc(`authApp/${this.auth.currentUser.uid}`).set({
      question: question,
    });
  }
  checkFirebaseState() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getUserInfo() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getQuestion() {
    const question = await this.db
      .doc(`authApp/${this.auth.currentUser.uid}`)
      .get();
    return question.get("question");
  }
}
export default new Firebase();
