export const IT_SBA_PROJECT_TASKS = {
  "sports-academy": {
    "database": [
      {
        "id": "db-a1",
        "group": "Task A - Tables",
        "question": "1. Create a database named SportsAcademy_YourFullName.accdb.",
        "how": [
          "Open your database software and create a blank database.",
          "Save it immediately with the exact filename in the question.",
          "Keep the database and all later SBA files inside one organised project folder."
        ],
        "answer": "SPARK reference filename: SportsAcademy_YourFullName.accdb.",
        "marks": null
      },
      {
        "id": "db-a2",
        "group": "Task A - Tables",
        "question": "2. Create the Athlete, Guardian and Programme tables using suitable field names, data types and primary keys.",
        "how": [
          "Create Athlete first and enter the fields exactly as planned in your data dictionary.",
          "Repeat the process for Guardian and Programme.",
          "Choose the primary key before entering records. Check currency, date and numeric data types carefully."
        ],
        "answer": "Completed table structures:\nAthlete: AthleteID - Short Text, primary key, FirstName - Short Text, LastName - Short Text, DOB - Date/Time, Gender - Short Text with validation M or F, ProgrammeCode - Short Text, foreign key, JoinDate - Date/Time, MedicalNote - Long Text, Status - Short Text\nGuardian: GuardianID - Short Text, primary key, AthleteID - Short Text, foreign key, FullName - Short Text, Relation - Short Text, Phone - Short Text, Email - Short Text\nProgramme: ProgrammeCode - Short Text, primary key, ProgrammeName - Short Text, MonthlyFee - Currency, Coach - Short Text, TrainingDays - Short Text",
        "marks": null
      },
      {
        "id": "db-a3",
        "group": "Task A - Tables",
        "question": "3. Enter realistic records and apply the validation rules required by the project.",
        "how": [
          "Enter enough varied records to make your queries meaningful.",
          "Use validation rules for fields with a limited set or range of allowed values.",
          "Test the validation by deliberately entering one invalid value and confirming that the software rejects it."
        ],
        "answer": "The SPARK completed database uses fictional records with different categories, dates, fees and statuses so every query can be tested.",
        "marks": null
      },
      {
        "id": "db-a4",
        "group": "Task A - Tables",
        "question": "4. Create the required relationships and enforce the correct links between the tables.",
        "how": [
          "Open the Relationships window.",
          "Add all tables and drag each primary key to the matching foreign key.",
          "Check the real-world relationship before selecting referential-integrity options."
        ],
        "answer": "Programme.ProgrammeCode 1-to-many Athlete.ProgrammeCode; Athlete.AthleteID 1-to-many Guardian.AthleteID.",
        "marks": null
      },
      {
        "id": "db-b1",
        "group": "Task B - Queries and Form",
        "question": "1. Create a query called Junior Athletes. Show AthleteID, athlete name, age and programme for athletes under 13. Sort by LastName ascending.",
        "how": [
          "Add only the table or tables required by the question.",
          "Add the requested fields to the query grid.",
          "Enter the criterion: Age < 13.",
          "Run the query and compare every returned record with the source data."
        ],
        "answer": "Query name: Junior Athletes. Criterion used: Age < 13.",
        "marks": null
      },
      {
        "id": "db-b2",
        "group": "Task B - Queries and Form",
        "question": "2. Create a query called Athlete Finance. Join Athlete and Programme. Show athlete name, programme, MonthlyFee and TermFee.",
        "how": [
          "Add the related tables and confirm the join lines are correct.",
          "Add the display fields requested in the question.",
          "Create the calculated field using: TermFee: [MonthlyFee]*3.",
          "Run the query and calculate one record manually to verify the result."
        ],
        "answer": "Query name: Athlete Finance. Calculation used: TermFee: [MonthlyFee]*3.",
        "marks": null
      },
      {
        "id": "db-b3",
        "group": "Task B - Queries and Form",
        "question": "3. Create Athlete Information Form with Guardian subform and Previous/Next navigation buttons.",
        "how": [
          "Use the main record source for the parent form.",
          "Use the related table as the subform source.",
          "Add a clear title, useful instructions and navigation controls.",
          "Open several records and confirm the subform changes with the main record."
        ],
        "answer": "Completed form design: Athlete Information Form with Guardian subform and Previous/Next navigation buttons.",
        "marks": null
      },
      {
        "id": "db-c1",
        "group": "Task C - Report",
        "question": "1. Create Programme Fees Report grouped by ProgrammeName, sorted by LastName, with average TermFee for each programme.",
        "how": [
          "Use a query as the report source when it already contains the correct fields or calculation.",
          "Apply the exact grouping and sorting required by the question.",
          "Add the required summary in the group or report footer.",
          "Preview the report and correct clipped headings, blank pages and unreadable columns."
        ],
        "answer": "Completed report: Programme Fees Report grouped by ProgrammeName, sorted by LastName, with average TermFee for each programme.",
        "marks": null
      }
    ],
    "spreadsheet": [
      {
        "id": "ss-a1",
        "group": "Task A - Calculations and Functions",
        "question": "1. Create AcademyFees_YourFullName.xlsx with worksheets named Members and Summary. Enter or import the project data into Members and format it as a clear data table.",
        "how": [
          "Place one field name in each column heading and one record in each row.",
          "Apply appropriate number, date, currency and percentage formats.",
          "Freeze or emphasise the heading row if the sheet is long."
        ],
        "answer": "Completed workbook: AcademyFees_YourFullName.xlsx. Detailed data is stored on Members; analysis is placed on Summary.",
        "marks": null
      },
      {
        "id": "ss-a2",
        "group": "Task A - Calculations and Functions",
        "question": "2. Create the main calculations using efficient formulas. The SPARK reference uses formulas such as =D2*3, =IF(E2=\"Junior\",F2*10%,0) and =F2-G2+$M$2.",
        "how": [
          "Write the formula in the first data row using cell references, not typed answers.",
          "Check whether any rate or lookup cell must remain fixed.",
          "Fill the formula down and inspect the first, middle and last copied formula."
        ],
        "answer": "Reference formulas: =D2*3; =IF(E2=\"Junior\",F2*10%,0); =F2-G2+$M$2.",
        "marks": null
      },
      {
        "id": "ss-a3",
        "group": "Task A - Calculations and Functions",
        "question": "3. Use at least three suitable functions. Functions used in the SPARK reference include SUM, AVERAGE, IF, COUNTIF, VLOOKUP.",
        "how": [
          "Choose each function because it answers a question in the scenario.",
          "Use cell ranges instead of typing individual values where possible.",
          "Check each function result with a small manual calculation or count."
        ],
        "answer": "Functions demonstrated: SUM, AVERAGE, IF, COUNTIF, VLOOKUP.",
        "marks": null
      },
      {
        "id": "ss-b1",
        "group": "Task B - Analysis and Presentation",
        "question": "1. Sort and filter the data to answer this requirement: Show Active athletes in Swimming or Football only.",
        "how": [
          "Apply the sort first when the question specifies an order.",
          "Turn on filters and apply every criterion in the requirement.",
          "Check the visible records one by one before taking evidence."
        ],
        "answer": "Completed filter requirement: Show Active athletes in Swimming or Football only.",
        "marks": null
      },
      {
        "id": "ss-b2",
        "group": "Task B - Analysis and Presentation",
        "question": "2. Create a summary showing Pivot-style summary of outstanding Balance by Programme. Then create a suitable chart.",
        "how": [
          "Create the summary from the clean data range.",
          "Use category fields as row labels and a numeric field as the value.",
          "Insert the chart from the summary and add a clear title.",
          "Avoid 3-D effects that make values difficult to compare."
        ],
        "answer": "Completed summary: Pivot-style summary of outstanding Balance by Programme. Completed chart: Column chart titled Outstanding Balance by Programme.",
        "marks": null
      },
      {
        "id": "ss-b3",
        "group": "Task B - Analysis and Presentation",
        "question": "3. Create a linked total or key result on the Summary worksheet so that it updates when the detailed sheet changes.",
        "how": [
          "Click the destination cell on Summary.",
          "Type =, switch to Members, and select the source result cell.",
          "Press Enter and test the link by changing one source value."
        ],
        "answer": "The SPARK Summary sheet contains a direct worksheet link to the main total calculated on Members.",
        "marks": null
      }
    ],
    "word": [
      {
        "id": "wp-a1",
        "group": "Task A - Fillable Form",
        "question": "1. Create a document named Athlete Registration Form_YourFullName.docx. The form must collect the information needed for this project and include clear instructions.",
        "how": [
          "Start with a clear title and one sentence explaining how the form should be completed.",
          "Group related fields together and leave enough space for each response.",
          "Use a consistent font and align labels cleanly."
        ],
        "answer": "The completed SPARK form is titled Athlete Registration Form and uses a clean two-column label-and-control layout.",
        "marks": null
      },
      {
        "id": "wp-a2",
        "group": "Task A - Fillable Form",
        "question": "2. Use suitable form controls. The SPARK reference uses: Athlete name text box; DOB date picker; Programme drop-down list; Medical-information check box.",
        "how": [
          "Turn on the developer or form-control tools in your word processor.",
          "Insert the control beside the correct label.",
          "Set the available choices for drop-down controls.",
          "Test every control before saving the form."
        ],
        "answer": "Completed controls: Athlete name text box; DOB date picker; Programme drop-down list; Medical-information check box.",
        "marks": null
      },
      {
        "id": "wp-b1",
        "group": "Task B - Mail Merge",
        "question": "1. Create a professional main document called Guardian Fee Notice. Use the project data as the mail-merge source.",
        "how": [
          "Prepare the data source so every merge field has a clear heading.",
          "Create the main document with a suitable letterhead, date, greeting, body and closing.",
          "Connect the document to the data source before inserting fields."
        ],
        "answer": "The completed main document is Guardian Fee Notice and is connected to the project data source.",
        "marks": null
      },
      {
        "id": "wp-b2",
        "group": "Task B - Mail Merge",
        "question": "2. Insert the following merge fields where they make sense: GuardianName, AthleteName, ProgrammeName, TermFee, Balance.",
        "how": [
          "Insert fields from the Mailings or merge menu rather than typing angle brackets manually.",
          "Preview several records so long names and large amounts still fit the layout.",
          "Correct spacing and punctuation around merge fields."
        ],
        "answer": "Merge fields used: GuardianName, AthleteName, ProgrammeName, TermFee, Balance.",
        "marks": null
      },
      {
        "id": "wp-b3",
        "group": "Task B - Mail Merge",
        "question": "3. Complete the final merged output and include one relevant table, chart or other imported item from the connected SBA work where appropriate.",
        "how": [
          "Finish the merge to a new document.",
          "Inspect the first, middle and last merged record.",
          "Insert the required project table or chart and size it so the page remains readable.",
          "Save the generic and merged documents separately."
        ],
        "answer": "The SPARK completed example includes a formatted project table and a merged sample record so students can see the final result, not only the merge-field setup.",
        "marks": null
      }
    ],
    "web": [
      {
        "id": "web-1",
        "group": "Web Page Design",
        "question": "1. Create one web page for SPARK Sports Academy. The page must be suitable for the intended audience and include a project logo.",
        "how": [
          "Plan the page before coding or using a visual editor.",
          "Create a simple header containing the organisation name and a logo.",
          "Use readable contrast and keep the page width comfortable on phones and computers."
        ],
        "answer": "The completed SPARK page uses a single responsive page with a simple logo and clear organisation name.",
        "marks": null
      },
      {
        "id": "web-2",
        "group": "Web Page Design",
        "question": "2. Organise the page into these content sections: About the Academy, Programmes and Fees, Training Schedule, Registration, Contact.",
        "how": [
          "Use one heading for each section.",
          "Write short paragraphs or lists that answer the visitor's likely questions.",
          "Keep names, fees, dates and services consistent with the other SBA sections."
        ],
        "answer": "Completed sections: About the Academy, Programmes and Fees, Training Schedule, Registration, Contact.",
        "marks": null
      },
      {
        "id": "web-3",
        "group": "Web Page Design",
        "question": "3. Add at least two suitable hyperlink types and test them.",
        "how": [
          "Use descriptive link text instead of Click here.",
          "Include at least two hyperlink types allowed by your assignment.",
          "Open every link after saving the final page."
        ],
        "answer": "The SPARK page includes: Email link to registrations@sparksports.example; Internal link to Programmes and Fees.",
        "marks": null
      },
      {
        "id": "web-4",
        "group": "Web Page Design",
        "question": "4. Add at least one relevant graphic and make sure the page remains readable at different screen sizes.",
        "how": [
          "Use a relevant image or graphic with sensible dimensions.",
          "Resize the browser window or use responsive-preview tools.",
          "Correct horizontal scrolling, clipped text and images that overflow the page."
        ],
        "answer": "The completed reference uses a project banner graphic, responsive sections and no horizontal scrolling at common mobile widths.",
        "marks": null
      },
      {
        "id": "web-5",
        "group": "Web Page Design",
        "question": "5. Save, test and prepare the final web-page evidence.",
        "how": [
          "Save the page and supporting files in one organised folder.",
          "Open the file directly in a browser and test navigation, email links and any file links.",
          "Take a clear screenshot of the final page if your teacher requires evidence."
        ],
        "answer": "The SPARK completed page is saved as index.html with all links tested and a matching completed-reference PDF.",
        "marks": null
      }
    ],
    "programming": [
      {
        "id": "pg-a1",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "1. Write a clear problem statement for the following task: Calculate the amount each athlete should pay for a term and the total expected income for all athletes entered in one program run.",
        "how": [
          "State what information the program receives.",
          "State the main calculation or decision the program performs.",
          "State the result the program must display."
        ],
        "answer": "Problem statement: Calculate the amount each athlete should pay for a term and the total expected income for all athletes entered in one program run.",
        "marks": null
      },
      {
        "id": "pg-a2",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "2. Identify the inputs, processes and outputs, then write pseudocode containing at least one selection and one repetition statement.",
        "how": [
          "List inputs, processes and outputs before writing pseudocode.",
          "Use indentation to show the selection and loop structure.",
          "Keep variable names consistent from the algorithm through to the program."
        ],
        "answer": "Inputs: Athlete name, Age, Programme code, Number of athletes\nProcesses: Select the monthly programme fee, Multiply monthly fee by 3, Apply a 10% junior discount when age is under 13, Add the final fee to a running total\nOutputs: Athlete name, Programme code, Discount, Final term fee, Total expected income\n\nPseudocode:\nSTART\nSET grandTotal <- 0\nINPUT athleteCount\nFOR counter <- 1 TO athleteCount\n  INPUT athleteName, age, programmeCode\n  SET monthlyFee <- fee for programmeCode\n  SET termFee <- monthlyFee * 3\n  IF age < 13 THEN\n    SET discount <- termFee * 0.10\n  ELSE\n    SET discount <- 0\n  ENDIF\n  SET finalFee <- termFee - discount\n  SET grandTotal <- grandTotal + finalFee\n  DISPLAY athleteName, programmeCode, discount, finalFee\nNEXT counter\nDISPLAY grandTotal\nSTOP",
        "marks": null
      },
      {
        "id": "pg-b1",
        "group": "Task B - Trace Table and Test Data",
        "question": "1. Create a trace table using at least three sets of test data. Include normal data, a boundary case and an invalid or unusual case where appropriate.",
        "how": [
          "Choose values that exercise each branch of the selection statement.",
          "Follow the pseudocode in order and record important variable values.",
          "Calculate the expected output before running the program."
        ],
        "answer": "The completed SPARK trace table includes the project's supplied normal examples and adds a boundary/validation discussion in the completed PDF.",
        "marks": null
      },
      {
        "id": "pg-c1",
        "group": "Task C - Program Implementation",
        "question": "1. Implement the algorithm in the programming language selected by your centre. The SPARK Pascal reference is saved as AcademyFees_YourFullName.pas.",
        "how": [
          "Create variables using suitable data types.",
          "Translate each pseudocode step into program statements in the same logical order.",
          "Compile or run often so errors are found in small sections.",
          "Use the same test data from the trace table."
        ],
        "answer": "The SPARK reference implementation is AcademyFees_YourFullName.pas. The completed PDF includes the full source code.",
        "marks": null
      },
      {
        "id": "pg-c2",
        "group": "Task C - Program Implementation",
        "question": "2. Test the program and capture evidence that the expected and actual results agree.",
        "how": [
          "Run normal test data first.",
          "Run the boundary case.",
          "Run an invalid or unusual input when the program includes validation.",
          "Capture screenshots showing both the entered data and the program result."
        ],
        "answer": "The completed SPARK reference compares expected trace-table outputs with the program output and records the result of each test.",
        "marks": null
      },
      {
        "id": "pg-d1",
        "group": "Task D - Documentation",
        "question": "1. Create ProgramDocumentation_YourFullName.pdf containing the problem definition, algorithm, source code, trace table, test data and screenshots of program execution.",
        "how": [
          "Create a cover page and table of contents.",
          "Keep the section order the same as the task sequence.",
          "Use readable code formatting and captions for screenshots.",
          "Export the final document to PDF and check every page."
        ],
        "answer": "Completed documentation filename: ProgramDocumentation_YourFullName.pdf. The SPARK section PDF demonstrates the required order and evidence.",
        "marks": null
      }
    ]
  },
  "medical-centre": {
    "database": [
      {
        "id": "db-a1",
        "group": "Task A - Tables",
        "question": "1. Create a database named IslandCareDB_YourFullName.accdb.",
        "how": [
          "Open your database software and create a blank database.",
          "Save it immediately with the exact filename in the question.",
          "Keep the database and all later SBA files inside one organised project folder."
        ],
        "answer": "SPARK reference filename: IslandCareDB_YourFullName.accdb.",
        "marks": null
      },
      {
        "id": "db-a2",
        "group": "Task A - Tables",
        "question": "2. Create the Patient, Service and Appointment tables using suitable field names, data types and primary keys.",
        "how": [
          "Create Patient first and enter the fields exactly as planned in your data dictionary.",
          "Repeat the process for Service and Appointment.",
          "Choose the primary key before entering records. Check currency, date and numeric data types carefully."
        ],
        "answer": "Completed table structures:\nPatient: PatientID - Short Text, primary key, FirstName - Short Text, LastName - Short Text, DOB - Date/Time, Gender - Short Text, Phone - Short Text, Parish - Short Text, EmergencyName - Short Text, EmergencyRelation - Short Text, EmergencyPhone - Short Text\nService: ServiceCode - Short Text, primary key, ServiceName - Short Text, StandardFee - Currency\nAppointment: AppointmentID - Short Text, primary key, PatientID - Short Text, foreign key, ServiceCode - Short Text, foreign key, VisitDate - Date/Time, PaidAmount - Currency, Status - Short Text",
        "marks": null
      },
      {
        "id": "db-a3",
        "group": "Task A - Tables",
        "question": "3. Enter realistic records and apply the validation rules required by the project.",
        "how": [
          "Enter enough varied records to make your queries meaningful.",
          "Use validation rules for fields with a limited set or range of allowed values.",
          "Test the validation by deliberately entering one invalid value and confirming that the software rejects it."
        ],
        "answer": "The SPARK completed database uses fictional records with different categories, dates, fees and statuses so every query can be tested.",
        "marks": null
      },
      {
        "id": "db-a4",
        "group": "Task A - Tables",
        "question": "4. Create the required relationships and enforce the correct links between the tables.",
        "how": [
          "Open the Relationships window.",
          "Add all tables and drag each primary key to the matching foreign key.",
          "Check the real-world relationship before selecting referential-integrity options."
        ],
        "answer": "Patient.PatientID 1-to-many Appointment.PatientID; Service.ServiceCode 1-to-many Appointment.ServiceCode.",
        "marks": null
      },
      {
        "id": "db-b1",
        "group": "Task B - Queries and Form",
        "question": "1. Create a query called Daily Appointments. Show appointments for a date entered by the user. Include patient name, service and status.",
        "how": [
          "Add only the table or tables required by the question.",
          "Add the requested fields to the query grid.",
          "Enter the criterion: VisitDate = [Enter visit date].",
          "Run the query and compare every returned record with the source data."
        ],
        "answer": "Query name: Daily Appointments. Criterion used: VisitDate = [Enter visit date].",
        "marks": null
      },
      {
        "id": "db-b2",
        "group": "Task B - Queries and Form",
        "question": "2. Create a query called Outstanding Accounts. Join Patient, Service and Appointment and calculate the balance.",
        "how": [
          "Add the related tables and confirm the join lines are correct.",
          "Add the display fields requested in the question.",
          "Create the calculated field using: Balance: [StandardFee]-[PaidAmount].",
          "Run the query and calculate one record manually to verify the result."
        ],
        "answer": "Query name: Outstanding Accounts. Calculation used: Balance: [StandardFee]-[PaidAmount].",
        "marks": null
      },
      {
        "id": "db-b3",
        "group": "Task B - Queries and Form",
        "question": "3. Create Patient Information Form with Appointment subform and clear patient-contact headings.",
        "how": [
          "Use the main record source for the parent form.",
          "Use the related table as the subform source.",
          "Add a clear title, useful instructions and navigation controls.",
          "Open several records and confirm the subform changes with the main record."
        ],
        "answer": "Completed form design: Patient Information Form with Appointment subform and clear patient-contact headings.",
        "marks": null
      },
      {
        "id": "db-c1",
        "group": "Task C - Report",
        "question": "1. Create Service Income Report grouped by ServiceName with visit count, total fees and average fee.",
        "how": [
          "Use a query as the report source when it already contains the correct fields or calculation.",
          "Apply the exact grouping and sorting required by the question.",
          "Add the required summary in the group or report footer.",
          "Preview the report and correct clipped headings, blank pages and unreadable columns."
        ],
        "answer": "Completed report: Service Income Report grouped by ServiceName with visit count, total fees and average fee.",
        "marks": null
      }
    ],
    "spreadsheet": [
      {
        "id": "ss-a1",
        "group": "Task A - Calculations and Functions",
        "question": "1. Create MedicalAccounts_YourFullName.xlsx with worksheets named Accounts and Dashboard. Enter or import the project data into Accounts and format it as a clear data table.",
        "how": [
          "Place one field name in each column heading and one record in each row.",
          "Apply appropriate number, date, currency and percentage formats.",
          "Freeze or emphasise the heading row if the sheet is long."
        ],
        "answer": "Completed workbook: MedicalAccounts_YourFullName.xlsx. Detailed data is stored on Accounts; analysis is placed on Dashboard.",
        "marks": null
      },
      {
        "id": "ss-a2",
        "group": "Task A - Calculations and Functions",
        "question": "2. Create the main calculations using efficient formulas. The SPARK reference uses formulas such as =F2-G2, =IF(D2>=65,E2*5%,0) and =E2-F2-G2+$M$2.",
        "how": [
          "Write the formula in the first data row using cell references, not typed answers.",
          "Check whether any rate or lookup cell must remain fixed.",
          "Fill the formula down and inspect the first, middle and last copied formula."
        ],
        "answer": "Reference formulas: =F2-G2; =IF(D2>=65,E2*5%,0); =E2-F2-G2+$M$2.",
        "marks": null
      },
      {
        "id": "ss-a3",
        "group": "Task A - Calculations and Functions",
        "question": "3. Use at least three suitable functions. Functions used in the SPARK reference include VLOOKUP, COUNTIF, AVERAGE, IF, SUM.",
        "how": [
          "Choose each function because it answers a question in the scenario.",
          "Use cell ranges instead of typing individual values where possible.",
          "Check each function result with a small manual calculation or count."
        ],
        "answer": "Functions demonstrated: VLOOKUP, COUNTIF, AVERAGE, IF, SUM.",
        "marks": null
      },
      {
        "id": "ss-b1",
        "group": "Task B - Analysis and Presentation",
        "question": "1. Sort and filter the data to answer this requirement: Show visits with Balance greater than 0 and Status not equal to Closed.",
        "how": [
          "Apply the sort first when the question specifies an order.",
          "Turn on filters and apply every criterion in the requirement.",
          "Check the visible records one by one before taking evidence."
        ],
        "answer": "Completed filter requirement: Show visits with Balance greater than 0 and Status not equal to Closed.",
        "marks": null
      },
      {
        "id": "ss-b2",
        "group": "Task B - Analysis and Presentation",
        "question": "2. Create a summary showing Summary of total charges by ServiceName. Then create a suitable chart.",
        "how": [
          "Create the summary from the clean data range.",
          "Use category fields as row labels and a numeric field as the value.",
          "Insert the chart from the summary and add a clear title.",
          "Avoid 3-D effects that make values difficult to compare."
        ],
        "answer": "Completed summary: Summary of total charges by ServiceName. Completed chart: Bar chart titled Charges by Service.",
        "marks": null
      },
      {
        "id": "ss-b3",
        "group": "Task B - Analysis and Presentation",
        "question": "3. Create a linked total or key result on the Dashboard worksheet so that it updates when the detailed sheet changes.",
        "how": [
          "Click the destination cell on Dashboard.",
          "Type =, switch to Accounts, and select the source result cell.",
          "Press Enter and test the link by changing one source value."
        ],
        "answer": "The SPARK Dashboard sheet contains a direct worksheet link to the main total calculated on Accounts.",
        "marks": null
      }
    ],
    "word": [
      {
        "id": "wp-a1",
        "group": "Task A - Fillable Form",
        "question": "1. Create a document named Patient Information Form_YourFullName.docx. The form must collect the information needed for this project and include clear instructions.",
        "how": [
          "Start with a clear title and one sentence explaining how the form should be completed.",
          "Group related fields together and leave enough space for each response.",
          "Use a consistent font and align labels cleanly."
        ],
        "answer": "The completed SPARK form is titled Patient Information Form and uses a clean two-column label-and-control layout.",
        "marks": null
      },
      {
        "id": "wp-a2",
        "group": "Task A - Fillable Form",
        "question": "2. Use suitable form controls. The SPARK reference uses: Patient name text box; Appointment date picker; Service drop-down list; Consent check box.",
        "how": [
          "Turn on the developer or form-control tools in your word processor.",
          "Insert the control beside the correct label.",
          "Set the available choices for drop-down controls.",
          "Test every control before saving the form."
        ],
        "answer": "Completed controls: Patient name text box; Appointment date picker; Service drop-down list; Consent check box.",
        "marks": null
      },
      {
        "id": "wp-b1",
        "group": "Task B - Mail Merge",
        "question": "1. Create a professional main document called Appointment and Balance Notice. Use the project data as the mail-merge source.",
        "how": [
          "Prepare the data source so every merge field has a clear heading.",
          "Create the main document with a suitable letterhead, date, greeting, body and closing.",
          "Connect the document to the data source before inserting fields."
        ],
        "answer": "The completed main document is Appointment and Balance Notice and is connected to the project data source.",
        "marks": null
      },
      {
        "id": "wp-b2",
        "group": "Task B - Mail Merge",
        "question": "2. Insert the following merge fields where they make sense: PatientName, AppointmentDate, ServiceName, Balance.",
        "how": [
          "Insert fields from the Mailings or merge menu rather than typing angle brackets manually.",
          "Preview several records so long names and large amounts still fit the layout.",
          "Correct spacing and punctuation around merge fields."
        ],
        "answer": "Merge fields used: PatientName, AppointmentDate, ServiceName, Balance.",
        "marks": null
      },
      {
        "id": "wp-b3",
        "group": "Task B - Mail Merge",
        "question": "3. Complete the final merged output and include one relevant table, chart or other imported item from the connected SBA work where appropriate.",
        "how": [
          "Finish the merge to a new document.",
          "Inspect the first, middle and last merged record.",
          "Insert the required project table or chart and size it so the page remains readable.",
          "Save the generic and merged documents separately."
        ],
        "answer": "The SPARK completed example includes a formatted project table and a merged sample record so students can see the final result, not only the merge-field setup.",
        "marks": null
      }
    ],
    "web": [
      {
        "id": "web-1",
        "group": "Web Page Design",
        "question": "1. Create one web page for IslandCare Medical Centre. The page must be suitable for the intended audience and include a project logo.",
        "how": [
          "Plan the page before coding or using a visual editor.",
          "Create a simple header containing the organisation name and a logo.",
          "Use readable contrast and keep the page width comfortable on phones and computers."
        ],
        "answer": "The completed SPARK page uses a single responsive page with a simple logo and clear organisation name.",
        "marks": null
      },
      {
        "id": "web-2",
        "group": "Web Page Design",
        "question": "2. Organise the page into these content sections: Welcome, Services, Before Your Visit, Opening Hours, Contact.",
        "how": [
          "Use one heading for each section.",
          "Write short paragraphs or lists that answer the visitor's likely questions.",
          "Keep names, fees, dates and services consistent with the other SBA sections."
        ],
        "answer": "Completed sections: Welcome, Services, Before Your Visit, Opening Hours, Contact.",
        "marks": null
      },
      {
        "id": "web-3",
        "group": "Web Page Design",
        "question": "3. Add at least two suitable hyperlink types and test them.",
        "how": [
          "Use descriptive link text instead of Click here.",
          "Include at least two hyperlink types allowed by your assignment.",
          "Open every link after saving the final page."
        ],
        "answer": "The SPARK page includes: Email link to appointments@islandcare.example; Internal link to Services.",
        "marks": null
      },
      {
        "id": "web-4",
        "group": "Web Page Design",
        "question": "4. Add at least one relevant graphic and make sure the page remains readable at different screen sizes.",
        "how": [
          "Use a relevant image or graphic with sensible dimensions.",
          "Resize the browser window or use responsive-preview tools.",
          "Correct horizontal scrolling, clipped text and images that overflow the page."
        ],
        "answer": "The completed reference uses a project banner graphic, responsive sections and no horizontal scrolling at common mobile widths.",
        "marks": null
      },
      {
        "id": "web-5",
        "group": "Web Page Design",
        "question": "5. Save, test and prepare the final web-page evidence.",
        "how": [
          "Save the page and supporting files in one organised folder.",
          "Open the file directly in a browser and test navigation, email links and any file links.",
          "Take a clear screenshot of the final page if your teacher requires evidence."
        ],
        "answer": "The SPARK completed page is saved as index.html with all links tested and a matching completed-reference PDF.",
        "marks": null
      }
    ],
    "programming": [
      {
        "id": "pg-a1",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "1. Write a clear problem statement for the following task: Calculate the outstanding balance for each visit and the combined outstanding balance for all visits processed.",
        "how": [
          "State what information the program receives.",
          "State the main calculation or decision the program performs.",
          "State the result the program must display."
        ],
        "answer": "Problem statement: Calculate the outstanding balance for each visit and the combined outstanding balance for all visits processed.",
        "marks": null
      },
      {
        "id": "pg-a2",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "2. Identify the inputs, processes and outputs, then write pseudocode containing at least one selection and one repetition statement.",
        "how": [
          "List inputs, processes and outputs before writing pseudocode.",
          "Use indentation to show the selection and loop structure.",
          "Keep variable names consistent from the algorithm through to the program."
        ],
        "answer": "Inputs: Patient name, Age, Service code, Amount paid\nProcesses: Select service fee, Apply 5% senior discount at age 65 or over, Subtract amount paid, Accumulate balances\nOutputs: Patient summary, Discount, Outstanding balance, Combined outstanding balance\n\nPseudocode:\nSTART\nSET totalBalance <- 0\nINPUT visitCount\nFOR visit <- 1 TO visitCount\n  INPUT patientName, age, serviceCode, amountPaid\n  SET serviceFee <- fee for serviceCode\n  IF age >= 65 THEN\n    SET discount <- serviceFee * 0.05\n  ELSE\n    SET discount <- 0\n  ENDIF\n  SET balance <- serviceFee - discount - amountPaid\n  SET totalBalance <- totalBalance + balance\n  DISPLAY patientName, discount, balance\nNEXT visit\nDISPLAY totalBalance\nSTOP",
        "marks": null
      },
      {
        "id": "pg-b1",
        "group": "Task B - Trace Table and Test Data",
        "question": "1. Create a trace table using at least three sets of test data. Include normal data, a boundary case and an invalid or unusual case where appropriate.",
        "how": [
          "Choose values that exercise each branch of the selection statement.",
          "Follow the pseudocode in order and record important variable values.",
          "Calculate the expected output before running the program."
        ],
        "answer": "The completed SPARK trace table includes the project's supplied normal examples and adds a boundary/validation discussion in the completed PDF.",
        "marks": null
      },
      {
        "id": "pg-c1",
        "group": "Task C - Program Implementation",
        "question": "1. Implement the algorithm in the programming language selected by your centre. The SPARK Pascal reference is saved as MedicalBalances_YourFullName.pas.",
        "how": [
          "Create variables using suitable data types.",
          "Translate each pseudocode step into program statements in the same logical order.",
          "Compile or run often so errors are found in small sections.",
          "Use the same test data from the trace table."
        ],
        "answer": "The SPARK reference implementation is MedicalBalances_YourFullName.pas. The completed PDF includes the full source code.",
        "marks": null
      },
      {
        "id": "pg-c2",
        "group": "Task C - Program Implementation",
        "question": "2. Test the program and capture evidence that the expected and actual results agree.",
        "how": [
          "Run normal test data first.",
          "Run the boundary case.",
          "Run an invalid or unusual input when the program includes validation.",
          "Capture screenshots showing both the entered data and the program result."
        ],
        "answer": "The completed SPARK reference compares expected trace-table outputs with the program output and records the result of each test.",
        "marks": null
      },
      {
        "id": "pg-d1",
        "group": "Task D - Documentation",
        "question": "1. Create ProgramDocumentation_YourFullName.pdf containing the problem definition, algorithm, source code, trace table, test data and screenshots of program execution.",
        "how": [
          "Create a cover page and table of contents.",
          "Keep the section order the same as the task sequence.",
          "Use readable code formatting and captions for screenshots.",
          "Export the final document to PDF and check every page."
        ],
        "answer": "Completed documentation filename: ProgramDocumentation_YourFullName.pdf. The SPARK section PDF demonstrates the required order and evidence.",
        "marks": null
      }
    ]
  },
  "community-market": {
    "database": [
      {
        "id": "db-a1",
        "group": "Task A - Tables",
        "question": "1. Create a database named YardFreshDB_YourFullName.accdb.",
        "how": [
          "Open your database software and create a blank database.",
          "Save it immediately with the exact filename in the question.",
          "Keep the database and all later SBA files inside one organised project folder."
        ],
        "answer": "SPARK reference filename: YardFreshDB_YourFullName.accdb.",
        "marks": null
      },
      {
        "id": "db-a2",
        "group": "Task A - Tables",
        "question": "2. Create the Product, Supplier and StockPurchase tables using suitable field names, data types and primary keys.",
        "how": [
          "Create Product first and enter the fields exactly as planned in your data dictionary.",
          "Repeat the process for Supplier and StockPurchase.",
          "Choose the primary key before entering records. Check currency, date and numeric data types carefully."
        ],
        "answer": "Completed table structures:\nProduct: ProductID - Short Text, primary key, ProductName - Short Text, Category - Short Text, UnitPrice - Currency, QuantityInStock - Number, ReorderLevel - Number, SupplierID - Short Text, foreign key\nSupplier: SupplierID - Short Text, primary key, SupplierName - Short Text, Phone - Short Text, Email - Short Text, Parish - Short Text\nStockPurchase: PurchaseID - Short Text, primary key, ProductID - Short Text, foreign key, PurchaseDate - Date/Time, QuantityBought - Number, CostPerUnit - Currency",
        "marks": null
      },
      {
        "id": "db-a3",
        "group": "Task A - Tables",
        "question": "3. Enter realistic records and apply the validation rules required by the project.",
        "how": [
          "Enter enough varied records to make your queries meaningful.",
          "Use validation rules for fields with a limited set or range of allowed values.",
          "Test the validation by deliberately entering one invalid value and confirming that the software rejects it."
        ],
        "answer": "The SPARK completed database uses fictional records with different categories, dates, fees and statuses so every query can be tested.",
        "marks": null
      },
      {
        "id": "db-a4",
        "group": "Task A - Tables",
        "question": "4. Create the required relationships and enforce the correct links between the tables.",
        "how": [
          "Open the Relationships window.",
          "Add all tables and drag each primary key to the matching foreign key.",
          "Check the real-world relationship before selecting referential-integrity options."
        ],
        "answer": "Supplier.SupplierID 1-to-many Product.SupplierID; Product.ProductID 1-to-many StockPurchase.ProductID.",
        "marks": null
      },
      {
        "id": "db-b1",
        "group": "Task B - Queries and Form",
        "question": "1. Create a query called Low Stock. Show products at or below the reorder level. Include ProductName, Category, QuantityInStock and ReorderLevel.",
        "how": [
          "Add only the table or tables required by the question.",
          "Add the requested fields to the query grid.",
          "Enter the criterion: QuantityInStock <= ReorderLevel.",
          "Run the query and compare every returned record with the source data."
        ],
        "answer": "Query name: Low Stock. Criterion used: QuantityInStock <= ReorderLevel.",
        "marks": null
      },
      {
        "id": "db-b2",
        "group": "Task B - Queries and Form",
        "question": "2. Create a query called Supplier Orders. Join Product, Supplier and StockPurchase. Calculate the order value.",
        "how": [
          "Add the related tables and confirm the join lines are correct.",
          "Add the display fields requested in the question.",
          "Create the calculated field using: OrderValue: [QuantityBought]*[CostPerUnit].",
          "Run the query and calculate one record manually to verify the result."
        ],
        "answer": "Query name: Supplier Orders. Calculation used: OrderValue: [QuantityBought]*[CostPerUnit].",
        "marks": null
      },
      {
        "id": "db-b3",
        "group": "Task B - Queries and Form",
        "question": "3. Create Product Information Form with Supplier subform and clear stock headings.",
        "how": [
          "Use the main record source for the parent form.",
          "Use the related table as the subform source.",
          "Add a clear title, useful instructions and navigation controls.",
          "Open several records and confirm the subform changes with the main record."
        ],
        "answer": "Completed form design: Product Information Form with Supplier subform and clear stock headings.",
        "marks": null
      },
      {
        "id": "db-c1",
        "group": "Task C - Report",
        "question": "1. Create Stock Value Report grouped by Category and showing total stock value.",
        "how": [
          "Use a query as the report source when it already contains the correct fields or calculation.",
          "Apply the exact grouping and sorting required by the question.",
          "Add the required summary in the group or report footer.",
          "Preview the report and correct clipped headings, blank pages and unreadable columns."
        ],
        "answer": "Completed report: Stock Value Report grouped by Category and showing total stock value.",
        "marks": null
      }
    ],
    "spreadsheet": [
      {
        "id": "ss-a1",
        "group": "Task A - Calculations and Functions",
        "question": "1. Create SalesAnalysis_YourFullName.xlsx with worksheets named ProductSales and Dashboard. Enter or import the project data into ProductSales and format it as a clear data table.",
        "how": [
          "Place one field name in each column heading and one record in each row.",
          "Apply appropriate number, date, currency and percentage formats.",
          "Freeze or emphasise the heading row if the sheet is long."
        ],
        "answer": "Completed workbook: SalesAnalysis_YourFullName.xlsx. Detailed data is stored on ProductSales; analysis is placed on Dashboard.",
        "marks": null
      },
      {
        "id": "ss-a2",
        "group": "Task A - Calculations and Functions",
        "question": "2. Create the main calculations using efficient formulas. The SPARK reference uses formulas such as =B2*C2, =IF(D2>=10000,D2*5%,0) and =(D2-E2)*(1+$M$2).",
        "how": [
          "Write the formula in the first data row using cell references, not typed answers.",
          "Check whether any rate or lookup cell must remain fixed.",
          "Fill the formula down and inspect the first, middle and last copied formula."
        ],
        "answer": "Reference formulas: =B2*C2; =IF(D2>=10000,D2*5%,0); =(D2-E2)*(1+$M$2).",
        "marks": null
      },
      {
        "id": "ss-a3",
        "group": "Task A - Calculations and Functions",
        "question": "3. Use at least three suitable functions. Functions used in the SPARK reference include SUM, AVERAGE, COUNTIF, IF, VLOOKUP.",
        "how": [
          "Choose each function because it answers a question in the scenario.",
          "Use cell ranges instead of typing individual values where possible.",
          "Check each function result with a small manual calculation or count."
        ],
        "answer": "Functions demonstrated: SUM, AVERAGE, COUNTIF, IF, VLOOKUP.",
        "marks": null
      },
      {
        "id": "ss-b1",
        "group": "Task B - Analysis and Presentation",
        "question": "1. Sort and filter the data to answer this requirement: Show products in Grocery or Beverage with QuantityInStock below 10.",
        "how": [
          "Apply the sort first when the question specifies an order.",
          "Turn on filters and apply every criterion in the requirement.",
          "Check the visible records one by one before taking evidence."
        ],
        "answer": "Completed filter requirement: Show products in Grocery or Beverage with QuantityInStock below 10.",
        "marks": null
      },
      {
        "id": "ss-b2",
        "group": "Task B - Analysis and Presentation",
        "question": "2. Create a summary showing Pivot-style summary of SalesValue by Category. Then create a suitable chart.",
        "how": [
          "Create the summary from the clean data range.",
          "Use category fields as row labels and a numeric field as the value.",
          "Insert the chart from the summary and add a clear title.",
          "Avoid 3-D effects that make values difficult to compare."
        ],
        "answer": "Completed summary: Pivot-style summary of SalesValue by Category. Completed chart: Column chart titled Sales by Category.",
        "marks": null
      },
      {
        "id": "ss-b3",
        "group": "Task B - Analysis and Presentation",
        "question": "3. Create a linked total or key result on the Dashboard worksheet so that it updates when the detailed sheet changes.",
        "how": [
          "Click the destination cell on Dashboard.",
          "Type =, switch to ProductSales, and select the source result cell.",
          "Press Enter and test the link by changing one source value."
        ],
        "answer": "The SPARK Dashboard sheet contains a direct worksheet link to the main total calculated on ProductSales.",
        "marks": null
      }
    ],
    "word": [
      {
        "id": "wp-a1",
        "group": "Task A - Fillable Form",
        "question": "1. Create a document named Supplier Registration Form_YourFullName.docx. The form must collect the information needed for this project and include clear instructions.",
        "how": [
          "Start with a clear title and one sentence explaining how the form should be completed.",
          "Group related fields together and leave enough space for each response.",
          "Use a consistent font and align labels cleanly."
        ],
        "answer": "The completed SPARK form is titled Supplier Registration Form and uses a clean two-column label-and-control layout.",
        "marks": null
      },
      {
        "id": "wp-a2",
        "group": "Task A - Fillable Form",
        "question": "2. Use suitable form controls. The SPARK reference uses: Supplier name text box; Parish drop-down list; Product-category drop-down list; Delivery check box.",
        "how": [
          "Turn on the developer or form-control tools in your word processor.",
          "Insert the control beside the correct label.",
          "Set the available choices for drop-down controls.",
          "Test every control before saving the form."
        ],
        "answer": "Completed controls: Supplier name text box; Parish drop-down list; Product-category drop-down list; Delivery check box.",
        "marks": null
      },
      {
        "id": "wp-b1",
        "group": "Task B - Mail Merge",
        "question": "1. Create a professional main document called Reorder Notice. Use the project data as the mail-merge source.",
        "how": [
          "Prepare the data source so every merge field has a clear heading.",
          "Create the main document with a suitable letterhead, date, greeting, body and closing.",
          "Connect the document to the data source before inserting fields."
        ],
        "answer": "The completed main document is Reorder Notice and is connected to the project data source.",
        "marks": null
      },
      {
        "id": "wp-b2",
        "group": "Task B - Mail Merge",
        "question": "2. Insert the following merge fields where they make sense: SupplierName, ProductName, QuantityRequired, RequiredDate.",
        "how": [
          "Insert fields from the Mailings or merge menu rather than typing angle brackets manually.",
          "Preview several records so long names and large amounts still fit the layout.",
          "Correct spacing and punctuation around merge fields."
        ],
        "answer": "Merge fields used: SupplierName, ProductName, QuantityRequired, RequiredDate.",
        "marks": null
      },
      {
        "id": "wp-b3",
        "group": "Task B - Mail Merge",
        "question": "3. Complete the final merged output and include one relevant table, chart or other imported item from the connected SBA work where appropriate.",
        "how": [
          "Finish the merge to a new document.",
          "Inspect the first, middle and last merged record.",
          "Insert the required project table or chart and size it so the page remains readable.",
          "Save the generic and merged documents separately."
        ],
        "answer": "The SPARK completed example includes a formatted project table and a merged sample record so students can see the final result, not only the merge-field setup.",
        "marks": null
      }
    ],
    "web": [
      {
        "id": "web-1",
        "group": "Web Page Design",
        "question": "1. Create one web page for YardFresh Community Market. The page must be suitable for the intended audience and include a project logo.",
        "how": [
          "Plan the page before coding or using a visual editor.",
          "Create a simple header containing the organisation name and a logo.",
          "Use readable contrast and keep the page width comfortable on phones and computers."
        ],
        "answer": "The completed SPARK page uses a single responsive page with a simple logo and clear organisation name.",
        "marks": null
      },
      {
        "id": "web-2",
        "group": "Web Page Design",
        "question": "2. Organise the page into these content sections: Fresh This Week, Product Categories, Delivery Information, Opening Hours, Contact.",
        "how": [
          "Use one heading for each section.",
          "Write short paragraphs or lists that answer the visitor's likely questions.",
          "Keep names, fees, dates and services consistent with the other SBA sections."
        ],
        "answer": "Completed sections: Fresh This Week, Product Categories, Delivery Information, Opening Hours, Contact.",
        "marks": null
      },
      {
        "id": "web-3",
        "group": "Web Page Design",
        "question": "3. Add at least two suitable hyperlink types and test them.",
        "how": [
          "Use descriptive link text instead of Click here.",
          "Include at least two hyperlink types allowed by your assignment.",
          "Open every link after saving the final page."
        ],
        "answer": "The SPARK page includes: Email link to orders@yardfresh.example; Internal link to Product Categories.",
        "marks": null
      },
      {
        "id": "web-4",
        "group": "Web Page Design",
        "question": "4. Add at least one relevant graphic and make sure the page remains readable at different screen sizes.",
        "how": [
          "Use a relevant image or graphic with sensible dimensions.",
          "Resize the browser window or use responsive-preview tools.",
          "Correct horizontal scrolling, clipped text and images that overflow the page."
        ],
        "answer": "The completed reference uses a project banner graphic, responsive sections and no horizontal scrolling at common mobile widths.",
        "marks": null
      },
      {
        "id": "web-5",
        "group": "Web Page Design",
        "question": "5. Save, test and prepare the final web-page evidence.",
        "how": [
          "Save the page and supporting files in one organised folder.",
          "Open the file directly in a browser and test navigation, email links and any file links.",
          "Take a clear screenshot of the final page if your teacher requires evidence."
        ],
        "answer": "The SPARK completed page is saved as index.html with all links tested and a matching completed-reference PDF.",
        "marks": null
      }
    ],
    "programming": [
      {
        "id": "pg-a1",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "1. Write a clear problem statement for the following task: Calculate the amount each customer pays after discount and GCT and display the total sales processed.",
        "how": [
          "State what information the program receives.",
          "State the main calculation or decision the program performs.",
          "State the result the program must display."
        ],
        "answer": "Problem statement: Calculate the amount each customer pays after discount and GCT and display the total sales processed.",
        "marks": null
      },
      {
        "id": "pg-a2",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "2. Identify the inputs, processes and outputs, then write pseudocode containing at least one selection and one repetition statement.",
        "how": [
          "List inputs, processes and outputs before writing pseudocode.",
          "Use indentation to show the selection and loop structure.",
          "Keep variable names consistent from the algorithm through to the program."
        ],
        "answer": "Inputs: Customer name, Purchase subtotal, Number of customers\nProcesses: Apply 5% discount at or above JMD 10,000, Calculate 15% GCT on the discounted amount, Calculate final amount, Accumulate total sales\nOutputs: Customer name, Discount, GCT, Final amount, Total sales\n\nPseudocode:\nSTART\nSET totalSales <- 0\nINPUT customerCount\nFOR customer <- 1 TO customerCount\n  INPUT customerName, subtotal\n  IF subtotal >= 10000 THEN\n    SET discount <- subtotal * 0.05\n  ELSE\n    SET discount <- 0\n  ENDIF\n  SET taxable <- subtotal - discount\n  SET gct <- taxable * 0.15\n  SET finalAmount <- taxable + gct\n  SET totalSales <- totalSales + finalAmount\n  DISPLAY customerName, discount, gct, finalAmount\nNEXT customer\nDISPLAY totalSales\nSTOP",
        "marks": null
      },
      {
        "id": "pg-b1",
        "group": "Task B - Trace Table and Test Data",
        "question": "1. Create a trace table using at least three sets of test data. Include normal data, a boundary case and an invalid or unusual case where appropriate.",
        "how": [
          "Choose values that exercise each branch of the selection statement.",
          "Follow the pseudocode in order and record important variable values.",
          "Calculate the expected output before running the program."
        ],
        "answer": "The completed SPARK trace table includes the project's supplied normal examples and adds a boundary/validation discussion in the completed PDF.",
        "marks": null
      },
      {
        "id": "pg-c1",
        "group": "Task C - Program Implementation",
        "question": "1. Implement the algorithm in the programming language selected by your centre. The SPARK Pascal reference is saved as MarketCheckout_YourFullName.pas.",
        "how": [
          "Create variables using suitable data types.",
          "Translate each pseudocode step into program statements in the same logical order.",
          "Compile or run often so errors are found in small sections.",
          "Use the same test data from the trace table."
        ],
        "answer": "The SPARK reference implementation is MarketCheckout_YourFullName.pas. The completed PDF includes the full source code.",
        "marks": null
      },
      {
        "id": "pg-c2",
        "group": "Task C - Program Implementation",
        "question": "2. Test the program and capture evidence that the expected and actual results agree.",
        "how": [
          "Run normal test data first.",
          "Run the boundary case.",
          "Run an invalid or unusual input when the program includes validation.",
          "Capture screenshots showing both the entered data and the program result."
        ],
        "answer": "The completed SPARK reference compares expected trace-table outputs with the program output and records the result of each test.",
        "marks": null
      },
      {
        "id": "pg-d1",
        "group": "Task D - Documentation",
        "question": "1. Create ProgramDocumentation_YourFullName.pdf containing the problem definition, algorithm, source code, trace table, test data and screenshots of program execution.",
        "how": [
          "Create a cover page and table of contents.",
          "Keep the section order the same as the task sequence.",
          "Use readable code formatting and captions for screenshots.",
          "Export the final document to PDF and check every page."
        ],
        "answer": "Completed documentation filename: ProgramDocumentation_YourFullName.pdf. The SPARK section PDF demonstrates the required order and evidence.",
        "marks": null
      }
    ]
  },
  "community-library": {
    "database": [
      {
        "id": "db-a1",
        "group": "Task A - Tables",
        "question": "1. Create a database named HarbourViewLibrary_YourFullName.accdb.",
        "how": [
          "Open your database software and create a blank database.",
          "Save it immediately with the exact filename in the question.",
          "Keep the database and all later SBA files inside one organised project folder."
        ],
        "answer": "SPARK reference filename: HarbourViewLibrary_YourFullName.accdb.",
        "marks": null
      },
      {
        "id": "db-a2",
        "group": "Task A - Tables",
        "question": "2. Create the Member, Book and Loan tables using suitable field names, data types and primary keys.",
        "how": [
          "Create Member first and enter the fields exactly as planned in your data dictionary.",
          "Repeat the process for Book and Loan.",
          "Choose the primary key before entering records. Check currency, date and numeric data types carefully."
        ],
        "answer": "Completed table structures:\nMember: MemberID - Short Text, primary key, FirstName - Short Text, LastName - Short Text, MemberType - Short Text, Phone - Short Text, Email - Short Text\nBook: BookID - Short Text, primary key, Title - Short Text, Category - Short Text, Author - Short Text, DailyFine - Currency\nLoan: LoanID - Short Text, primary key, MemberID - Short Text, foreign key, BookID - Short Text, foreign key, DateBorrowed - Date/Time, DueDate - Date/Time, DateReturned - Date/Time",
        "marks": null
      },
      {
        "id": "db-a3",
        "group": "Task A - Tables",
        "question": "3. Enter realistic records and apply the validation rules required by the project.",
        "how": [
          "Enter enough varied records to make your queries meaningful.",
          "Use validation rules for fields with a limited set or range of allowed values.",
          "Test the validation by deliberately entering one invalid value and confirming that the software rejects it."
        ],
        "answer": "The SPARK completed database uses fictional records with different categories, dates, fees and statuses so every query can be tested.",
        "marks": null
      },
      {
        "id": "db-a4",
        "group": "Task A - Tables",
        "question": "4. Create the required relationships and enforce the correct links between the tables.",
        "how": [
          "Open the Relationships window.",
          "Add all tables and drag each primary key to the matching foreign key.",
          "Check the real-world relationship before selecting referential-integrity options."
        ],
        "answer": "Member.MemberID 1-to-many Loan.MemberID; Book.BookID 1-to-many Loan.BookID.",
        "marks": null
      },
      {
        "id": "db-b1",
        "group": "Task B - Queries and Form",
        "question": "1. Create a query called Overdue Loans. Show loans returned after the due date or still overdue. Include member, book and days late.",
        "how": [
          "Add only the table or tables required by the question.",
          "Add the requested fields to the query grid.",
          "Enter the criterion: FineDue: [DaysLate]*[DailyFine].",
          "Run the query and compare every returned record with the source data."
        ],
        "answer": "Query name: Overdue Loans. Criterion used: FineDue: [DaysLate]*[DailyFine].",
        "marks": null
      },
      {
        "id": "db-b2",
        "group": "Task B - Queries and Form",
        "question": "2. Create a query called Member Loans. Join Member, Book and Loan and show all borrowing details sorted by LastName.",
        "how": [
          "Add the related tables and confirm the join lines are correct.",
          "Add the display fields requested in the question.",
          "Create the calculated field using: No additional calculation.",
          "Run the query and calculate one record manually to verify the result."
        ],
        "answer": "Query name: Member Loans. Calculation used: No additional calculation.",
        "marks": null
      },
      {
        "id": "db-b3",
        "group": "Task B - Queries and Form",
        "question": "3. Create Member Information Form with Loan subform and clear borrowing headings.",
        "how": [
          "Use the main record source for the parent form.",
          "Use the related table as the subform source.",
          "Add a clear title, useful instructions and navigation controls.",
          "Open several records and confirm the subform changes with the main record."
        ],
        "answer": "Completed form design: Member Information Form with Loan subform and clear borrowing headings.",
        "marks": null
      },
      {
        "id": "db-c1",
        "group": "Task C - Report",
        "question": "1. Create Overdue Report grouped by MemberType and showing count and total FineDue.",
        "how": [
          "Use a query as the report source when it already contains the correct fields or calculation.",
          "Apply the exact grouping and sorting required by the question.",
          "Add the required summary in the group or report footer.",
          "Preview the report and correct clipped headings, blank pages and unreadable columns."
        ],
        "answer": "Completed report: Overdue Report grouped by MemberType and showing count and total FineDue.",
        "marks": null
      }
    ],
    "spreadsheet": [
      {
        "id": "ss-a1",
        "group": "Task A - Calculations and Functions",
        "question": "1. Create LoansAnalysis_YourFullName.xlsx with worksheets named Loans and Dashboard. Enter or import the project data into Loans and format it as a clear data table.",
        "how": [
          "Place one field name in each column heading and one record in each row.",
          "Apply appropriate number, date, currency and percentage formats.",
          "Freeze or emphasise the heading row if the sheet is long."
        ],
        "answer": "Completed workbook: LoansAnalysis_YourFullName.xlsx. Detailed data is stored on Loans; analysis is placed on Dashboard.",
        "marks": null
      },
      {
        "id": "ss-a2",
        "group": "Task A - Calculations and Functions",
        "question": "2. Create the main calculations using efficient formulas. The SPARK reference uses formulas such as =MAX(0,F2-E2), =IF(G2>0,G2*H2,0) and =I2*(1-$M$2).",
        "how": [
          "Write the formula in the first data row using cell references, not typed answers.",
          "Check whether any rate or lookup cell must remain fixed.",
          "Fill the formula down and inspect the first, middle and last copied formula."
        ],
        "answer": "Reference formulas: =MAX(0,F2-E2); =IF(G2>0,G2*H2,0); =I2*(1-$M$2).",
        "marks": null
      },
      {
        "id": "ss-a3",
        "group": "Task A - Calculations and Functions",
        "question": "3. Use at least three suitable functions. Functions used in the SPARK reference include COUNTIF, AVERAGE, SUM, IF, MAX.",
        "how": [
          "Choose each function because it answers a question in the scenario.",
          "Use cell ranges instead of typing individual values where possible.",
          "Check each function result with a small manual calculation or count."
        ],
        "answer": "Functions demonstrated: COUNTIF, AVERAGE, SUM, IF, MAX.",
        "marks": null
      },
      {
        "id": "ss-b1",
        "group": "Task B - Analysis and Presentation",
        "question": "1. Sort and filter the data to answer this requirement: Show overdue loans only, then sort by DaysLate descending.",
        "how": [
          "Apply the sort first when the question specifies an order.",
          "Turn on filters and apply every criterion in the requirement.",
          "Check the visible records one by one before taking evidence."
        ],
        "answer": "Completed filter requirement: Show overdue loans only, then sort by DaysLate descending.",
        "marks": null
      },
      {
        "id": "ss-b2",
        "group": "Task B - Analysis and Presentation",
        "question": "2. Create a summary showing Summary of number of loans by Category. Then create a suitable chart.",
        "how": [
          "Create the summary from the clean data range.",
          "Use category fields as row labels and a numeric field as the value.",
          "Insert the chart from the summary and add a clear title.",
          "Avoid 3-D effects that make values difficult to compare."
        ],
        "answer": "Completed summary: Summary of number of loans by Category. Completed chart: Column chart titled Loans by Category.",
        "marks": null
      },
      {
        "id": "ss-b3",
        "group": "Task B - Analysis and Presentation",
        "question": "3. Create a linked total or key result on the Dashboard worksheet so that it updates when the detailed sheet changes.",
        "how": [
          "Click the destination cell on Dashboard.",
          "Type =, switch to Loans, and select the source result cell.",
          "Press Enter and test the link by changing one source value."
        ],
        "answer": "The SPARK Dashboard sheet contains a direct worksheet link to the main total calculated on Loans.",
        "marks": null
      }
    ],
    "word": [
      {
        "id": "wp-a1",
        "group": "Task A - Fillable Form",
        "question": "1. Create a document named Library Membership Form_YourFullName.docx. The form must collect the information needed for this project and include clear instructions.",
        "how": [
          "Start with a clear title and one sentence explaining how the form should be completed.",
          "Group related fields together and leave enough space for each response.",
          "Use a consistent font and align labels cleanly."
        ],
        "answer": "The completed SPARK form is titled Library Membership Form and uses a clean two-column label-and-control layout.",
        "marks": null
      },
      {
        "id": "wp-a2",
        "group": "Task A - Fillable Form",
        "question": "2. Use suitable form controls. The SPARK reference uses: Full name text box; Member type drop-down list; Membership date picker; Terms check box.",
        "how": [
          "Turn on the developer or form-control tools in your word processor.",
          "Insert the control beside the correct label.",
          "Set the available choices for drop-down controls.",
          "Test every control before saving the form."
        ],
        "answer": "Completed controls: Full name text box; Member type drop-down list; Membership date picker; Terms check box.",
        "marks": null
      },
      {
        "id": "wp-b1",
        "group": "Task B - Mail Merge",
        "question": "1. Create a professional main document called Overdue Notice. Use the project data as the mail-merge source.",
        "how": [
          "Prepare the data source so every merge field has a clear heading.",
          "Create the main document with a suitable letterhead, date, greeting, body and closing.",
          "Connect the document to the data source before inserting fields."
        ],
        "answer": "The completed main document is Overdue Notice and is connected to the project data source.",
        "marks": null
      },
      {
        "id": "wp-b2",
        "group": "Task B - Mail Merge",
        "question": "2. Insert the following merge fields where they make sense: MemberName, BookTitle, DueDate, FineDue.",
        "how": [
          "Insert fields from the Mailings or merge menu rather than typing angle brackets manually.",
          "Preview several records so long names and large amounts still fit the layout.",
          "Correct spacing and punctuation around merge fields."
        ],
        "answer": "Merge fields used: MemberName, BookTitle, DueDate, FineDue.",
        "marks": null
      },
      {
        "id": "wp-b3",
        "group": "Task B - Mail Merge",
        "question": "3. Complete the final merged output and include one relevant table, chart or other imported item from the connected SBA work where appropriate.",
        "how": [
          "Finish the merge to a new document.",
          "Inspect the first, middle and last merged record.",
          "Insert the required project table or chart and size it so the page remains readable.",
          "Save the generic and merged documents separately."
        ],
        "answer": "The SPARK completed example includes a formatted project table and a merged sample record so students can see the final result, not only the merge-field setup.",
        "marks": null
      }
    ],
    "web": [
      {
        "id": "web-1",
        "group": "Web Page Design",
        "question": "1. Create one web page for HarbourView Community Library. The page must be suitable for the intended audience and include a project logo.",
        "how": [
          "Plan the page before coding or using a visual editor.",
          "Create a simple header containing the organisation name and a logo.",
          "Use readable contrast and keep the page width comfortable on phones and computers."
        ],
        "answer": "The completed SPARK page uses a single responsive page with a simple logo and clear organisation name.",
        "marks": null
      },
      {
        "id": "web-2",
        "group": "Web Page Design",
        "question": "2. Organise the page into these content sections: Welcome, Services, Borrowing Rules, Opening Hours, Contact.",
        "how": [
          "Use one heading for each section.",
          "Write short paragraphs or lists that answer the visitor's likely questions.",
          "Keep names, fees, dates and services consistent with the other SBA sections."
        ],
        "answer": "Completed sections: Welcome, Services, Borrowing Rules, Opening Hours, Contact.",
        "marks": null
      },
      {
        "id": "web-3",
        "group": "Web Page Design",
        "question": "3. Add at least two suitable hyperlink types and test them.",
        "how": [
          "Use descriptive link text instead of Click here.",
          "Include at least two hyperlink types allowed by your assignment.",
          "Open every link after saving the final page."
        ],
        "answer": "The SPARK page includes: Email link to library@harbourview.example; Internal link to Borrowing Rules.",
        "marks": null
      },
      {
        "id": "web-4",
        "group": "Web Page Design",
        "question": "4. Add at least one relevant graphic and make sure the page remains readable at different screen sizes.",
        "how": [
          "Use a relevant image or graphic with sensible dimensions.",
          "Resize the browser window or use responsive-preview tools.",
          "Correct horizontal scrolling, clipped text and images that overflow the page."
        ],
        "answer": "The completed reference uses a project banner graphic, responsive sections and no horizontal scrolling at common mobile widths.",
        "marks": null
      },
      {
        "id": "web-5",
        "group": "Web Page Design",
        "question": "5. Save, test and prepare the final web-page evidence.",
        "how": [
          "Save the page and supporting files in one organised folder.",
          "Open the file directly in a browser and test navigation, email links and any file links.",
          "Take a clear screenshot of the final page if your teacher requires evidence."
        ],
        "answer": "The SPARK completed page is saved as index.html with all links tested and a matching completed-reference PDF.",
        "marks": null
      }
    ],
    "programming": [
      {
        "id": "pg-a1",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "1. Write a clear problem statement for the following task: Calculate the overdue amount for each library member and the total fines from all records processed.",
        "how": [
          "State what information the program receives.",
          "State the main calculation or decision the program performs.",
          "State the result the program must display."
        ],
        "answer": "Problem statement: Calculate the overdue amount for each library member and the total fines from all records processed.",
        "marks": null
      },
      {
        "id": "pg-a2",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "2. Identify the inputs, processes and outputs, then write pseudocode containing at least one selection and one repetition statement.",
        "how": [
          "List inputs, processes and outputs before writing pseudocode.",
          "Use indentation to show the selection and loop structure.",
          "Keep variable names consistent from the algorithm through to the program."
        ],
        "answer": "Inputs: Member name, Days late, Member type\nProcesses: Calculate base fine at JMD 100 per day, Apply 25% student concession, Accumulate total fines\nOutputs: Member name, Days late, Fine, Total fines\n\nPseudocode:\nSTART\nSET totalFines <- 0\nINPUT recordCount\nFOR record <- 1 TO recordCount\n  INPUT memberName, daysLate, memberType\n  SET fine <- daysLate * 100\n  IF memberType = 'STUDENT' THEN\n    SET fine <- fine * 0.75\n  ENDIF\n  SET totalFines <- totalFines + fine\n  DISPLAY memberName, daysLate, fine\nNEXT record\nDISPLAY totalFines\nSTOP",
        "marks": null
      },
      {
        "id": "pg-b1",
        "group": "Task B - Trace Table and Test Data",
        "question": "1. Create a trace table using at least three sets of test data. Include normal data, a boundary case and an invalid or unusual case where appropriate.",
        "how": [
          "Choose values that exercise each branch of the selection statement.",
          "Follow the pseudocode in order and record important variable values.",
          "Calculate the expected output before running the program."
        ],
        "answer": "The completed SPARK trace table includes the project's supplied normal examples and adds a boundary/validation discussion in the completed PDF.",
        "marks": null
      },
      {
        "id": "pg-c1",
        "group": "Task C - Program Implementation",
        "question": "1. Implement the algorithm in the programming language selected by your centre. The SPARK Pascal reference is saved as LibraryFines_YourFullName.pas.",
        "how": [
          "Create variables using suitable data types.",
          "Translate each pseudocode step into program statements in the same logical order.",
          "Compile or run often so errors are found in small sections.",
          "Use the same test data from the trace table."
        ],
        "answer": "The SPARK reference implementation is LibraryFines_YourFullName.pas. The completed PDF includes the full source code.",
        "marks": null
      },
      {
        "id": "pg-c2",
        "group": "Task C - Program Implementation",
        "question": "2. Test the program and capture evidence that the expected and actual results agree.",
        "how": [
          "Run normal test data first.",
          "Run the boundary case.",
          "Run an invalid or unusual input when the program includes validation.",
          "Capture screenshots showing both the entered data and the program result."
        ],
        "answer": "The completed SPARK reference compares expected trace-table outputs with the program output and records the result of each test.",
        "marks": null
      },
      {
        "id": "pg-d1",
        "group": "Task D - Documentation",
        "question": "1. Create ProgramDocumentation_YourFullName.pdf containing the problem definition, algorithm, source code, trace table, test data and screenshots of program execution.",
        "how": [
          "Create a cover page and table of contents.",
          "Keep the section order the same as the task sequence.",
          "Use readable code formatting and captions for screenshots.",
          "Export the final document to PDF and check every page."
        ],
        "answer": "Completed documentation filename: ProgramDocumentation_YourFullName.pdf. The SPARK section PDF demonstrates the required order and evidence.",
        "marks": null
      }
    ]
  },
  "island-tours": {
    "database": [
      {
        "id": "db-a1",
        "group": "Task A - Tables",
        "question": "1. Create a database named BlueWaveTours_YourFullName.accdb.",
        "how": [
          "Open your database software and create a blank database.",
          "Save it immediately with the exact filename in the question.",
          "Keep the database and all later SBA files inside one organised project folder."
        ],
        "answer": "SPARK reference filename: BlueWaveTours_YourFullName.accdb.",
        "marks": null
      },
      {
        "id": "db-a2",
        "group": "Task A - Tables",
        "question": "2. Create the Customer, TourPackage and Booking tables using suitable field names, data types and primary keys.",
        "how": [
          "Create Customer first and enter the fields exactly as planned in your data dictionary.",
          "Repeat the process for TourPackage and Booking.",
          "Choose the primary key before entering records. Check currency, date and numeric data types carefully."
        ],
        "answer": "Completed table structures:\nCustomer: CustomerID - Short Text, primary key, FirstName - Short Text, LastName - Short Text, Country - Short Text, Phone - Short Text, Email - Short Text\nTourPackage: PackageCode - Short Text, primary key, PackageName - Short Text, Parish - Short Text, AdultRate - Currency, ChildRate - Currency, Capacity - Number\nBooking: BookingID - Short Text, primary key, CustomerID - Short Text, foreign key, PackageCode - Short Text, foreign key, TourDate - Date/Time, Adults - Number, Children - Number, AmountPaid - Currency",
        "marks": null
      },
      {
        "id": "db-a3",
        "group": "Task A - Tables",
        "question": "3. Enter realistic records and apply the validation rules required by the project.",
        "how": [
          "Enter enough varied records to make your queries meaningful.",
          "Use validation rules for fields with a limited set or range of allowed values.",
          "Test the validation by deliberately entering one invalid value and confirming that the software rejects it."
        ],
        "answer": "The SPARK completed database uses fictional records with different categories, dates, fees and statuses so every query can be tested.",
        "marks": null
      },
      {
        "id": "db-a4",
        "group": "Task A - Tables",
        "question": "4. Create the required relationships and enforce the correct links between the tables.",
        "how": [
          "Open the Relationships window.",
          "Add all tables and drag each primary key to the matching foreign key.",
          "Check the real-world relationship before selecting referential-integrity options."
        ],
        "answer": "Customer.CustomerID 1-to-many Booking.CustomerID; TourPackage.PackageCode 1-to-many Booking.PackageCode.",
        "marks": null
      },
      {
        "id": "db-b1",
        "group": "Task B - Queries and Form",
        "question": "1. Create a query called Upcoming Tours. Show bookings with TourDate on or after today. Include customer, package and tour date.",
        "how": [
          "Add only the table or tables required by the question.",
          "Add the requested fields to the query grid.",
          "Enter the criterion: TourDate >= Date().",
          "Run the query and compare every returned record with the source data."
        ],
        "answer": "Query name: Upcoming Tours. Criterion used: TourDate >= Date().",
        "marks": null
      },
      {
        "id": "db-b2",
        "group": "Task B - Queries and Form",
        "question": "2. Create a query called Outstanding Payments. Join Customer, TourPackage and Booking and calculate BookingCost and Balance.",
        "how": [
          "Add the related tables and confirm the join lines are correct.",
          "Add the display fields requested in the question.",
          "Create the calculated field using: BookingCost: ([Adults]*[AdultRate])+([Children]*[ChildRate]); Balance: [BookingCost]-[AmountPaid].",
          "Run the query and calculate one record manually to verify the result."
        ],
        "answer": "Query name: Outstanding Payments. Calculation used: BookingCost: ([Adults]*[AdultRate])+([Children]*[ChildRate]); Balance: [BookingCost]-[AmountPaid].",
        "marks": null
      },
      {
        "id": "db-b3",
        "group": "Task B - Queries and Form",
        "question": "3. Create Customer Information Form with Booking subform and clear tour headings.",
        "how": [
          "Use the main record source for the parent form.",
          "Use the related table as the subform source.",
          "Add a clear title, useful instructions and navigation controls.",
          "Open several records and confirm the subform changes with the main record."
        ],
        "answer": "Completed form design: Customer Information Form with Booking subform and clear tour headings.",
        "marks": null
      },
      {
        "id": "db-c1",
        "group": "Task C - Report",
        "question": "1. Create Package Revenue Report grouped by PackageName with booking count and total BookingCost.",
        "how": [
          "Use a query as the report source when it already contains the correct fields or calculation.",
          "Apply the exact grouping and sorting required by the question.",
          "Add the required summary in the group or report footer.",
          "Preview the report and correct clipped headings, blank pages and unreadable columns."
        ],
        "answer": "Completed report: Package Revenue Report grouped by PackageName with booking count and total BookingCost.",
        "marks": null
      }
    ],
    "spreadsheet": [
      {
        "id": "ss-a1",
        "group": "Task A - Calculations and Functions",
        "question": "1. Create TourBookings_YourFullName.xlsx with worksheets named Bookings and Dashboard. Enter or import the project data into Bookings and format it as a clear data table.",
        "how": [
          "Place one field name in each column heading and one record in each row.",
          "Apply appropriate number, date, currency and percentage formats.",
          "Freeze or emphasise the heading row if the sheet is long."
        ],
        "answer": "Completed workbook: TourBookings_YourFullName.xlsx. Detailed data is stored on Bookings; analysis is placed on Dashboard.",
        "marks": null
      },
      {
        "id": "ss-a2",
        "group": "Task A - Calculations and Functions",
        "question": "2. Create the main calculations using efficient formulas. The SPARK reference uses formulas such as =(E2*G2)+(F2*H2), =IF(E2+F2>=5,I2*8%,0) and =(I2-J2)*(1+$M$2).",
        "how": [
          "Write the formula in the first data row using cell references, not typed answers.",
          "Check whether any rate or lookup cell must remain fixed.",
          "Fill the formula down and inspect the first, middle and last copied formula."
        ],
        "answer": "Reference formulas: =(E2*G2)+(F2*H2); =IF(E2+F2>=5,I2*8%,0); =(I2-J2)*(1+$M$2).",
        "marks": null
      },
      {
        "id": "ss-a3",
        "group": "Task A - Calculations and Functions",
        "question": "3. Use at least three suitable functions. Functions used in the SPARK reference include VLOOKUP, COUNTIF, AVERAGE, IF, SUM.",
        "how": [
          "Choose each function because it answers a question in the scenario.",
          "Use cell ranges instead of typing individual values where possible.",
          "Check each function result with a small manual calculation or count."
        ],
        "answer": "Functions demonstrated: VLOOKUP, COUNTIF, AVERAGE, IF, SUM.",
        "marks": null
      },
      {
        "id": "ss-b1",
        "group": "Task B - Analysis and Presentation",
        "question": "1. Sort and filter the data to answer this requirement: Show bookings with Balance greater than 0 and TourDate within the next 30 days.",
        "how": [
          "Apply the sort first when the question specifies an order.",
          "Turn on filters and apply every criterion in the requirement.",
          "Check the visible records one by one before taking evidence."
        ],
        "answer": "Completed filter requirement: Show bookings with Balance greater than 0 and TourDate within the next 30 days.",
        "marks": null
      },
      {
        "id": "ss-b2",
        "group": "Task B - Analysis and Presentation",
        "question": "2. Create a summary showing Pivot-style summary of revenue by PackageName. Then create a suitable chart.",
        "how": [
          "Create the summary from the clean data range.",
          "Use category fields as row labels and a numeric field as the value.",
          "Insert the chart from the summary and add a clear title.",
          "Avoid 3-D effects that make values difficult to compare."
        ],
        "answer": "Completed summary: Pivot-style summary of revenue by PackageName. Completed chart: Column chart titled Revenue by Tour Package.",
        "marks": null
      },
      {
        "id": "ss-b3",
        "group": "Task B - Analysis and Presentation",
        "question": "3. Create a linked total or key result on the Dashboard worksheet so that it updates when the detailed sheet changes.",
        "how": [
          "Click the destination cell on Dashboard.",
          "Type =, switch to Bookings, and select the source result cell.",
          "Press Enter and test the link by changing one source value."
        ],
        "answer": "The SPARK Dashboard sheet contains a direct worksheet link to the main total calculated on Bookings.",
        "marks": null
      }
    ],
    "word": [
      {
        "id": "wp-a1",
        "group": "Task A - Fillable Form",
        "question": "1. Create a document named Tour Booking Request Form_YourFullName.docx. The form must collect the information needed for this project and include clear instructions.",
        "how": [
          "Start with a clear title and one sentence explaining how the form should be completed.",
          "Group related fields together and leave enough space for each response.",
          "Use a consistent font and align labels cleanly."
        ],
        "answer": "The completed SPARK form is titled Tour Booking Request Form and uses a clean two-column label-and-control layout.",
        "marks": null
      },
      {
        "id": "wp-a2",
        "group": "Task A - Fillable Form",
        "question": "2. Use suitable form controls. The SPARK reference uses: Customer name text box; Tour date picker; Package drop-down list; Transport-needed check box.",
        "how": [
          "Turn on the developer or form-control tools in your word processor.",
          "Insert the control beside the correct label.",
          "Set the available choices for drop-down controls.",
          "Test every control before saving the form."
        ],
        "answer": "Completed controls: Customer name text box; Tour date picker; Package drop-down list; Transport-needed check box.",
        "marks": null
      },
      {
        "id": "wp-b1",
        "group": "Task B - Mail Merge",
        "question": "1. Create a professional main document called Booking Confirmation. Use the project data as the mail-merge source.",
        "how": [
          "Prepare the data source so every merge field has a clear heading.",
          "Create the main document with a suitable letterhead, date, greeting, body and closing.",
          "Connect the document to the data source before inserting fields."
        ],
        "answer": "The completed main document is Booking Confirmation and is connected to the project data source.",
        "marks": null
      },
      {
        "id": "wp-b2",
        "group": "Task B - Mail Merge",
        "question": "2. Insert the following merge fields where they make sense: CustomerName, PackageName, TourDate, BookingCost, Balance.",
        "how": [
          "Insert fields from the Mailings or merge menu rather than typing angle brackets manually.",
          "Preview several records so long names and large amounts still fit the layout.",
          "Correct spacing and punctuation around merge fields."
        ],
        "answer": "Merge fields used: CustomerName, PackageName, TourDate, BookingCost, Balance.",
        "marks": null
      },
      {
        "id": "wp-b3",
        "group": "Task B - Mail Merge",
        "question": "3. Complete the final merged output and include one relevant table, chart or other imported item from the connected SBA work where appropriate.",
        "how": [
          "Finish the merge to a new document.",
          "Inspect the first, middle and last merged record.",
          "Insert the required project table or chart and size it so the page remains readable.",
          "Save the generic and merged documents separately."
        ],
        "answer": "The SPARK completed example includes a formatted project table and a merged sample record so students can see the final result, not only the merge-field setup.",
        "marks": null
      }
    ],
    "web": [
      {
        "id": "web-1",
        "group": "Web Page Design",
        "question": "1. Create one web page for BlueWave Island Tours. The page must be suitable for the intended audience and include a project logo.",
        "how": [
          "Plan the page before coding or using a visual editor.",
          "Create a simple header containing the organisation name and a logo.",
          "Use readable contrast and keep the page width comfortable on phones and computers."
        ],
        "answer": "The completed SPARK page uses a single responsive page with a simple logo and clear organisation name.",
        "marks": null
      },
      {
        "id": "web-2",
        "group": "Web Page Design",
        "question": "2. Organise the page into these content sections: Explore BlueWave, Tour Packages, What to Bring, Booking Information, Contact.",
        "how": [
          "Use one heading for each section.",
          "Write short paragraphs or lists that answer the visitor's likely questions.",
          "Keep names, fees, dates and services consistent with the other SBA sections."
        ],
        "answer": "Completed sections: Explore BlueWave, Tour Packages, What to Bring, Booking Information, Contact.",
        "marks": null
      },
      {
        "id": "web-3",
        "group": "Web Page Design",
        "question": "3. Add at least two suitable hyperlink types and test them.",
        "how": [
          "Use descriptive link text instead of Click here.",
          "Include at least two hyperlink types allowed by your assignment.",
          "Open every link after saving the final page."
        ],
        "answer": "The SPARK page includes: Email link to bookings@bluewave.example; Internal link to Tour Packages.",
        "marks": null
      },
      {
        "id": "web-4",
        "group": "Web Page Design",
        "question": "4. Add at least one relevant graphic and make sure the page remains readable at different screen sizes.",
        "how": [
          "Use a relevant image or graphic with sensible dimensions.",
          "Resize the browser window or use responsive-preview tools.",
          "Correct horizontal scrolling, clipped text and images that overflow the page."
        ],
        "answer": "The completed reference uses a project banner graphic, responsive sections and no horizontal scrolling at common mobile widths.",
        "marks": null
      },
      {
        "id": "web-5",
        "group": "Web Page Design",
        "question": "5. Save, test and prepare the final web-page evidence.",
        "how": [
          "Save the page and supporting files in one organised folder.",
          "Open the file directly in a browser and test navigation, email links and any file links.",
          "Take a clear screenshot of the final page if your teacher requires evidence."
        ],
        "answer": "The SPARK completed page is saved as index.html with all links tested and a matching completed-reference PDF.",
        "marks": null
      }
    ],
    "programming": [
      {
        "id": "pg-a1",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "1. Write a clear problem statement for the following task: Calculate the final cost and balance for each tour booking and the combined value of bookings processed.",
        "how": [
          "State what information the program receives.",
          "State the main calculation or decision the program performs.",
          "State the result the program must display."
        ],
        "answer": "Problem statement: Calculate the final cost and balance for each tour booking and the combined value of bookings processed.",
        "marks": null
      },
      {
        "id": "pg-a2",
        "group": "Task A - Problem Definition and Algorithm",
        "question": "2. Identify the inputs, processes and outputs, then write pseudocode containing at least one selection and one repetition statement.",
        "how": [
          "List inputs, processes and outputs before writing pseudocode.",
          "Use indentation to show the selection and loop structure.",
          "Keep variable names consistent from the algorithm through to the program."
        ],
        "answer": "Inputs: Customer name, Package code, Adults, Children, Amount paid\nProcesses: Select adult and child rates, Calculate booking cost, Apply 8% group discount when five or more persons are booked, Subtract amount paid, Accumulate booking value\nOutputs: Customer summary, Discount, Final cost, Balance, Total booking value\n\nPseudocode:\nSTART\nSET totalValue <- 0\nINPUT bookingCount\nFOR booking <- 1 TO bookingCount\n  INPUT customerName, packageCode, adults, children, amountPaid\n  SET adultRate and childRate for packageCode\n  SET cost <- (adults * adultRate) + (children * childRate)\n  IF adults + children >= 5 THEN\n    SET discount <- cost * 0.08\n  ELSE\n    SET discount <- 0\n  ENDIF\n  SET finalCost <- cost - discount\n  SET balance <- finalCost - amountPaid\n  SET totalValue <- totalValue + finalCost\n  DISPLAY customerName, discount, finalCost, balance\nNEXT booking\nDISPLAY totalValue\nSTOP",
        "marks": null
      },
      {
        "id": "pg-b1",
        "group": "Task B - Trace Table and Test Data",
        "question": "1. Create a trace table using at least three sets of test data. Include normal data, a boundary case and an invalid or unusual case where appropriate.",
        "how": [
          "Choose values that exercise each branch of the selection statement.",
          "Follow the pseudocode in order and record important variable values.",
          "Calculate the expected output before running the program."
        ],
        "answer": "The completed SPARK trace table includes the project's supplied normal examples and adds a boundary/validation discussion in the completed PDF.",
        "marks": null
      },
      {
        "id": "pg-c1",
        "group": "Task C - Program Implementation",
        "question": "1. Implement the algorithm in the programming language selected by your centre. The SPARK Pascal reference is saved as TourBookings_YourFullName.pas.",
        "how": [
          "Create variables using suitable data types.",
          "Translate each pseudocode step into program statements in the same logical order.",
          "Compile or run often so errors are found in small sections.",
          "Use the same test data from the trace table."
        ],
        "answer": "The SPARK reference implementation is TourBookings_YourFullName.pas. The completed PDF includes the full source code.",
        "marks": null
      },
      {
        "id": "pg-c2",
        "group": "Task C - Program Implementation",
        "question": "2. Test the program and capture evidence that the expected and actual results agree.",
        "how": [
          "Run normal test data first.",
          "Run the boundary case.",
          "Run an invalid or unusual input when the program includes validation.",
          "Capture screenshots showing both the entered data and the program result."
        ],
        "answer": "The completed SPARK reference compares expected trace-table outputs with the program output and records the result of each test.",
        "marks": null
      },
      {
        "id": "pg-d1",
        "group": "Task D - Documentation",
        "question": "1. Create ProgramDocumentation_YourFullName.pdf containing the problem definition, algorithm, source code, trace table, test data and screenshots of program execution.",
        "how": [
          "Create a cover page and table of contents.",
          "Keep the section order the same as the task sequence.",
          "Use readable code formatting and captions for screenshots.",
          "Export the final document to PDF and check every page."
        ],
        "answer": "Completed documentation filename: ProgramDocumentation_YourFullName.pdf. The SPARK section PDF demonstrates the required order and evidence.",
        "marks": null
      }
    ]
  }
};

export function getItSbaProjectTasks(projectId, componentId) {
  return IT_SBA_PROJECT_TASKS?.[projectId]?.[componentId] || [];
}