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
  const handleToggle = async (value) => {
    setActive(value);
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
