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

const EmploymentAgreement = () => {
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
            name="position"
            control={control}
            defaultValue=""
            rules={{ required: "Position is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the position?"
                variant="outlined"
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
              />
            )}
          />

          <Controller
            name="responsibilities"
            control={control}
            defaultValue=""
            rules={{ required: "Responsibilities are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What are the responsibilities?"
                variant="outlined"
                error={!!errors.responsibilities}
                helperText={
                  errors.responsibilities ? errors.responsibilities.message : ""
                }
              />
            )}
          />

          <Controller
            name="employmentPeriod"
            control={control}
            defaultValue=""
            rules={{ required: "Employment period is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="How long is the employment period?"
                variant="outlined"
                error={!!errors.employmentPeriod}
                helperText={
                  errors.employmentPeriod ? errors.employmentPeriod.message : ""
                }
              />
            )}
          />

          <Controller
            name="compensationBenefits"
            control={control}
            defaultValue=""
            rules={{ required: "Compensation and benefits are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the compensation and benefits?"
                variant="outlined"
                error={!!errors.compensationBenefits}
                helperText={
                  errors.compensationBenefits
                    ? errors.compensationBenefits.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="probationaryPeriod"
            control={control}
            defaultValue=""
            rules={{ required: "Probationary period is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="How long is the probationary period?"
                variant="outlined"
                error={!!errors.probationaryPeriod}
                helperText={
                  errors.probationaryPeriod
                    ? errors.probationaryPeriod.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="governingLaw"
            control={control}
            defaultValue=""
            rules={{ required: "Governing law is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the governing law and jurisdiction?"
                variant="outlined"
                error={!!errors.governingLaw}
                helperText={
                  errors.governingLaw ? errors.governingLaw.message : ""
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

export default PurchaseForm;
