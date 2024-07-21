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

const Partnership = () => {
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
            name="partner1Name"
            control={control}
            defaultValue=""
            rules={{ required: "Partner1 Name  is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 1 Name"
                variant="outlined"
                error={!!errors.buyer}
                helperText={errors.buyer ? errors.buyer.message : ""}
              />
            )}
          />

          <Controller
            name="partner2Name"
            control={control}
            defaultValue=""
            rules={{ required: "Partner 2 Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 2 Name"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="businessName"
            control={control}
            defaultValue=""
            rules={{ required: "Business Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Business Name"
                variant="outlined"
                error={!!errors.buyerAddress}
                helperText={
                  errors.buyerAddress ? errors.buyerAddress.message : ""
                }
              />
            )}
          />
          <Controller
            name="businessAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Business Address name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Business Address"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="partner1CapitalContribution"
            control={control}
            defaultValue=""
            rules={{
              required: "Partner 1 Capital Contribution Info is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 1 Capital Contribution "
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="partner2CapitalContribution"
            control={control}
            defaultValue=""
            rules={{
              required: "Partner 2 Capital Contribution Info is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 2 Capital Contribution "
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="partner1OwnershipPercentage"
            control={control}
            defaultValue=""
            rules={{ required: "Partner 1 Ownership Percentage is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 1 Ownership Percentage"
                variant="outlined"
                error={!!errors.sellerAddress}
                helperText={
                  errors.sellerAddress ? errors.sellerAddress.message : ""
                }
              />
            )}
          />
          <Controller
            name="partner2OwnershipPercentage"
            control={control}
            defaultValue=""
            rules={{ required: "Partner 2 Ownership Percentage is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 2 Ownership Percentage"
                variant="outlined"
                error={!!errors.sellerAddress}
                helperText={
                  errors.sellerAddress ? errors.sellerAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="managementResponsibilitiesOfPartner1"
            control={control}
            defaultValue=""
            rules={{
              required: "Management Responsibilities details are required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Management Responsibilities Of Partner 1"
                variant="outlined"
                error={!!errors.goods}
                helperText={errors.goods ? errors.goods.message : ""}
              />
            )}
          />

          <Controller
            name="managementResponsibilitiesOfPartner2"
            control={control}
            defaultValue=""
            rules={{
              required: "Management Responsibilities details are required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Management Responsibilities Of Partner 2"
                variant="outlined"
                error={!!errors.goods}
                helperText={errors.goods ? errors.goods.message : ""}
              />
            )}
          />

          <Controller
            name="durationOfPartnership"
            control={control}
            defaultValue=""
            rules={{
              required: "Duration Of Partnership Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duration Of Partnership"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
              />
            )}
          />

          <Controller
            name="dateOfPartnerShip"
            control={control}
            defaultValue=""
            rules={{ required: "Date of Partnership is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Partnership"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateOfPurchase}
                helperText={
                  errors.dateOfPurchase ? errors.dateOfPurchase.message : ""
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
