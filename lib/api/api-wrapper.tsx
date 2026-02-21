import { ApiError } from "@/lib/api";

export async function handleApiRequest<T>(promise: Promise<T>) {
  try {
    const response = await promise;
    return {
      data: response,
      success: true as const,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false as const,
        message: error.message || "Something went wrong",
        status: error.status,
        data: null,
      };
    } else {
      return {
        success: false as const,
        message: new ApiError("Unexpected Error", 500),
        status: 500,
        data: null,
      };
    }
  }
}
