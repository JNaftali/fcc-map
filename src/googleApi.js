import { database } from './firebase';

const sheetsKey = 'AIzaSyCeoIBoipFBu_x7M1gQLYau98t9Qi3mfVc';
const sheetsId = '17Jrm6QWQyM4RvKjNYQvDbLchEg_fDJkttGu2rG1OjS8';

function getSheetValuesFact(sheetName) {
  return function() {
    return fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values:batchGet?key=${sheetsKey}&ranges=${encodeURIComponent(
        sheetName
      )}!A1:J1000`
    )
      .then(r => r.json())
      .then(data => {
        let extensions = data.valueRanges[0].values;
        let headers = extensions.shift();
        return extensions.map(row =>
          row.reduce((result, value, i) => {
            result[headers[i].toLowerCase()] = value === '' ? undefined : value;
            return result;
          }, {})
        );
      });
  };
}

export const getExtensions = getSheetValuesFact('Extensions');
// export const getFeatures = getSheetValuesFact('Map Features');

// const mapJsonId = '0B1TLV-eEpvBAT3FCaTQtZnFyelk';
// get file from google drive - abandoned because it requires authentication
// function getDriveFileFact(id) {
//   return function() {
//     return fetch(
//       `https://www.googleapis.com/drive/v3/files/${id}?alt=media`
//     ).then(r => r.json());
//   };
// }

export async function getFestMap() {
  const snapshot = await database.ref('/festMap').once('value');
  return snapshot.val();
}

export function subscribeToFeatures(callback) {
  database
    .ref('/mapFeatures')
    .on('value', snapshot => callback(snapshot.val()));
}
