import "./index.css";
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();

  document.title = "Sustainability Simplified";

  const onSubmit = (data) => {
    console.log(data);
    // db.collection("forms").add({
    //   waterUsage: data.waterUsage,
    //   energyUsage: data.energyUsage,
    //   email: data.email
    // });
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
