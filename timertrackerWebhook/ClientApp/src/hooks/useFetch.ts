import { useEffect, useState } from 'react';

interface ApiResponse<T> {
    data?: T | null
    loading: boolean;
    error?: Error | null
}

interface FetchOptions {
    url: string;
    runOnFirstRender?: boolean;
}

// fetches type of T default to unknown
// FetchOptions describes the parameters used for function useFetch
function useFetch<T>({ url, runOnFirstRender }: FetchOptions): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    async function fetchData() {
        console.log("Fetching data from" + url);
        try {
            const response = await fetch(url);
            const responseData = await response.json();
            setData(responseData);
        } catch (err: any) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }
    
        fetchData();
      
    }, []);

  return { data, loading, error };
}

export default useFetch;