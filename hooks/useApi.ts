"use client";
import { handleApiRequest } from "@/lib/api/api-wrapper";
import { useEffect, useState } from "react";

export function useApi<T>(apiOptions: {
  dataFn: () => Promise<T>;
  options?: { selfExecute?: boolean; signal?: AbortController };
  urlParams?: Record<string, unknown>;
}) {
  /**
   * Loading states
   */
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  /**
   * message (error or general message)
   */
  const [message, setMessage] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number | null>(null);

  /**
   * data state
   */
  const [data, setData] = useState<T | null>(null);

  async function execute() {
    setData(null);
    setIsIdle(false);
    setIsLoading(true);
    const response = await handleApiRequest(apiOptions.dataFn());

    if (!response.success) {
      setError(true);
      setIsLoading(false);
      setMessage((response.message as string) || "Something went wrong");
      setStatusCode(response.status || 500);
      return;
    }

    setData(response.data);
    setIsLoading(false);
    setIsIdle(true);
    setIsSuccess(true);
  }

  function resetStates() {
    setError(false);
    setIsIdle(true);
    setData(null);
    setIsSuccess(false);
    setIsLoading(false);
    setMessage("");
    setStatusCode(null);
  }

  useEffect(() => {
    console.log("outside");
    if (apiOptions.options?.selfExecute) {
      (async () => {
        console.log("SELF EXEC");
        await execute();
      })();
    }
    console.log("exit");
    return () => {
      // cleanup function
      resetStates();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiOptions.urlParams]);

  return {
    data,
    error,
    message,
    isLoading,
    isIdle,
    isSuccess,
    execute,
    statusCode,
  };
}
