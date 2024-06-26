import { useEffect } from "react";

const useKeyboardAwareFocus = (ref) => {
  useEffect(() => {
    const inputElement = ref.current;

    if (inputElement) {
      const handleFocus = () => {
        setTimeout(() => {
          inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200); // Timeout duration may need tweaking depending on behavior
      };

      inputElement.addEventListener("focus", handleFocus);

      return () => {
        inputElement.removeEventListener("focus", handleFocus);
      };
    }
  }, [ref]);
};

export default useKeyboardAwareFocus;
