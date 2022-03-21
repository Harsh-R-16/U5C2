import React from "react";

export default function Div({
  name,
  email,
  gender,
  roll,
  department,
  salary,
  index,
}) {
  return (
    <div key={index}>
      <p>
        <span>Name: </span>
        {name}
      </p>
      <p>
        <span>Email: </span>
        {email}
      </p>
      <p>
        <span>Gender: </span>
        {gender}
      </p>
      <p>
        <span>Roll: </span>
        {roll}
      </p>
      <p>
        <span className="dept">Department:</span> {department}
      </p>
      <p>
        <span>Salary: </span>
        {salary}$
      </p>
    </div>
  );
}
