import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/firestore";

export default function App() {
  const { register, handleSubmit } = useForm();

  document.title = "Sustainability Simplified";

  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  var db = firebase.firestore();

  const onSubmit = (data) => {
    console.log(data);
    db.collection("forms").add({
      waterUsage: data.waterUsage,
      energyUsage: data.energyUsage,
      email: data.email
    });
  }

  return (
    <div className="App">
      <title>Simple Sustainability</title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="waterUsage">Water Usage (Gallons)</label>
          <input name="waterUsage" placeholder="49" ref={register} />
        </div>

        <div>
          <label htmlFor="energyUsage">Energy Usage (kWh)</label>
          <input name="energyUsage" placeholder="909" ref={register} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="simplesustainability@gmail.com"
            type="email"
            ref={register}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
