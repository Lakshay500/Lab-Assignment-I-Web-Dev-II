import {useState, useEffect} from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";
import "./App.css";

function App(){
  const defaultData = [
    {id: 1, name: "Lakshay", score: 85},
    {id: 2, name: "Samit", score: 90},
  ];

  const [students, setStudents] = useState(defaultData);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved){
      setStudents(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (name, score) => {
    const trimmedName = name.trim();

    if (!trimmedName){
      alert("Name cannot be empty");
      return;
    }

    if (score < 0 || score > 100) {
      alert("Score must be between 0 and 100");
      return;
    }

    const exists = students.some(
      (s) => s.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (exists) {
      alert("Student already exists");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: trimmedName,
      score,
    };

    setStudents((prev) => [...prev, newStudent]);
  };

  const updateScore = (id, newScore) => {
    if (newScore < 0 || newScore > 100) return;

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, score: newScore}
          : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const resetData = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all Data?"
    );

    if (!confirmReset) return;

    localStorage.removeItem("students");
    setStudents(defaultData);
  };

  const filteredStudents = students.filter((s) => {
    if (filter === "pass") return s.score >= 40;
    if (filter === "fail") return s.score < 40;
    return true;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === "asc") return a.score - b.score;
    if (sortOrder === "desc") return b.score - a.score;
    return 0;
  });

  return (
    <div className="container">
      <Header/>

      <AddStudentForm addStudent={addStudent}/>

      <div className="controls">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pass")}>Pass</button>
        <button onClick={() => setFilter("fail")}>Fail</button>

        <button onClick={() => setSortOrder("asc")}>Sort ↑</button>
        <button onClick={() => setSortOrder("desc")}>Sort ↓</button>

        <button onClick={resetData}>Reset</button>
      </div>

      <StudentTable
        students={sortedStudents}
        updateScore={updateScore}
        deleteStudent={deleteStudent}
      />
    </div>
  );
}

export default App;
