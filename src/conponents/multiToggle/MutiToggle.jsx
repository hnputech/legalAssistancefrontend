// MultiToggle.js
import React, { useState } from "react";
import "./MultiToggle.css";

const toggleOptionsDefault = [
  { value: "gpt-4o", label: " 4o" },
  { value: "gpt-4o-mini", label: "4o mini" },
  { value: "gpt-3.5-turbo", label: "3.5 turbo" },
];

const MultiToggle = ({
  active,
  setActive,
  toggleOptions = toggleOptionsDefault,
}) => {
  // const [active, setActive] = useState("gpt3");

  const handleToggle = async (value) => {
    setActive(value);

    // try {
    //   const response = await fetch(
    //     `https://your-backend-api.com/endpoint?model=${value}`
    //   );
    //   const data = await response.json();
    //   console.log(data); // Handle the API response data as needed
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  return (
    <div
      className="toggle-button-group"
      role="group"
      aria-label="Model selection"
    >
      {toggleOptions.map((option) => (
        <button
          key={option.value}
          className={`toggle-button ${active === option.value ? "active" : ""}`}
          onClick={() => handleToggle(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MultiToggle;
