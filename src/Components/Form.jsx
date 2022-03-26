import React from "react";

export default function Form({ submitHandler }) {
  return (
    <div id="form">
      <h1>Employees Form</h1>
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="name">Enter Your Name:</label>
        <input type="text" id="name" required />
        <label htmlFor="email">Enter Your Email:</label>
        <input type="email" id="email" required />
        <label htmlFor="gender">Enter Your Gender:</label>
        <input type="text" id="gender" required />
        <label htmlFor="roll">Enter Your Roll:</label>
        <input type="text" id="roll" required />
        <label htmlFor="department">Enter Your Department:</label>
        <input type="text" id="department" required />
        <label htmlFor="salary">Enter Your Salary:</label>
        <input type="text" id="salary" required />
        <button>Submit</button>
      </form>
    </div>
  );
}
