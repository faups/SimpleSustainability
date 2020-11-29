import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/firestore";

export default function App() {
  const { register, handleSubmit } = useForm();

  const config = {
    apiKey: "AIzaSyD__P-Qqh4J3U337Nr_G5oQjeGCsC2H93M",
    authDomain: "simple-sustainability.firebaseapp.com",
    databaseURL: "https://simple-sustainability.firebaseio.com",
    projectId: "simple-sustainability",
    storageBucket: "simple-sustainability.appspot.com",
    messagingSenderId: "382171174450",
    appId: "1:382171174450:web:324f2134da1be6bc9e0e2b",
    measurementId: "G-LTW5YQ2G3E"
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
