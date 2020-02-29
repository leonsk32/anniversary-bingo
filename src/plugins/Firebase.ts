import firebase from 'firebase/app';
import 'firebase/firestore';
import {firebaseConfig} from '@/plugins/FirebaseConfig';


export default {
  init() {
    firebase.initializeApp(firebaseConfig);
  },
  onAnswerSubmitted(setAnswers: (answers: string) => void) {
    firebase
      .firestore()
      .collection('games/bingo/answers')
      .onSnapshot((snapshot) =>
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            setAnswers(change.doc.data().answer);
          }
        }),
      );
  },
  submitAnswer(submitted: string) {
    firebase.firestore().collection('games/bingo/answers').add({
      answer: submitted,
    });
  },
};
