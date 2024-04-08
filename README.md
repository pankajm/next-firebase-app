This is a [Next.js v14](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone the app using following command

```bash
git clone https://github.com/pankajm/next-firebase-app.git
```

then go to next-firebase-app directory and install necessary dependencies using following command

```bash
npm i
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. (The port may differ depending on current processes)

# UI Interaction

You can see 3 tabs in Top Nav - Home, Profile and About. Home and About tabs are publicly accesible. Profile tab however needs authentication. Click on signin at the top right corner to authenticate using Google Auth Provider. Once logged in you can see your name, email and profile picture (public data) from Google.

# Implementation Details 

## Firebase Project Set up

- Go to the Firebase Console (https://console.firebase.google.com/).
- Create a new project or select an existing one.
- Go to Project Settings and note down your Firebase configuration (apiKey, authDomain, projectId, etc.).

## Install Firebase SDK and Dependencies

```bash
npm install firebase
```

## Firebase configuration in Next.js

firebase is configured and initialize in firebase.js file in app directory.

## Authentication UI Implementation

Navbar has login, home, about, profile link. User must signin to see profile details. Tailwind's utility classes and DaisyUI components (Based on tailwind) are used for styling.

## User Session Management

- React Context api is being used to manage authentication state globally -  see AuthContext.js for more details.
- User session is managed using default JWT (inside user object) returned from firebase authentication.
- Firebase Auth's onAuthStateChanged method is used to listen for changes in authentication state and update the user's session accordingly.

## Session Functionalities

- ### User Idle :

Logout the user after 30 minutes of inactivity, this time can be configured from constants.js. This has been achived using react idle timer library to get idle time.

- ### Session Expiry :

Expire user session after 1hr of continuous usage - Using SetTimeoOut

- ### Refresh Token :

Token will be refreshed after every 5 minutes. This is achieved using Firebase api -
currentUser.getIdToken(true) // force refresh action

## Display User Account Details

- After a successful signin, fetch the user's account details using Firebase Auth's currentUser object.
- Display the user's account details on profile page, Details include profile picture, name and email.

## Error Logging

- For assignment purpose erros have been logged on console however in ideal scenario error handling should be done in remote logging service like sentry in order to debug real time issues being faced by end users.
