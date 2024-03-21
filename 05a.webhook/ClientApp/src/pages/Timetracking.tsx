import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar'
import dayjs, { Dayjs } from 'dayjs'
import { useMemo, useState } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button, Drawer, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextareaAutosize, TextField, Typography } from '@mui/material';
import enGB from 'dayjs/locale/en-GB';
import useFetch from '../hooks/useFetch';
import { TimeTracking } from "../models/time-tracking";
import { TimeField } from '@mui/x-date-pickers';
import { ClientModel } from '../models/client-model';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientClient, TimeTrackingClient, UserClient } from '../utils/client';
import { calendarToTimeTracking, timeTrackingToCalendar } from '../utils/mapper';
import { CalendarModel } from '../models/calendar-model';
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import _ from 'lodash';




const DragAndDropCalendar = withDragAndDrop(Calendar);

const Timetracking = () => {
    dayjs.locale(enGB)
    const localizer = dayjsLocalizer(dayjs)
    const userClient = new UserClient();
    const timeTrackingClient = new TimeTrackingClient();
    const clientClient = new ClientClient();
    const queryClient = useQueryClient();
    let userId = 1;

    const [tempTimeTracking, setTempTimeTracking] = useState<CalendarModel>({ userId: 1 });
    const [isSelected, setIsSelected] = useState(false);
    const [timeTrackingHasChanges, setTimeTrackingHasChanges] = useState(false);


    const { status: timeTrackingsStatus, error: timeTrackingsError, data: timeTrackingsData } = useQuery({
        queryKey: ["userTimeTrackings"],
        queryFn: () => userClient.getTimeTrackingsByUserId(userId),
    })

    const createTimeTrackingMutation = useMutation((newTimeTracking: TimeTracking) => timeTrackingClient.addTimeTracking(newTimeTracking),
        {
            onSuccess: data => {
                queryClient.setQueriesData(["userTimeTrackings"], data),
                    queryClient.invalidateQueries(["userTimeTrackings"], { exact: true })
            },
        }
    );

    // TODO: understand queries and is there an open stream?

    // TODO: which of the following deleteTimeTrackingMutation is the correct way? use of mutationFn? what about parameters?
    // const deleteTimeTrackingMutation = useMutation((id: number) => timeTrackingClient.deleteTimeTracking(id),
    //     {
    //         onSuccess: data => {
    //             queryClient.invalidateQueries(["userTimeTrackings"], { exact: true })
    //         },
    //     }
    // );

    const deleteTimeTrackingMutation = useMutation({
        mutationFn: (id: number) => timeTrackingClient.deleteTimeTracking(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userTimeTrackings"] });
        }
    })

    const updateTimeTrackingMutation = useMutation({
        mutationFn: (timeTracking: TimeTracking) => timeTrackingClient.updateTimeTracking(timeTracking.id ?? 0, timeTracking),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userTimeTrackings"] });
        }
    })

    function handleDelete() {
        // TODO: deselect timeTracking on succesfull delete
        deleteTimeTrackingMutation.mutate(tempTimeTracking.id ?? 0);
        setTempTimeTracking({ userId: userId })
    }

    function handleSubmit() {
        // TODO: reset startDate and endDate for timeTracking on succesfull create?
        // TODO: should newly created be selected?
        let convertedTimeTracking = calendarToTimeTracking(tempTimeTracking);
        createTimeTrackingMutation.mutate(convertedTimeTracking);
    }

    function handleUpdate() {
        let convertedTimeTracking = calendarToTimeTracking(tempTimeTracking);
        updateTimeTrackingMutation.mutate(convertedTimeTracking);
        // TODO: update timetracking
    }

    function handleResize(event: EventInteractionArgs<CalendarModel>) {
        setIsSelected(true);
        setTempTimeTracking((prevState) => ({
            ...prevState,
            start: new Date(event.start.toLocaleString()),
            end: new Date(event.end.toLocaleString()),
            id: event.event.id,
            title: event.event.title,
            description: event.event.description,
            clientId: event.event.clientId,
            userId: event.event.userId
        }))
        // TODO: set resized to selected element
    }

    function handleDragAndDrop(event: EventInteractionArgs<CalendarModel>) {
        setIsSelected(true);
        setTempTimeTracking((prevState) => ({
            ...prevState,
            start: new Date(event.start.toLocaleString()),
            end: new Date(event.end.toLocaleString()),
            id: event.event.id,
            title: event.event.title,
            description: event.event.description,
            clientId: event.event.clientId,
            userId: event.event.userId
        }))
    }

    function handleSelect(event: CalendarModel) {
        setIsSelected(true);
        setTempTimeTracking((prevState) => ({
            ...prevState,
            id: event.id,
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.description,
            clientId: event.clientId,
            userId: event.userId
        }
        ));
    }

    const { status: clientStatus, error: clientError, data: clientData } = useQuery({
        queryKey: ["userClient"], // user id needed?
        queryFn: () => userClient.getClientsByUserId(userId),
    })

    // const clientsUrl = "http://localhost:8080/api/user/1/clients";
    // const {
    //     data: clientData,
    //     error: clientError,
    //     loading: clientLoading,
    // } = useFetch<ClientModel[]>({ url: clientsUrl, runOnFirstRender: true });

    // dependency?
    // scroll to time changes depending on where the latest timeregistration is?
    // scroll to time changes depending on time of the day?
    const { scrollToTime } = useMemo(
        () => ({
            scrollToTime: new Date(1970, 1, 1, 7),
        }),
        []
    )

    const timeTrackingEvents = useMemo(() => {
        console.log("recalculating timeTrackingEvents");
        const transformedTimeTrackings = timeTrackingsData?.map(timeTrackingToCalendar) ?? [];
        
        if (!_.isEqual(transformedTimeTrackings.find(x => x.id == tempTimeTracking.id), tempTimeTracking)) {
            setTimeTrackingHasChanges(true)
        } else {
            setTimeTrackingHasChanges(false)
        }
        console.log("has changes: ", timeTrackingHasChanges);
        return [...transformedTimeTrackings.filter(x => x.id != tempTimeTracking.id), tempTimeTracking];
    }, [timeTrackingsData, tempTimeTracking]);

    const EventComponent = ({ event }: any) => (
        <Box>
            <Typography variant='h6'>{event.title}</Typography>
            <Typography>{event.description}</Typography>
        </Box>
    );


    return (
        <Grid container marginTop={2} >
            <Grid padding={2} item xs={2}>

                <FormControl sx={{ m: 1, minWidth: 160 }}>
                    <InputLabel  id="client-label">Select Client</InputLabel>
                    <Select
                        labelId="client-label"
                        id="client-select"
                        value={tempTimeTracking.clientId?.toString() ?? "None"}
                        onChange={(e) => {
                            setTempTimeTracking((prevState) => ({
                                ...prevState,
                                clientId: Number(e.target.value),
                            }
                            ));
                        }}
                        fullWidth
                        label="Client"
                    >
                        <MenuItem value="" disabled>
                            Select client
                        </MenuItem>
                        {clientData?.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.companyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    margin='normal'
                    id="filled-single-static"
                    label="Title"
                    value={tempTimeTracking.title ?? ""}
                    onChange={(e) => {
                        setTempTimeTracking((prevState) => ({
                            ...prevState,
                            title: e.target.value,
                        }
                        ));
                    }}
                    variant="filled"
                />

                <TextField
                    margin='normal'
                    id="filled-multiline-static"
                    label="Description"
                    value={tempTimeTracking.description ?? ""}
                    onChange={(e) => {
                        setTempTimeTracking((prevState) => ({
                            ...prevState,
                            description: e.target.value,
                        }
                        ));
                    }}
                    multiline
                    rows={4}
                    variant="filled"
                />
                <Box marginTop={2}>
                    <TimeField label="Start"
                        onChange={(e) => {
                            console.log(e?.toDate());
                            setTempTimeTracking((prevState) => ({

                                ...prevState,
                                start: e?.toDate(),
                            }
                            ));
                        }}
                        value={dayjs(tempTimeTracking?.start ?? null)}
                    />
                </Box>

                <Box marginTop={2}>
                    <TimeField label="End"

                        onChange={(e) => {
                            setTempTimeTracking((prevState) => ({
                                ...prevState,
                                end: e?.toDate(),
                            }
                            ));
                        }}
                        value={dayjs(tempTimeTracking?.end ?? null)}
                    />
                </Box>

                {isSelected && tempTimeTracking.id != null
                    ? <Box>
                        <Button disabled={!timeTrackingHasChanges} onClick={() => handleUpdate()}>Update</Button>
                        <Button onClick={() => handleDelete()}>Delete</Button>
                    </Box>

                    : <Button onClick={() => handleSubmit()}>Create</Button>
                }


            </Grid>
            <Grid item xs={10} style={{ height: 1000 }} >
                <DragAndDropCalendar
                    events={timeTrackingEvents != null ? timeTrackingEvents : []}
                    timeslots={4}
                    step={15}
                    defaultView={Views.WEEK}
                    localizer={localizer}
                    selectable
                    selected={tempTimeTracking}
                    scrollToTime={scrollToTime}
                    components={{ event: EventComponent }}
                    onSelectSlot={(e) => {
                        if (tempTimeTracking.id != null) {
                            setTempTimeTracking({ userId: userId })
                        }
                        setIsSelected(false);
                        setTempTimeTracking((prevState) => ({
                            ...prevState,
                            start: e.start,
                            end: e.end
                        }
                        ));
                    }}
                    onEventDrop={(event) => handleDragAndDrop(event)}
                    onEventResize={(event) => handleResize(event)}
                    resizable={true}
                    popup={true}
                    onSelectEvent={(event) => handleSelect(event)}
                />
            </Grid>
        </Grid>

    );
};

export default Timetracking;
