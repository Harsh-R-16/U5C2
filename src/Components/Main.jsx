import { useState, useEffect } from "react";
let resArr;
let sortList = ["All", "Marketing", "HR", "IT", "Finance", "Asce", "Desc"];
export default function Main() {
  let [emp, setEmp] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("data")) {
      resArr = JSON.parse(localStorage.getItem("data"));
      setEmp(JSON.parse(localStorage.getItem("data")));
    } else {
      fetch("http://localhost:3000/employees")
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          resArr = res;
          localStorage.setItem("data", JSON.stringify(resArr));
          setEmp(res);
        });
    }
  }, []);
  function sortHandler(e) {
    let num = +e.target.id;
    let d = sortList[num];
    console.log(d);
    if (num === 0) {
      setEmp(resArr);
      return;
    } else if (num === 5) {
      fetch("http://localhost:3000/employees?_sort=salary")
        .then((res) => res.json())
        .then((r) => {
          console.log(r);
          setEmp(r);
        });
      return;
    } else if (num === 6) {
      fetch("http://localhost:3000/employees?_sort=salary&_order=desc")
        .then((res) => res.json())
        .then((r) => {
          console.log(r);
          setEmp(r);
        });
      return;
    }
    setEmp(resArr.filter(({ department }) => department === d));
    console.log(emp);
  }
  function smtHandler(e) {
    e.preventDefault();
    let name = e.target.elements[0].value;
    let email = e.target.elements[1].value;
    let gender = e.target.elements[2].value;
    let roll = e.target.elements[3].value;
    let department = e.target.elements[4].value;
    let salary = e.target.elements[5].value;
    let data = JSON.parse(localStorage.getItem("data"));
    data.push({ name, email, gender, roll, department, salary });
    localStorage.setItem("data", JSON.stringify(data));
    window.location.reload();
    setEmp(data);
    // console.log(emp);
  }
  return (
    <>
      <div id="form">
        <h1>Employees Form</h1>
        <form action="" onSubmit={smtHandler}>
          <label htmlFor="name">Enter Your Name:</label>
          <input type="text" id="name" />
          <label htmlFor="email">Enter Your Email:</label>
          <input type="email" id="email" />
          <label htmlFor="gender">Enter Your Gender:</label>
          <input type="text" id="gender" />
          <label htmlFor="roll">Enter Your Roll:</label>
          <input type="text" id="roll" />
          <label htmlFor="department">Enter Your Department:</label>
          <input type="text" id="department" required />
          <label htmlFor="salary">Enter Your Salary:</label>
          <input type="text" id="salary" />
          <button>Submit</button>
        </form>
      </div>
      <div id="sort" onClick={sortHandler}>
        <button id="0">Show All Departments</button>
        <button id="1">Show Marketing</button>
        <button id="2">Show HR</button>
        <button id="3">Show IT</button>
        <button id="4">Show Finance</button>
        <button id="5">Sort By Salary Ascending</button>
        <button id="6">Sort By Salary Descending</button>
      </div>
      <section>
        {emp.map(({ name, email, gender, roll, department, salary }, index) => (
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
        ))}
      </section>
    </>
  );
}
