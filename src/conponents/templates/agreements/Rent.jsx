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

const RentAgreement = () => {
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
            name="endDate"
            control={control}
            defaultValue=""
            rules={{ required: "End Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="End Date"
                variant="outlined"
                error={!!errors.endDate}
                helperText={errors.endDate ? errors.endDate.message : ""}
              />
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

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RentAgreement;
