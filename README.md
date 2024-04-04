# GCStoGoogleSheets
Premade boilerplate code for getting a CSV from Google Cloud Storage to Google Sheets. In order to get this pipeline working, you will need to follow the instructions on this page and use the code files in the repo.


How to setup the infrastructure
1. Create a New Project in Google Cloud Platform (GCP)
2. Create a Bucket in Google Cloud Storage
3. Create your desired file structure within the bucket by creating folders
4. Enable the Google Sheets API (Use the top bar to search "Google Sheets API")
5. Enable the Google Drive API
6. Ensure that Google Cloud Storage Json API and Cloud Storage API are enabled (Should be on by default)
7. Click on the hamburger menu button on the top left corner, enter the IAM & Admin page
8. On the left menu, click Service Accounts and then at the top click "+ Create Service Account"
9. Give it a ID. Name and description are optional. This will be used as a bridge between GCS and Google Services.
10. Grant this service account access to project: Select the role "Storage Object Admin"
11. Click Done to create the Service Account
12. Open up a new Google Sheet
13. Click Extensions, Apps Script, and then copy the code from "importCSVfromGCS.js" into Code.gs. Save.
14. On the left, click Project Settings and enable Show appsscript.json" manifest file in editor
15. Return to the editor, and copy the code from "appsscript.json" into your own
16. Save, return to Code.gs
17. Run
18. Accept any permissions warnings*
19. If successful, use the Triggers menu to automate this function. 
