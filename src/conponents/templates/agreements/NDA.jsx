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

const NDA = () => {
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
            name="purposeOfTheNDA"
            control={control}
            defaultValue=""
            rules={{ required: "Purpose of the NDA is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Purpose of the NDA"
                variant="outlined"
                error={!!errors.buyer}
                helperText={errors.buyer ? errors.buyer.message : ""}
              />
            )}
          />

          <Controller
            name="typeOfConfidentiality"
            control={control}
            defaultValue=""
            rules={{ required: "Confidentiality type is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mutual or one-way confidentiality"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="durationOfConfidentiality"
            control={control}
            defaultValue=""
            rules={{ required: "duration Of Confidentiality Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="How long does confidentiality last"
                variant="outlined"
                error={!!errors.buyerAddress}
                helperText={
                  errors.buyerAddress ? errors.buyerAddress.message : ""
                }
              />
            )}
          />
          <Controller
            name="GoverningLaw"
            control={control}
            defaultValue=""
            rules={{ required: "Governing law  is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Governing law and jurisdiction"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
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
