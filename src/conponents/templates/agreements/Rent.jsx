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

export const RentAgreement = ({
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
      startDate: moment(),
      endDate: moment(),
    },
  });

  const onSubmit = async (data) => {
    if (data.startDate) {
      data.startDate = moment(data.startDate).format("MM/DD/YYYY");
    }
    if (data.endDate) {
      data.endDate = moment(data.endDate).format("MM/DD/YYYY");
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
            "testing123"
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
            name="landlordName"
            control={control}
            defaultValue=""
            rules={{ required: "Landlord Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Landlord Name"
                variant="outlined"
                error={!!errors.landlordName}
                helperText={
                  errors.landlordName ? errors.landlordName.message : ""
                }
              />
            )}
          />

          <Controller
            name="tenantName"
            control={control}
            defaultValue=""
            rules={{ required: "Tenant Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tenant Name"
                variant="outlined"
                error={!!errors.tenantName}
                helperText={errors.tenantName ? errors.tenantName.message : ""}
              />
            )}
          />

          <Controller
            name="propertyAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Property Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property Address"
                variant="outlined"
                error={!!errors.propertyAddress}
                helperText={
                  errors.propertyAddress ? errors.propertyAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="rentalTerm"
            control={control}
            defaultValue=""
            rules={{ required: "Rental Term is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rental Term"
                variant="outlined"
                error={!!errors.rentalTerm}
                helperText={errors.rentalTerm ? errors.rentalTerm.message : ""}
              />
            )}
          />

          <Controller
            name="monthlyRent"
            control={control}
            defaultValue=""
            rules={{ required: "Monthly Rent is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monthly Rent"
                variant="outlined"
                error={!!errors.monthlyRent}
                helperText={
                  errors.monthlyRent ? errors.monthlyRent.message : ""
                }
              />
            )}
          />

          <Controller
            name="securityDeposit"
            control={control}
            defaultValue=""
            rules={{ required: "Security Deposit is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Security Deposit"
                variant="outlined"
                error={!!errors.securityDeposit}
                helperText={
                  errors.securityDeposit ? errors.securityDeposit.message : ""
                }
              />
            )}
          />

          <Controller
            name="startDate"
            control={control}
            rules={{ required: "startDate is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  {...field}
                  label="Select startDate"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={!!errors.startDate}
                      helperText={
                        errors.startDate ? errors.startDate.message : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{ required: "endDate is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  {...field}
                  label="Select endDate"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={!!errors.endDate}
                      helperText={errors.endDate ? errors.endDate.message : ""}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="maintenanceResponsibilities"
            control={control}
            defaultValue=""
            rules={{ required: "Maintenance Responsibilities are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Maintenance Responsibilities"
                variant="outlined"
                error={!!errors.maintenanceResponsibilities}
                helperText={
                  errors.maintenanceResponsibilities
                    ? errors.maintenanceResponsibilities.message
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
