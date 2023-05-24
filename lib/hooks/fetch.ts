import axios from "axios";
import { useEffect, useState } from "react";

type MFetchProps = {
  endpoint: string;
  method?: string;
  extraHeaders?: Record<string, string>;
  params?: Record<string, string | number>;
  data?: Record<any, any>;
};
const useFetch = (fetchProps: MFetchProps) => {
  const [data, setData] = useState<any | any[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const { request, abort } = mFetch(fetchProps);
    request
      .then((resp) => {
        setLoading(true);
        setData(resp.data.data);
      })
      .catch((err) => console.error("error", err))
      .finally(() => setLoading(false));

    return () => {
      abort();
      setLoading(false);
    };
  }, []);

  return { data, loading };
};

export default useFetch;

export const mFetch = ({
  endpoint,
  method,
  extraHeaders,
  params,
  data,
}: MFetchProps) => {
  const controller = new AbortController();
  const headers = {
    "Api-Key": "API-KEY",
  };
  const options = {
    url: endpoint,
    method: method || "GET",
    headers: { ...headers, ...extraHeaders },
    signal: controller.signal,
    params,
    data: data ? JSON.stringify(data) : undefined,
  };

  const request = axios(options);

  const abort = () => {
    controller.abort();
  };

  return { request, abort };
};
