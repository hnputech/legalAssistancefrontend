import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { StyledPaginationTable } from "./StyledPaginationTable";
import { getUserTemplatesData } from "../../requests/template";

export const AllGeneratedTemplate = () => {
  const [tableData, setTableDta] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserTemplatesData(userId);
      console.log("res", res);
      setTableDta(res);
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);
  console.log("======userid", userId);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        marginTop: "40px",
        padding: "20px",
      }}
    >
      <StyledPaginationTable data={tableData} />
    </div>
  );
};

// const data = [
//   { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//   {
//     name: "Ice cream sandwich",
//     calories: 237,
//     fat: 9.0,
//     carbs: 37,
//     protein: 4.3,
//   },
//   { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//   { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//   { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
//   {
//     name: "Ice cream sandwich",
//     calories: 237,
//     fat: 9.0,
//     carbs: 37,
//     protein: 4.3,
//   },
//   { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
// ];
