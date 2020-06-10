import * as firebase from 'firebase'; 

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABSE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default};

// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((child) => {
//         expenses.push({
//             id: child.key,
//             ...child.val()
//         });
//     });

//     console.log(expenses);
// })

// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log('removed: ', snapshot.key, snapshot.val()); 
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log('changed: ', snapshot.key, snapshot.val()); 
// });

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 125000,
//     createdAt: 0
// })


// const firebaseNotes = {
//     notes: {
//         apodapsfo: {
//             title: 'First Note',
//             body: 'This is my note'
//         },
//         asdfja: {
//             title: 'Another Note',
//             body: 'This is my note'
//         }
//     }
// };

// const notes = [{
//     id: '12', 
//     body: 'First note!'
// },{
//     id: '13', 
//     body: 'second note!'
// },{
//     id: '14', 
//     body: 'third note!'
// }];


// database.ref().on('value', (snapshot) => {
//     const { name, job: { company, title } } = snapshot.val();
//     console.log(`${name} is a ${title} at ${company}`); 
// });

// database.ref()
// .once('value')
// .then((snapshot) => {
//     console.log(snapshot.val()); 
// })
// .catch((e) => {
//     console.log('Error fetching data', e);
// });

// database.ref().set({
//     name: 'Ian Veloso',
//     age: 24, 
//     stressLevel: 6,
//     job: {
//         title: 'EIT',
//         company: 'TELUS'
//     },
//     location: {
//         city: 'Winnipeg', 
//         country: 'Canada'
//     }
// }).then(() => {
//     console.log('data is saved'); 
// }).catch((e) => {
//     console.log('this failed', e); 
// });

// database.ref('isSingle').remove()
//     .then(() => {
//         console.log('Remove succeeded'); 
//     })
//     .catch((e) => {
//         console.log('Remove failed: ', e.message);
//     });

// database.ref().update({
//     stressLevel: 10,
//     'job/company': 'Amazon',
//     'location/city': 'Philly'
// });