import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// Define proLIst outside the component
const proLIst = [
  "Draft a prenuptial agreement for engaged couples who want to protect their assets",
  "Create a child custody agreement for divorcing parents",
  "Write a postnuptial agreement for spouses who want to modify their marital property rights",
  "What should be included in a marital settlement agreement?",
  "Draft a memorandum of understanding for a joint venture between two companies",
  "Draft a motion to suppress evidence for an illegal search and seizure case",
  "Provide a template for a criminal defense opening statement",
  "How do I file for divorce and what are the requirements?",
  "Write a workplace harassment policy for a small business.",
  "Draft a settlement agreement for a car accident case involving multiple parties",
];

export const PromptList = ({ handleTyping }) => {
  const handleListItemClick = (e, prompt) => {
    handleTyping(prompt);
  };

  // Simplify the return to check for issues
  return (
    <List aria-label="secondary mailbox folder" disablePadding>
      {proLIst.map((item) => {
        return (
          <ListItemButton
            onClick={(event) => handleListItemClick(event, item)}
            key={item}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        );
      })}
    </List>
  );
};
