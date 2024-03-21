import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ClientModel } from '../models/client-model';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { SurveyReporting } from '../models/survey-reporting';
import { Typography } from '@mui/material';

export function BasePage() {
 
    // apiKey: "d82bf3e6fd26ccd5e2571998a1613e7d-us21"
  const [id, setId] = useState(useParams().id);
  const apiUrl = "http://localhost:8080/api/client";
  const {
    data: clientData,
    error: clientError,
    loading: clientLoading,
  } = useFetch<ClientModel[]>({ url: apiUrl, runOnFirstRender: true });

  const surveyUrl = "http://localhost:8080/api/survey";
  const {
    data: surveyData,
    error: surveyError,
    loading: surveyLoading,
  } = useFetch<SurveyReporting>({ url: surveyUrl, runOnFirstRender: true });
  console.log(surveyData);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "firstname", headerName: "First name", width: 150 },
    { field: "lastname", headerName: "Last name", width: 150 },
    { field: "fullname", headerName: "Full name", width: 150, valueGetter: (params: GridValueGetterParams) => `${params.row.firstname} ${params.row.lastname}` },
    { field: "phoneNumber", headerName: "Phone number", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "companyName", headerName: "Company", width: 150 },
  ]

  const surveyColumns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "webId", headerName: "Web id", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "publishedAt", headerName: "Published at", width: 150 },
    { field: "updatedAt", headerName: "Updated at", width: 150 },
    { field: "listId", headerName: "List id", width: 150 },
    { field: "listName", headerName: "Lit name", width: 150 },
    { field: "totalResponses", headerName: "Total survey responses", width: 190 },
  ]


  return (

    <div>
      <Typography variant='h2'>Clients</Typography>
      <DataGrid
        rows={clientData ?? []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 3,
            },
          },
        }}
        pageSizeOptions={[1, 3, 5]}
      />
      <Typography variant='h2'>Mailchimp Surveys</Typography>
       <DataGrid
        rows={surveyData?.surveys ?? []}
        columns={surveyColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 3,
            },
          },
        }}
        pageSizeOptions={[1, 3, 5]}
      />
    </div>
    // <div>BasePage</div>
  )
}
