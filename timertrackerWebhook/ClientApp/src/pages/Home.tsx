import useFetch from "../assets/use-fetch";
import { HomePage } from "../models/home-page";
import { GenericResult } from "../models/generic-result";
import Spinner from "../components/Spinner"

export const Home = () => {
  console.log("Home page is rendered");
  const {
    response: { data, success, error: errorMsg } = {
      data: undefined,
      success: false,
      error: undefined,
    },
    error,
    loading,
  } = useFetch<GenericResult<HomePage>>({ url: "https://localhost:44351/api/content/home-content" });
  let relativeImageUrl = data?.imageUrl;
  
  let imageUrl = "https://localhost:44351" + relativeImageUrl;
  return (
    <>
      <Spinner loading={loading} />
      {error && <p className="error">error ...{error?.message}</p>}
      {!loading && !success && <p className="error">error ...{errorMsg}</p>}
      {success && data && (
        <div>
          title : {data.title}
          <div>
            {data.imageUrl && (
              <img
                title={data.title}
                src={imageUrl}
                width="auto"
                height="200px"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};