const sheetsKey = 'AIzaSyCeoIBoipFBu_x7M1gQLYau98t9Qi3mfVc';
const sheetsId = '17Jrm6QWQyM4RvKjNYQvDbLchEg_fDJkttGu2rG1OjS8';

export function getSheetValues(sheetName) {
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
}
