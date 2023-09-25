
<div align='center'>
    <h1><b>Wishlingo</b></h1>
    <p>A simple software to Chat with Friends and also in Groups.</p>
</div>
<div align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/wishchatprog2.appspot.com/o/Images%2FMinimalist%20Black%20Beige%20Typography%20Fashion%20Business%20Logo.png?alt=media&token=6c68995f-4485-4955-bea6-6c3d12b0091f" alt="Description of the Image" style="width: 300px; border-radius: 10px;">

</div>

---

## About

WishChat is a simple Chat app where the user is able to send and recive messages form Single People or even groups. In adition the user can send a image attached to the Messages. Do finish later

## Example




### local installation:

1. clone the repo

```
git clone https://github.com/David21092/WishChat/tree/dev
```

2. cd into cloned repo

```
cd wishchat
```
```
cd .\Client\wishchat\
```
3. install dependencies

```
npm install
```

```
npm install react-router-dom
```

```
npm install firebase 
```

```
npm install @firebase/app
```

```
npm install react-icons/fa
```

4. Create Firebase DB

Due to the fact that you cant use my firebase realtime DB because i would have to give out my Tokens, you need to create your own one and just simply connect it with the app. This File should be called "firebaseConfig.jsx", its located in the src folder and should look something like this: 

<br/>import { initializeApp } from "firebase/app";
<br/>import { getAuth } from 'firebase/auth'
<br/>
<br/>const firebaseConfig = {
<br/>  apiKey: "YOUR_TEMP_API_KEY",
<br/>  authDomain: "YOUR_TEMP_AUTH_DOMAIN",
<br/>  databaseURL: "YOUR_TEMP_DATABASE_URL",
<br/>  projectId: "YOUR_TEMP_PROJECT_ID",
<br/>  storageBucket: "YOUR_TEMP_STORAGE_BUCKET",
<br/>  messagingSenderId: "YOUR_TEMP_MESSAGING_SENDER_ID",
<br/>  appId: "YOUR_TEMP_APP_ID"
<br/>};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


5. run the app

```
npm run start
```

<br />

<br />
---

## 💻 **TECHNOLOGIES**

[<div align="center"><img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" /></div>](#)
[<div align="center"><img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" /></div>](#)
[<div align="center"><img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" /></div>](#)
[<div align="center"><img alt="NPM" src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" /></div>](#)
[<div align="center"><img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" /></div>](#)
[<div align="center"><img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" /></div>](#)
[<div align="center"><img alt="Firebase" src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" /></div>](#)

<br />

---

## 📎 **LICENSE**

This project is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

### You are free to:

- **Share**: Copy and redistribute the material in any medium or format.
- **Adapt**: Remix, transform, and build upon the material for any purpose, even commercially.

The licensor cannot revoke these freedoms as long as you follow the license terms.

### Under the following terms:

- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

No additional restrictions: You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

#### Attribution Information:

When using this work, please provide the following attribution:

"Whishlingo" by David21092 is licensed under CC BY 4.0. To view a copy of this license, visit [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).


<br />

---

## 📌 **LINKS**

[<img alt="Github" src="https://img.shields.io/badge/David21092-%23181717.svg?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/David21092)

>>>>>>> dev
