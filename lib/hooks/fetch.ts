import axios from "axios";
import { useEffect, useState } from "react";

type MFetchProps = {
  endpoint: string;
  method?: string;
  headerType: "rapid-api" | "subtitle";
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
        setData(resp.data);
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
  headerType,
  extraHeaders,
  params,
  data,
}: MFetchProps) => {
  const controller = new AbortController();
  const headers =
    headerType === "rapid-api"
      ? {
          "X-RapidAPI-Key":
            "API-KEY",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        }
      : {
          "Api-Key": "API-KEY",
        };
  const request = axios({
    url: endpoint,
    method: method || "GET",
    headers: { ...headers, ...extraHeaders },
    signal: controller.signal,
    params,
    transformResponse: (res) => {
      return JSON.parse(res);
    },
    data: data ? JSON.stringify(data) : undefined,
  });

  const abort = () => {
    controller.abort();
  };

  return { request, abort };
};
