# GCStoGoogleSheets
Premade boilerplate code for getting a CSV from Google Cloud Storage to Google Sheets. In order to get this pipeline working, you will need to follow the instructions on this page and use the code files in the repo.

Part 1: VC to GCS (VC users only)
1. Create a new VC Data Package
2. Give it a Category, Description and Access Name
3. Create the Data Package
4. In Data Sources, point it to the query you'd like to export (It supports Accounting queries if you change the Metabase to VCA)
5. In Format, make sure the format is CSV
6. In Destination, plug in your sftp url, user and pass.
7. Type in your destination folder you'll use in the future. This will be the folder your csv will be left in. I recommend typing something like "datapackages/" and then creating a folder called "datapackages" later on in Part 2 Step 3.
8. In Schedule, type in the times you'd like for the package to be exported
9. In the Action Menu, run "Sync Schedule"
10. Once you have your cloud bucket set up (later), you will want to run the "Export Now" action, for now you're done in VC



Part 2: GCS to Sheets
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
12. (Optional. VC Users only) Go back to your Data Package, go to the Action Menu and run "Export Now" to get the csv in your bucket
13. Open up a new Google Sheet
14. Click Extensions, Apps Script, and then copy the code from "importCSVfromGCS.js" into Code.gs. Save.
15. On the left, click Project Settings and enable Show appsscript.json" manifest file in editor
16. Return to the editor, and copy the code from "appsscript.json" into your own
17. Save, return to Code.gs
18. Run
19. Accept any permissions warnings*
20. If successful, use the Triggers menu to automate this function.


Notes
-Once a sheet is created with this method, it's recommended create another tab within the same sheet that to be used to list all other sheets that will be using this data. If you need to edit the original query, the code is able to handle this without problems, but you should check how the data flows down to the other sheets as well.
-In the same vein, if you need to edit the query after creating this, simply edit the query, save it, and then "Export Now" in the data package again to test. It should continue running automatically as expected.
-This is mostly meant for Veracross users in order to simplify the process of getting data out of VC and into sheets easily. After setting this up once, any further exports will have a much more simple workflow. This workflow consists of:
1. Create the data package (copying an existing automatic one is the easiest way)
2. Setup the Data Sources, Format, Destination and Schedule tabs, then run "Sync Schedule" and "Export Now"
3. Create a new Google Sheet
4. Copy and paste the two functions in this repo, remembering to enable "Show appsscript.json manifest file in editor"
5. After confirming the file hit your GCS, run the function.
6. If successful, create the trigger and you're done

