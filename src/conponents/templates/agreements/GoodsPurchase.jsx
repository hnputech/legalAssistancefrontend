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
            name="buyer"
            control={control}
            defaultValue=""
            rules={{ required: "Buyer name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Buyer Name"
                variant="outlined"
                error={!!errors.buyer}
                helperText={errors.buyer ? errors.buyer.message : ""}
              />
            )}
          />

          <Controller
            name="buyercontactinfo"
            control={control}
            defaultValue=""
            rules={{ required: "Buyer Contact Info is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Buyer Contact Info"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
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
            name="seller"
            control={control}
            defaultValue=""
            rules={{ required: "Seller name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seller Name"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
              />
            )}
          />

          <Controller
            name="sellerontactinfo"
            control={control}
            defaultValue=""
            rules={{ required: "Seller Contact Info is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seller Contact Info"
                variant="outlined"
                error={!!errors.seller}
                helperText={errors.seller ? errors.seller.message : ""}
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
            name="goods"
            control={control}
            defaultValue=""
            rules={{ required: "Product details are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product details"
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
              required: "Product Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Price"
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
          <Controller
            name="quantity"
            control={control}
            defaultValue=""
            rules={{ required: "Quantity is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
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
