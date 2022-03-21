import { useState, useEffect } from "react";
import Div from "./Div";
import Buttons from "./Buttons";
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
    let salary = +e.target.elements[5].value;
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
      <div id="sort" onClick={sortHandler} key="harsh">
        <Buttons />
      </div>
      <section>
        {emp.map((i, index) => (
          <Div {...i} Key={index} />
        ))}
      </section>
    </>
  );
}
