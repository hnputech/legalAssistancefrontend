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

const PurchaseForm = () => {
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
      sx={{
        width: "40%",
        maxWidth: "400px",
      }}
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
            name="buyer"
            control={control}
            defaultValue=""
            rules={{ required: "Buyer is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Buyer"
                variant="outlined"
                error={!!errors.buyer}
                helperText={errors.buyer ? errors.buyer.message : ""}
              />
            )}
          />

          <Controller
            name="seller"
            control={control}
            defaultValue=""
            rules={{ required: "Seller is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seller"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="goods"
            control={control}
            defaultValue=""
            rules={{ required: "Goods are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Goods"
                variant="outlined"
                error={!!errors.goods}
                helperText={errors.goods ? errors.goods.message : ""}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{
              required: "Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
              />
            )}
          />

          <Controller
            name="dateOfPurchase"
            control={control}
            defaultValue=""
            rules={{ required: "Date of purchase is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Purchase"
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

          <Controller
            name="sellerAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Seller address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seller Address"
                variant="outlined"
                error={!!errors.sellerAddress}
                helperText={
                  errors.sellerAddress ? errors.sellerAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="buyerAddress"
            control={control}
            defaultValue=""
            rules={{ required: "Buyer address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Buyer Address"
                variant="outlined"
                error={!!errors.buyerAddress}
                helperText={
                  errors.buyerAddress ? errors.buyerAddress.message : ""
                }
              />
            )}
          />

          <Controller
            name="placeOfDelivery"
            control={control}
            defaultValue=""
            rules={{ required: "Place of delivery is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Place of Delivery"
                variant="outlined"
                error={!!errors.placeOfDelivery}
                helperText={
                  errors.placeOfDelivery ? errors.placeOfDelivery.message : ""
                }
              />
            )}
          />

          <Controller
            name="warranty"
            control={control}
            defaultValue=""
            rules={{ required: "Warranty is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Warranty"
                variant="outlined"
                error={!!errors.warranty}
                helperText={errors.warranty ? errors.warranty.message : ""}
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
