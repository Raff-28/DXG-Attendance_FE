# DXG Attendance App

This project is a web front-end for a WFH attendance application in the hypotethical company "DXG" built using ReactJs + Vite. Employees are able to record their attendance by providing a proof image when doing their work at home in one specific day.

The app also provides an admin panel for HRD admins to view employee's data, update or delete them, as well as checking their WFH attendance history (view-only). An admin can also register a new employee into the system.

The deployed version of the app can found in the following url:
https://dxg-attendance-fe.vercel.app

The admin account is pre-seeded. You can use these credentials to login as admin, create the employee accounts and explore the app however you like.

```
Email: admin@mail.com
Pass : Admin_123
```

## How to run locally

First, you need to setup the backend & database by following the instructions in this back-end repository https://github.com/Raff-28/DXG-Attendance_BE

Then, create a .env configuration file by following the format in .env.example file (you can also modify them depending on which ports you ran the services at).

```
VITE_AUTH_BASE_URL=http://localhost:4001
VITE_EMPLOYEE_BASE_URL=http://localhost:4002
VITE_ATTENDANCE_BASE_URL=http://localhost:4003
```

After that, install dependencies.

```
npm install
```

Finally, build and run the app

```
npm run build
npm run preview
```

Or run it in development server

```
npm run dev
```
