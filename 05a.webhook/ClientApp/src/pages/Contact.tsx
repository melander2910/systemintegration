import useFetch from "../hooks/useFetch";
import { BasePage } from "../models/base-page";
import { GenericResult } from "../models/generic-result";

export const Contact = () => {
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
        <h4>Contact Works</h4>
      </>
    );
  };