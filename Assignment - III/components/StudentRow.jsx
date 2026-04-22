function StudentRow({ student, updateScore, deleteStudent }) {
  const status = student.score >= 40 ? "Pass" : "Fail";

  return (
    <tr>
      <td>{student.name}</td>

      <td>
        <input
          type="number"
          value={student.score}
          min="0"
          max="100"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && value <= 100) {
              updateScore(student.id, value);
            }
          }}
        />
      </td>

      <td className={status === "Pass" ? "pass" : "fail"}>
        {status}
      </td>

      <td>
        <button onClick={() => deleteStudent(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;