import seedData from './PFF-Map';
import { database } from './firebase.js';
import { firestore } from 'firebase';

seedData.features.forEach(function(feature) {
  var coordinates = feature.geometry.coordinates;
  delete feature.geometry.coordinates;
  database.collection('structures').add(feature).then(function(docRef) {
    if (Array.isArray(coordinates[0][0])) {
      docRef.collection(coordinates).add();
    }
  });
});
