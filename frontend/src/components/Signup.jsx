import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const SERVER_URL = config.SERVER_URL;

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    const data = {
      username: name,
      rollno: rollno,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${SERVER_URL}/signup`, data);
      if (res.status === 201) {
        alert("Successfully registered, proceed to login!");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Email already exists. Please use a different email.");
      } else {
        alert("An error occurred during signup. Please try again.");
        console.error("Signup error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div
        style={styles.backIcon}
        onClick={() => navigate("/")}
        title="Go Back"
      >
        <FiArrowLeft size={24} />
      </div>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSignUp}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Roll No</label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollNo(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f0f4f8, #e1f5fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "2rem",
  },
  backIcon: {
    position: "absolute",
    top: 30,
    left: 30,
    cursor: "pointer",
    color: "#555",
    transition: "transform 0.2s ease",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "50px 40px",
    borderRadius: "14px",
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#3f51b5",
    marginBottom: "30px",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
    outline: "none",
    transition: "border 0.3s",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "17px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
};

export default Signup;
