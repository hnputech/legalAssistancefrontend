import { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";
import { addTemplateDocuments } from "../../../requests/template";

export const LoanAgreement = ({
  setContent,
  content,
  documentName,
  setDocumentId,
}) => {
  const [active, setActive] = useState("gpt-4o");
  const [isLoading, setIsLoading] = useState(false);

  let { templateId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const cardInfo = searchdaata.find((item) => item.id === templateId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loanGivenDate: moment(),
      loanReturningDate: moment(),
    },
  });

  const onSubmit = async (data) => {
    if (data.loanGivenDate) {
      data.loanGivenDate = moment(data.loanGivenDate).format("MM/DD/YYYY");
    }
    if (data.loanReturningDate) {
      data.loanReturningDate = moment(data.loanReturningDate).format(
        "MM/DD/YYYY"
      );
    }
    console.log("=====data", data);
    setIsLoading(true);
    if (content !== "") setContent("");

    try {
      const response = await fetch(
        `https://legalbackend-aondtyyl6a-uc.a.run.app/templateGenerator/${templateId}`,
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

      setIsLoading(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = ""; // Local variable to accumulate content

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("in in loop");
          const documentid = uuidv4();
          setDocumentId(documentid);

          // const name = "new document";
          const words = accumulatedContent.trim().split(/\s+/).length;
          await addTemplateDocuments(
            documentid,
            documentName,
            templateId,
            words,
            accumulatedContent,
            `${localStorage.getItem("email")}-${active}`
            // "testing123"
          );
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        accumulatedContent += decodedChunk;
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
        <Box sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}>
          <MultiToggle active={active} setActive={setActive} />
        </Box>
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
            rules={{ required: "loanGivenDate is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  {...field}
                  label="Select loanGivenDate"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={!!errors.loanGivenDate}
                      helperText={
                        errors.loanGivenDate ? errors.loanGivenDate.message : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="loanReturningDate"
            control={control}
            rules={{ required: "loanReturningDate is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  {...field}
                  label="Select loanReturningDate"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
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
              </LocalizationProvider>
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

          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            sx={{
              width: "90% !important",
            }}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
