async function handleResponse(response) {
  if (!response.ok) {
    return {
      status: false,
      error: response.statusText || "Request Error",
      statusCode: response.status,
    };
  }

  const data = await response.json();
  return { status: true, data };
}

const dataFetcher = {
  get: async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
      return handleResponse(response);
    } catch (error) {
      return { status: false, error: error.message || "Network Error" };
    }
  },
};

export default dataFetcher;
