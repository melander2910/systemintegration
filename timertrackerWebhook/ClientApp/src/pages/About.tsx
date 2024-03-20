import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { HomePage } from "../models/home-page";
import { GenericResult } from "../models/generic-result";
import Spinner from "../components/Spinner"
import { BasePage } from "../models/base-page";



export function About() {
  const apuUrl = "https://localhost:44351/api/content/base-page-content";
  const {
    data,
    error,
    loading,
  } = useFetch<GenericResult<BasePage>>({ url: apuUrl, runOnFirstRender: true});


  let relativeImageUrl = data?.data?.imageUrl;
  let imageUrl = "https://localhost:44351" + relativeImageUrl;

  return (
<>
      {/* TODO: add loading/spinner component */}
      {loading && 
      <Spinner loading={loading}></Spinner>
      }

      {error && 
      <p>Error: {error.message}</p>
      }

      {data && (
        <>
          <h4>About Works</h4>
          <h4>Title: {data.data?.title}</h4>
          <h4>Subtitle: {data.data?.subtitle}</h4>

          <img src={imageUrl} alt="Image" />
        </>
      )}
    </>
  );
};