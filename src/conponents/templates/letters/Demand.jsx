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

const Demand = () => {
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
            name="topicOfDispute"
            control={control}
            defaultValue=""
            rules={{ required: "Enter the topic of dispute is required" }}
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

export default Demand;
