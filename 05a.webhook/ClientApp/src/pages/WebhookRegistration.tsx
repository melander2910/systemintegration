import { Margin, RadioButtonCheckedSharp } from "@mui/icons-material";
import { Box, Button, Container, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api, WebhookRegistration as WebhookRegistrationModel } from "../utils/Api";
import { useState } from "react";

export const WebhookRegistration = () => {
    const client = new Api({
        baseUrl: "http://localhost:8080"
    }).api;

    const queryClient = useQueryClient();

    const [tempWebhookRegistration, setTempWebhookRegistration] = useState<WebhookRegistrationModel>({contentType: "application/json", eventType: "Timetracking.OnWeekend"});

    const createWebhookMutation = useMutation((webhookRegistration: WebhookRegistrationModel) => client.registerWebhook(webhookRegistration),
        {
            onSuccess: data => {
                queryClient.setQueriesData(["userWebhooks"], data),
                    queryClient.invalidateQueries(["userWebhooks"], { exact: true })
            },
        }
    );

    const handleSubmit = () => {
        console.log(tempWebhookRegistration);
        createWebhookMutation.mutate(tempWebhookRegistration);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTempWebhookRegistration((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    return (
        <Box sx={{ padding: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>Register webhook</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <InputLabel>
                        Payload Url
                    </InputLabel>
                    <TextField
                        label="Url"
                        name="url"
                        variant="outlined"
                        value={tempWebhookRegistration.url ?? ""}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <InputLabel>
                        Content Type
                    </InputLabel>
                    <RadioGroup name="contentType" defaultValue="application/json" onChange={handleChange}>
                        <FormControlLabel value="application/json" control={<Radio />} label="application/json" />
                        <FormControlLabel value="application/x-www-form-urlencoded" control={<Radio />} label="application/x-www-form-urlencoded" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <InputLabel>
                        Which event would you like to trigger this webhook?
                    </InputLabel>
                    <RadioGroup name="eventType" defaultValue="Timetracking.OnWeekend" onChange={handleChange}>
                        <FormControlLabel value="Timetracking.OnWeekend" control={<Radio />} label="Weekend registrations" />
                        <FormControlLabel value="Timetracking.NonNineToFive" control={<Radio />} label="Non 9-5 registrations" />
                        <FormControlLabel value="Timetracking.All" control={<Radio />} label="All registrations" />
                    </RadioGroup>
                </Grid>

                <Grid item>

                    <Button onClick={handleSubmit} type="submit" variant="contained">Register webhook</Button>
                </Grid>
            </Grid>

        </Box>
    );
};