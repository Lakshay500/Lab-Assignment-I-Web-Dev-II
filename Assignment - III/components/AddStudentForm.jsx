import { useState } from "react";

function AddStudentForm({ addStudent }){
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    if (score === "" || isNaN(score)){
      alert("Enter a valid score");
      return;
    }

    addStudent(name, Number(score));

    setName("");
    setScore("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;