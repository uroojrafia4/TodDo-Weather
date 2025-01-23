import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Weather from "./components/Weather";
import TodoApp from "./components/Todo copy";
import Form from "./components/form";
import logo from "./logo.svg";

function App() {
  return (
    <Router basename="/TodDo-Weather">
      <div className="App">
        {/* Navigation bar */}
        <nav style={styles.nav}>
          <img src={logo} alt="logo" style={styles.logo} />
          <ul style={styles.navList}>
            <li>
              <Link to="/" style={styles.link}>
                Weather
              </Link>
            </li>
            <li>
              <Link to="/Todo copy" style={styles.link}>
                Todo
              </Link>
            </li>
            <li>
              <Link to="/form" style={styles.link}>
                Form
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes for navigation */}
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/Todo copy" element={<TodoApp />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

// Inline styles for the navigation bar
const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  logo: {
    height: "50px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default App;
