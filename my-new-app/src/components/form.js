import React, { useRef, useState } from "react";

export default function Form() {
  const nameRef = useRef(null);
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(nameRef.current.value); // Get the value from the input
    nameRef.current.value = ""; // Clear the input
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={nameRef}
          placeholder="Enter your name"
          style={{ padding: "10px", fontSize: "16px", width: "200px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {submittedName && (
        <p style={{ marginTop: "20px" }}>You submitted: {submittedName}</p>
      )}
    </div>
  );
}
