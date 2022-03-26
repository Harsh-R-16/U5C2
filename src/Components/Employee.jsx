import { useState, useEffect } from "react";
import Div from "./Div";
import Buttons from "./Buttons";
import Form from "./Form";
import { data } from "./data";
let sortList = ["All", "Marketing", "HR", "IT", "Finance", "asc", "desc"];

export default function Employee() {
  let [emp, setEmp] = useState([]);
  useEffect(() => {
    fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.length < 20) delAll();
        else fetchData();
      });
  }, []);

  function delAll() {
    console.log("Harsh");
    for (let i = 1; i <= 20; i++) {
      fetch(`https://json-server-mocker-masai.herokuapp.com/tasks/${i}`, {
        method: "DELETE",
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((e) => {
          // console.log(e);
        })
        .finally(() => {
          addAll(0);
        });
    }
  }
  function addAll(i) {
    const options = {
      method: "POST",
      body: JSON.stringify(data[i]),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://json-server-mocker-masai.herokuapp.com/tasks", options)
      .then((res) => res.json())
      .then((res) => {
        //   console.log(res);
        if (i < 22) addAll(i + 1);
      })
      .finally(() => {
        fetchData();
      });
  }
  function fetchData() {
    fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
      .then((res) => res.json())
      .then((res) => {
        setEmp(res);
      });
  }
  const sortHandler = ({ target: { id: q } }) => {
    // console.log(typeof q);
    if (+q === 0) fetchData();
    else if (+q > 0 && +q < 5) {
      fetchByDepartment(sortList[+q]);
    } else {
      sorting(sortList[+q]);
    }
  };
  const sorting = (q) => {
    console.log(q);
    fetch(`https://json-server-mocker-masai.herokuapp.com/tasks?_sort=salary`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (q === "asc") setEmp(res);
        else {
          let newArr = [...res].reverse();
          setEmp(newArr);
        }
      });
  };
  const fetchByDepartment = (q) => {
    fetch(
      `https://json-server-mocker-masai.herokuapp.com/tasks?department=${q}`
    )
      .then((res) => res.json())
      .then((res) => {
        setEmp(res);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let name = e.target.elements[0].value;
    let email = e.target.elements[1].value;
    let gender = e.target.elements[2].value;
    let roll = e.target.elements[3].value;
    let department = e.target.elements[4].value;
    let salary = +e.target.elements[5].value;
    const params = { name, email, gender, roll, department, salary };
    // console.log(JSON.stringify(params));
    for (let i = 0; i < 6; i++) e.target.elements[i].value = "";
    const options = {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://json-server-mocker-masai.herokuapp.com/tasks", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchData();
      });
  };
  return (
    <>
      <Form submitHandler={submitHandler} />
      <div id="sort" onClick={sortHandler}>
        <Buttons />
      </div>
      <section>
        {emp.map((i) => (
          <Div {...i} />
        ))}
      </section>
    </>
  );
}
