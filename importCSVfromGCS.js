function importCSVFromGCS() {
  // Set your variables here
  // This should be the only section that needs edits
  // These variables don't need to be obfuscated. Protect your data via roles directly in your GCP project instead.
  var bucketName = 'insertbucketnamehere';
  var fileName = 'foldername/filename'; // The structure here is folder/filename. Look for the exact filename in GCS as it may contain an extension
  var sheetName = 'Main'; // The name of the sheet (tab) where you want to import the data
  
  // Fetch the CSV file from the GCS bucket
  var url = 'https://storage.googleapis.com/' + bucketName + '/' + fileName;
  var options = {
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var csvData = response.getContentText();
  
  // Parse the CSV data
  var csvRows = Utilities.parseCsv(csvData);
  
  // Get the Google Sheet and specified tab
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  
  // Calculate the number of columns to clear (CSV data columns + 1 for Time Synced)
  var numColumnsToClear = csvRows[0].length + 1;

  // Clear the range that will be overwritten, including the extra column for "Time Synced"
  var rangeToClear = sheet.getRange(1, 1, sheet.getMaxRows(), numColumnsToClear);
  rangeToClear.clearContent();

  // Write the parsed CSV data to the sheet
  sheet.getRange(1, 1, csvRows.length, csvRows[0].length).setValues(csvRows);

  // Add the "Time Synced" column immediately after the imported data
  // This adds a final row to the sheet in order to tell when the last export was directly from the sheet
  // Don't forget to make a trigger after testing this!
  var currentTime = new Date();
  var formattedTime = Utilities.formatDate(currentTime, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  sheet.getRange(1, numColumnsToClear).setValue("Time Synced"); // Set header
  sheet.getRange(2, numColumnsToClear).setValue(formattedTime); // Set timestamp

  //Rod Mendoza @ Nishimachi International School
  //rmendoza@nishimachi.ac.jp
}
