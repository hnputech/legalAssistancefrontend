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
import { useIsMobile } from "../../../hooks/useIsMobile";

export const Demand = ({ setContent }) => {
  let { templateId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}
        >
          <Controller
            name="recipientName"
            control={control}
            defaultValue=""
            rules={{ required: "  Recipient Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter the Recipient Name"
                variant="outlined"
                error={!!errors.recipientName}
                helperText={
                  errors.recipientName ? errors.recipientName.message : ""
                }
              />
            )}
          />

          <Controller
            name="senderName"
            control={control}
            defaultValue=""
            rules={{ required: " the Sender Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter the Sender Name"
                variant="outlined"
                error={!!errors.senderName}
                helperText={errors.senderName ? errors.senderName.message : ""}
              />
            )}
          />
          <Controller
            name="sanderAddress"
            control={control}
            defaultValue=""
            rules={{ required: " Sander Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter the Sender Address"
                variant="outlined"
                error={!!errors.sanderAddress}
                helperText={
                  errors.sanderAddress ? errors.sanderAddress.message : ""
                }
              />
            )}
          />
          <Controller
            name="senderContactInfo"
            control={control}
            defaultValue=""
            rules={{ required: " the sender ContactInfo is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter the sender ContactInfo"
                variant="outlined"
                error={!!errors.senderContactInfo}
                helperText={
                  errors.senderContactInfo
                    ? errors.senderContactInfo.message
                    : ""
                }
              />
            )}
          />
          <Controller
            name="topicOfDispute"
            control={control}
            defaultValue=""
            rules={{ required: " the topic of dispute is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter the topic of dispute"
                variant="outlined"
                error={!!errors.topicOfDispute}
                helperText={
                  errors.topicOfDispute ? errors.topicOfDispute.message : ""
                }
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="whatDoYouWantOtherPartyToDo"
            control={control}
            defaultValue=""
            rules={{
              required: "What do you want the other party to do? is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What do you want the other party to do?"
                variant="outlined"
                error={!!errors.whatDoYouWantOtherPartyToDo}
                helperText={
                  errors.whatDoYouWantOtherPartyToDo
                    ? errors.whatDoYouWantOtherPartyToDo.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="factsOfDispute"
            control={control}
            defaultValue=""
            rules={{
              required: "What are the facts of the dispute? is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What are the facts of the dispute?"
                variant="outlined"
                error={!!errors.factsOfDispute}
                helperText={
                  errors.factsOfDispute ? errors.factsOfDispute.message : ""
                }
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="legalBasisOfDemand"
            control={control}
            defaultValue=""
            rules={{
              required: "What is the legal basis of the demand? is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the legal basis of the demand?"
                variant="outlined"
                error={!!errors.legalBasisOfDemand}
                helperText={
                  errors.legalBasisOfDemand
                    ? errors.legalBasisOfDemand.message
                    : ""
                }
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="actionToResolve"
            control={control}
            defaultValue=""
            rules={{
              required:
                "What action should be taken to resolve the matter? is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What action should be taken to resolve the matter?"
                variant="outlined"
                error={!!errors.actionToResolve}
                helperText={
                  errors.actionToResolve ? errors.actionToResolve.message : ""
                }
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="damageSuffered"
            control={control}
            defaultValue=""
            rules={{ required: "What damage have you suffered? is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What damage have you suffered?"
                variant="outlined"
                error={!!errors.damageSuffered}
                helperText={
                  errors.damageSuffered ? errors.damageSuffered.message : ""
                }
                multiline
                rows={4}
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
