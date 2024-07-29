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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";
import { v4 as uuidv4 } from "uuid";
import { addTemplateDocuments } from "../../../requests/template";

export const PurchaseForm = ({
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
      dateOfPurchase: moment(),
    },
  });

  const onSubmit = async (data) => {
    if (data.dateOfPurchase) {
      data.dateOfPurchase = moment(data.dateOfPurchase).format("MM/DD/YYYY");
    }
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
            rules={{ required: "dateOfPurchase is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  {...field}
                  label="Select dateOfPurchase"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={!!errors.dateOfPurchase}
                      helperText={
                        errors.dateOfPurchase
                          ? errors.dateOfPurchase.message
                          : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>
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
