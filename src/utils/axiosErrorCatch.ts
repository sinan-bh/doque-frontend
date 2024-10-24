import axios from "axios";

export const axiosErrorCatch = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // If the error is an Axios error
    if (error.response) {
      return (
        error.response.data?.message ||
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      return "No response received from the server. Please try again later.";
    } else {
      return `Error in request setup: ${error.message}`;
    }
  } else if (error instanceof Error) {
    return `Error: ${error.message}`;
  } else {
    return "An unknown error occurred. Please try again.";
  }
};
