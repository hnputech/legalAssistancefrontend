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
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchdaata } from "../const";
export const Trademark = ({ setContent }) => {
  let { templateId } = useParams();
  const navigate = useNavigate();

  const cardInfo = searchdaata.find((item) => item.id === templateId);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3001/templateGenerator/${templateId}`,
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

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedChunk = decoder.decode(value, { stream: true });

        setContent((prevContent) => prevContent + decodedChunk);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <ArrowBackIcon onClick={() => navigate("/template")} />

        <Typography
          variant="h6"
          sx={{ marginTop: "5px", fontWeight: "bold" }}
          gutterBottom
        >
          {cardInfo.title}
        </Typography>

        <Typography variant="body2">{cardInfo.description}.</Typography>

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
            name="trademarkName"
            control={control}
            defaultValue=""
            rules={{ required: "Trademark Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Trademark Name"
                variant="outlined"
                error={!!errors.trademarkName}
                helperText={
                  errors.trademarkName ? errors.trademarkName.message : ""
                }
              />
            )}
          />

          <Controller
            name="trademarkDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Trademark Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Trademark Description"
                variant="outlined"
                error={!!errors.trademarkDescription}
                helperText={
                  errors.trademarkDescription
                    ? errors.trademarkDescription.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="typeOfTrademark"
            control={control}
            defaultValue=""
            rules={{ required: "Type of Trademark is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Type of Trademark (e.g., word mark, design mark, combined mark)"
                variant="outlined"
                error={!!errors.typeOfTrademark}
                helperText={
                  errors.typeOfTrademark ? errors.typeOfTrademark.message : ""
                }
              />
            )}
          />

          <Controller
            name="goodsServicesDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Goods/Services Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Goods/Services Description"
                variant="outlined"
                error={!!errors.goodsServicesDescription}
                helperText={
                  errors.goodsServicesDescription
                    ? errors.goodsServicesDescription.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />

          <Controller
            name="classOfGoodsServices"
            control={control}
            defaultValue=""
            rules={{ required: "Class of Goods/Services is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Class of Goods/Services"
                variant="outlined"
                error={!!errors.classOfGoodsServices}
                helperText={
                  errors.classOfGoodsServices
                    ? errors.classOfGoodsServices.message
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
