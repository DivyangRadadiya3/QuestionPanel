import { useState, useRef, useCallback } from "react";

// Utility function for debouncing API requests
export const useDebouncedApiRequest = (apiFunction, debounceDelay = 500) => {
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const debounceTimeoutRef = useRef(null);

  const handleApiRequest = useCallback(
    async (params) => {
      setIsLoading(true);
      setNetworkError("");

      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await apiFunction({ ...params, signal });

        if (!response) {
          console.log("No data received");
          return;
        }

        // Return the successful response data
        return response;
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Failed to fetch data.", error);
          setNetworkError(error.message || "Unknown error");
        }
      } finally {
        setIsLoading(false);
      }

      // Cleanup function to abort the fetch
      return () => {
        controller.abort();
      };
    },
    [apiFunction]
  );

  const debouncedRequest = useCallback(
    (params) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current); // Clear previous timeout
      }

      debounceTimeoutRef.current = setTimeout(() => {
        handleApiRequest(params);
      }, debounceDelay);
    },
    [handleApiRequest, debounceDelay]
  );

  return {
    isLoading,
    networkError,
    debouncedRequest,
  };
};
