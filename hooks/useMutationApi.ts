import { handleApiRequest } from "@/lib/api/api-wrapper";
import { useState } from "react";

export function useMutationApi<T>(apiOptions: { dataFn: () => Promise<T> }) {
  /**
   * Loading states
   */
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    const response = await handleApiRequest(apiOptions.dataFn());

    if (!response.success) {
      setError(true);
      setIsLoading(false);
      setMessage((response.message as string) || "Something went wrong");
      setStatusCode(response.status || 500);
      return;
    }
    setIsLoading(false);
    setIsSuccess(true);
    setData(response.data);

    return {
      success: response.success,
      data: response.data,
    };
  }

  return {
    execute,
    error,
    isLoading,
    isSuccess,
    message,
    statusCode,
    data,
  };
}
