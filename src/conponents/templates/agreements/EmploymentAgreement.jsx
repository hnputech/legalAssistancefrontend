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
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";
import { addTemplateDocuments } from "../../../requests/template";

export const EmploymentAgreement = ({
  setContent,
  content,
  documentName,
  setDocumentId,
}) => {
  console.log("======render ", content);
  const [active, setActive] = useState("gpt-4o");
  const [isLoading, setIsLoading] = useState(false);

  const { templateId } = useParams();
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
          sx={{ "& > :not(style)": { m: 2, width: "90%", maxWidth: "35ch" } }}
        >
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            rules={{ required: "Company Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name of the company?"
                variant="outlined"
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
              />
            )}
          />
          <Controller
            name="employeeName"
            control={control}
            defaultValue=""
            rules={{ required: "employee Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the Name of the employee?"
                variant="outlined"
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
              />
            )}
          />
          <Controller
            name="position"
            control={control}
            defaultValue=""
            rules={{ required: "Position is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the position?"
                variant="outlined"
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
              />
            )}
          />

          <Controller
            name="responsibilities"
            control={control}
            defaultValue=""
            rules={{ required: "Responsibilities are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What are the responsibilities?"
                variant="outlined"
                error={!!errors.responsibilities}
                helperText={
                  errors.responsibilities ? errors.responsibilities.message : ""
                }
              />
            )}
          />

          <Controller
            name="employmentPeriod"
            control={control}
            defaultValue=""
            rules={{ required: "Employment period is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="How long is the employment period?"
                variant="outlined"
                error={!!errors.employmentPeriod}
                helperText={
                  errors.employmentPeriod ? errors.employmentPeriod.message : ""
                }
              />
            )}
          />

          <Controller
            name="compensationBenefits"
            control={control}
            defaultValue=""
            rules={{ required: "Compensation and benefits are required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the compensation and benefits?"
                variant="outlined"
                error={!!errors.compensationBenefits}
                helperText={
                  errors.compensationBenefits
                    ? errors.compensationBenefits.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="probationaryPeriod"
            control={control}
            defaultValue=""
            rules={{ required: "Probationary period is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="How long is the probationary period?"
                variant="outlined"
                error={!!errors.probationaryPeriod}
                helperText={
                  errors.probationaryPeriod
                    ? errors.probationaryPeriod.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="governingLaw"
            control={control}
            defaultValue=""
            rules={{ required: "Governing law is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the governing law and jurisdiction?"
                variant="outlined"
                error={!!errors.governingLaw}
                helperText={
                  errors.governingLaw ? errors.governingLaw.message : ""
                }
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            defaultValue=""
            rules={{ required: "Joining date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="What is the joining date?"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
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
