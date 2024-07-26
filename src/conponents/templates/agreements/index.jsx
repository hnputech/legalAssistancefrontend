// import React, { useState } from "react";
// import { PurchaseForm } from "./GoodsPurchase";
// import { TemplateEditor } from "../../editer";
// import { Box, Grid } from "@mui/material";
// import { EmploymentAgreement } from "./EmploymentAgreement";
// import { LeaseAgreement } from "./Lease";
// import { LoanAgreement } from "./Loan";
// import { NDA } from "./NDA";
// import { Partnership } from "./Partnership";
// import { RentAgreement } from "./Rent";
// import { Patent } from "../applications/Patent";
// import { Trademark } from "../applications/Trademark";
// import { Demand } from "../letters/Demand";
// import { OfferLetter } from "../letters/Offer";
// import { useParams, useNavigate } from "react-router-dom";
// import { useIsMobile } from "../../../hooks/useIsMobile";

// const templatFormObj = {
//   partnershipagreement: Partnership,
//   nondisclosureagreementnda: NDA,
//   employmentcontract: EmploymentAgreement,
//   leaseagreement: LeaseAgreement,
//   purchaseandsellagreement: PurchaseForm,
//   rentalagreement: RentAgreement,
//   loanagreement: LoanAgreement,
//   offerletter: OfferLetter,
//   demandletter: Demand,
//   patentapplication: Patent,
//   trademarkapplication: Trademark,
// };

// const SellPurchase = () => {
//   let { templateId } = useParams();
//   const [content, setContent] = useState("");
//   const isMobile = useIsMobile();

//   return (
//     <Grid
//       sx={{
//         overflow: "auto",
//         // height: "100vh",
//         height: isMobile ? "100vh" : "calc(100vh - 64px)",
//       }}
//       container
//     >
//       <Grid item xs={12} md={3}>
//         {React.createElement(templatFormObj[templateId], {
//           setContent: setContent,
//         })}
//       </Grid>
//       <Grid item xs={12} md={8} style={{ padding: "20px" }}>
//         <TemplateEditor content={content} setContent={setContent} />
//       </Grid>
//     </Grid>
//   );
// };

// export default SellPurchase;

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
