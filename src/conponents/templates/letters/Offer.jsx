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

const OfferLetter = () => {
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
            name="companyName"
            control={control}
            defaultValue=""
            rules={{ required: "Company Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                variant="outlined"
                error={!!errors.companyName}
                helperText={
                  errors.companyName ? errors.companyName.message : ""
                }
              />
            )}
          />

          <Controller
            name="companyAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Company Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Address"
                variant="outlined"
                error={!!errors.companyAddress}
                helperText={
                  errors.companyAddress ? errors.companyAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="candidateName"
            control={control}
            defaultValue=""
            rules={{ required: "Candidate Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Candidate Name"
                variant="outlined"
                error={!!errors.candidateName}
                helperText={
                  errors.candidateName ? errors.candidateName.message : ""
                }
              />
            )}
          />

          <Controller
            name="jobTitle"
            control={control}
            defaultValue=""
            rules={{ required: "Job Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Job Title"
                variant="outlined"
                error={!!errors.jobTitle}
                helperText={errors.jobTitle ? errors.jobTitle.message : ""}
              />
            )}
          />

          <Controller
            name="jobDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Job Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Job Description"
                variant="outlined"
                error={!!errors.jobDescription}
                helperText={
                  errors.jobDescription ? errors.jobDescription.message : ""
                }
              />
            )}
          />

          <Controller
            name="startDate"
            control={control}
            defaultValue=""
            rules={{ required: "Start Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                variant="outlined"
                error={!!errors.startDate}
                helperText={errors.startDate ? errors.startDate.message : ""}
              />
            )}
          />

          <Controller
            name="salary"
            control={control}
            defaultValue=""
            rules={{ required: "Salary is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Salary"
                variant="outlined"
                error={!!errors.salary}
                helperText={errors.salary ? errors.salary.message : ""}
              />
            )}
          />

          <Controller
            name="employmentType"
            control={control}
            defaultValue=""
            rules={{ required: "Employment Type is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Employment Type (e.g., full-time, part-time, contract)"
                variant="outlined"
                error={!!errors.employmentType}
                helperText={
                  errors.employmentType ? errors.employmentType.message : ""
                }
              />
            )}
          />

          <Controller
            name="benefits"
            control={control}
            defaultValue=""
            rules={{ required: "Benefits are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Benefits"
                variant="outlined"
                error={!!errors.benefits}
                helperText={errors.benefits ? errors.benefits.message : ""}
              />
            )}
          />

          <Controller
            name="acceptanceDeadline"
            control={control}
            defaultValue=""
            rules={{ required: "Acceptance Deadline is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Acceptance Deadline"
                variant="outlined"
                error={!!errors.acceptanceDeadline}
                helperText={
                  errors.acceptanceDeadline
                    ? errors.acceptanceDeadline.message
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

export default OfferLetter;
