import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const LoanAgreement = ({ setContent }) => {
  let { templateId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const cardInfo = searchdaata.find((item) => item.id === templateId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3001/templateGenerator/${templateId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedChunk = decoder.decode(value, { stream: true });

        setContent((prevContent) => prevContent + decodedChunk);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  return (
    <Card>
      <CardContent>
        {isMobile ? (
          <ArrowBackIcon onClick={() => navigate("/template")} />
        ) : null}
        <Typography
          variant="h6"
          sx={{ marginTop: "5px", fontWeight: "bold" }}
          gutterBottom
        >
          {cardInfo.title}
        </Typography>

        <Typography variant="body2">{cardInfo.description}.</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}
        >
          <Controller
            name="lenderName"
            control={control}
            defaultValue=""
            rules={{ required: "Lender Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lender Name"
                variant="outlined"
                error={!!errors.lenderName}
                helperText={errors.lenderName ? errors.lenderName.message : ""}
              />
            )}
          />
          <Controller
            name="lendersAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Lenders Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lenders Address"
                variant="outlined"
                error={!!errors.lenderName}
                helperText={errors.lenderName ? errors.lenderName.message : ""}
              />
            )}
          />

          <Controller
            name="borrowerName"
            control={control}
            defaultValue=""
            rules={{ required: "Borrower Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Borrower Name"
                variant="outlined"
                error={!!errors.borrowerName}
                helperText={
                  errors.borrowerName ? errors.borrowerName.message : ""
                }
              />
            )}
          />
          <Controller
            name="borrowerAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Borrower Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Borrower Address"
                variant="outlined"
                error={!!errors.lenderName}
                helperText={errors.lenderName ? errors.lenderName.message : ""}
              />
            )}
          />

          <Controller
            name="loanAmount"
            control={control}
            defaultValue=""
            rules={{ required: "Loan Amount is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Loan Amount"
                variant="outlined"
                error={!!errors.loanAmount}
                helperText={errors.loanAmount ? errors.loanAmount.message : ""}
              />
            )}
          />

          <Controller
            name="interestRate"
            control={control}
            defaultValue=""
            rules={{ required: "Interest Rate is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Interest Rate"
                variant="outlined"
                error={!!errors.interestRate}
                helperText={
                  errors.interestRate ? errors.interestRate.message : ""
                }
              />
            )}
          />

          <Controller
            name="loanGivenDate"
            control={control}
            defaultValue=""
            rules={{ required: "Loan Given Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Loan Given Date"
                variant="outlined"
                error={!!errors.loanGivenDate}
                helperText={
                  errors.loanGivenDate ? errors.loanGivenDate.message : ""
                }
              />
            )}
          />

          <Controller
            name="loanReturningDate"
            control={control}
            defaultValue=""
            rules={{ required: "Loan Returning Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Loan Returning Date"
                variant="outlined"
                error={!!errors.loanReturningDate}
                helperText={
                  errors.loanReturningDate
                    ? errors.loanReturningDate.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="latePaymentPenalties"
            control={control}
            defaultValue=""
            rules={{ required: "Late Payment Penalties are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Late Payment Penalties"
                variant="outlined"
                error={!!errors.latePaymentPenalties}
                helperText={
                  errors.latePaymentPenalties
                    ? errors.latePaymentPenalties.message
                    : ""
                }
              />
            )}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
