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
import { v4 as uuidv4 } from "uuid";
import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";
import { addTemplateDocuments } from "../../../requests/template";

export const Partnership = ({
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
  } = useForm();

  const onSubmit = async (data) => {
    console.log("=====data", data);
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
            name="partner1Name"
            control={control}
            defaultValue=""
            rules={{ required: "Partner1 Name  is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Partner 1 Name"
                variant="outlined"
                error={!!errors.partner1Name}
                helperText={
                  errors.partner1Name ? errors.partner1Name.message : ""
                }
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
                error={!!errors.partner2Name}
                helperText={
                  errors.partner2Name ? errors.partner2Name.message : ""
                }
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
                error={!!errors.businessName}
                helperText={
                  errors.businessName ? errors.businessName.message : ""
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
                error={!!errors.businessAddress}
                helperText={
                  errors.businessAddress ? errors.businessAddress.message : ""
                }
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
                error={!!errors.partner1CapitalContribution}
                helperText={
                  errors.partner1CapitalContribution
                    ? errors.partner1CapitalContribution.message
                    : ""
                }
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
                error={!!errors.partner2CapitalContribution}
                helperText={
                  errors.partner2CapitalContribution
                    ? errors.partner2CapitalContribution.message
                    : ""
                }
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
                error={!!errors.partner1OwnershipPercentage}
                helperText={
                  errors.partner1OwnershipPercentage
                    ? errors.partner1OwnershipPercentage.message
                    : ""
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
                error={!!errors.partner2OwnershipPercentage}
                helperText={
                  errors.partner2OwnershipPercentage
                    ? errors.partner2OwnershipPercentage.message
                    : ""
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
                error={!!errors.managementResponsibilitiesOfPartner1}
                helperText={
                  errors.managementResponsibilitiesOfPartner1
                    ? errors.managementResponsibilitiesOfPartner1.message
                    : ""
                }
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
                error={!!errors.managementResponsibilitiesOfPartner2}
                helperText={
                  errors.managementResponsibilitiesOfPartner2
                    ? errors.managementResponsibilitiesOfPartner2.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="durationOfPartnership"
            control={control}
            defaultValue=""
            rules={{
              required: "Duration Of Partnership Price is required (in years)",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid years format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Duration Of Partnership"
                variant="outlined"
                error={!!errors.durationOfPartnership}
                helperText={
                  errors.durationOfPartnership
                    ? errors.durationOfPartnership.message
                    : ""
                }
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
                error={!!errors.dateOfPartnerShip}
                helperText={
                  errors.dateOfPartnerShip
                    ? errors.dateOfPartnerShip.message
                    : ""
                }
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
