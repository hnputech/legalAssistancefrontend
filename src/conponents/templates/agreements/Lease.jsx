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
import { searchdaata } from "../const";
import { useIsMobile } from "../../../hooks/useIsMobile";
import MultiToggle from "../../multiToggle/MutiToggle";

export const LeaseAgreement = ({ setContent }) => {
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
    setIsLoading(true);
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

      // eslint-disable-next-line no-constant-condition
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
        <Box sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}>
          <MultiToggle active={active} setActive={setActive} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ "& > :not(style)": { m: 2, width: "35ch" } }}
        >
          <Controller
            name="lessorName"
            control={control}
            defaultValue=""
            rules={{ required: "Lessor Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lessor Name"
                variant="outlined"
                error={!!errors.lessorName}
                helperText={errors.lessorName ? errors.lessorName.message : ""}
              />
            )}
          />

          <Controller
            name="lesseeName"
            control={control}
            defaultValue=""
            rules={{ required: "Lessee Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lessee Name"
                variant="outlined"
                error={!!errors.lesseeName}
                helperText={errors.lesseeName ? errors.lesseeName.message : ""}
              />
            )}
          />

          <Controller
            name="leasedItemPropertyDescription"
            control={control}
            defaultValue=""
            rules={{ required: "Leased Item/Property Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Leased Item/Property Description"
                variant="outlined"
                error={!!errors.leasedItemPropertyDescription}
                helperText={
                  errors.leasedItemPropertyDescription
                    ? errors.leasedItemPropertyDescription.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="leaseTerm"
            control={control}
            defaultValue=""
            rules={{ required: "Lease Term is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lease Term"
                variant="outlined"
                error={!!errors.leaseTerm}
                helperText={errors.leaseTerm ? errors.leaseTerm.message : ""}
              />
            )}
          />

          <Controller
            name="leasePaymentAmount"
            control={control}
            defaultValue=""
            rules={{ required: "Lease Payment Amount is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Lease Payment Amount"
                variant="outlined"
                error={!!errors.leasePaymentAmount}
                helperText={
                  errors.leasePaymentAmount
                    ? errors.leasePaymentAmount.message
                    : ""
                }
              />
            )}
          />

          <Controller
            name="securityDeposit"
            control={control}
            defaultValue=""
            rules={{ required: "Security Deposit is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Security Deposit"
                variant="outlined"
                error={!!errors.securityDeposit}
                helperText={
                  errors.securityDeposit ? errors.securityDeposit.message : ""
                }
              />
            )}
          />

          <Controller
            name="paymentDue"
            control={control}
            defaultValue=""
            rules={{ required: "Payment Due is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Payment Due"
                variant="outlined"
                error={!!errors.paymentDue}
                helperText={errors.paymentDue ? errors.paymentDue.message : ""}
              />
            )}
          />

          <Controller
            name="dateStart"
            control={control}
            defaultValue=""
            rules={{ required: "Date Start is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date Start"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateStart}
                helperText={errors.dateStart ? errors.dateStart.message : ""}
              />
            )}
          />

          <Controller
            name="dateEnd"
            control={control}
            defaultValue=""
            rules={{ required: "Date End is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date End"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateEnd}
                helperText={errors.dateEnd ? errors.dateEnd.message : ""}
              />
            )}
          />

          <Controller
            name="dateLatePaymentPenalties"
            control={control}
            defaultValue=""
            rules={{ required: "Date Late Payment Penalties is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date Late Payment Penalties"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateLatePaymentPenalties}
                helperText={
                  errors.dateLatePaymentPenalties
                    ? errors.dateLatePaymentPenalties.message
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
