import StudentRow from "./StudentRow";

function StudentTable({ students, updateScore, deleteStudent }) {
  if (students.length === 0) {
    return <p>No students available</p>;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            updateScore={updateScore}
            deleteStudent={deleteStudent}
          />
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;