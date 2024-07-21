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

const Patent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card
      sx={
        {
          // width: "40%",
          // maxWidth: "400px",
        }
      }
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ marginTop: "5px", fontWeight: "bold" }}
          gutterBottom
        >
          {"title"}
        </Typography>

        <Typography variant="body2">{"description"}.</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}
        >
          <Controller
            name="applicantName"
            control={control}
            defaultValue=""
            rules={{ required: "Applicant Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Applicant Name"
                variant="outlined"
                error={!!errors.applicantName}
                helperText={
                  errors.applicantName ? errors.applicantName.message : ""
                }
              />
            )}
          />

          <Controller
            name="applicantAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Applicant Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Applicant Address"
                variant="outlined"
                error={!!errors.applicantAddress}
                helperText={
                  errors.applicantAddress ? errors.applicantAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="inventionTitle"
            control={control}
            defaultValue=""
            rules={{ required: "Invention Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Invention Title"
                variant="outlined"
                error={!!errors.inventionTitle}
                helperText={
                  errors.inventionTitle ? errors.inventionTitle.message : ""
                }
              />
            )}
          />

          <Controller
            name="inventorNames"
            control={control}
            defaultValue=""
            rules={{ required: "Inventor Names are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inventor Names"
                variant="outlined"
                error={!!errors.inventorNames}
                helperText={
                  errors.inventorNames ? errors.inventorNames.message : ""
                }
              />
            )}
          />

          <Controller
            name="inventionDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Invention Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Invention Description"
                variant="outlined"
                error={!!errors.inventionDescription}
                helperText={
                  errors.inventionDescription
                    ? errors.inventionDescription.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="fieldOfInvention"
            control={control}
            defaultValue=""
            rules={{ required: "Field of Invention is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Field of Invention"
                variant="outlined"
                error={!!errors.fieldOfInvention}
                helperText={
                  errors.fieldOfInvention ? errors.fieldOfInvention.message : ""
                }
              />
            )}
          />

          <Controller
            name="backgroundOfInvention"
            control={control}
            defaultValue=""
            rules={{ required: "Background of Invention is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Background of Invention"
                variant="outlined"
                error={!!errors.backgroundOfInvention}
                helperText={
                  errors.backgroundOfInvention
                    ? errors.backgroundOfInvention.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="summaryOfInvention"
            control={control}
            defaultValue=""
            rules={{ required: "Summary of Invention is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Summary of Invention"
                variant="outlined"
                error={!!errors.summaryOfInvention}
                helperText={
                  errors.summaryOfInvention
                    ? errors.summaryOfInvention.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="detailedDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Detailed Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Detailed Description"
                variant="outlined"
                error={!!errors.detailedDescription}
                helperText={
                  errors.detailedDescription
                    ? errors.detailedDescription.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="claims"
            control={control}
            defaultValue=""
            rules={{ required: "Claims are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Claims"
                variant="outlined"
                error={!!errors.claims}
                helperText={errors.claims ? errors.claims.message : ""}
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="filingDate"
            control={control}
            defaultValue=""
            rules={{ required: "Filing Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Filing Date"
                variant="outlined"
                error={!!errors.filingDate}
                helperText={errors.filingDate ? errors.filingDate.message : ""}
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

export default Patent;
