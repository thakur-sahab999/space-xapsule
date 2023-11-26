async function fetchDelay(apiUrl) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(apiUrl);
  return response;
}
export async function getAPIData(queryString) {
  console.log("queryString", queryString);
  let apiUrl;
  if (queryString === "") {
    apiUrl = "https://api.spacexdata.com/v3/capsules";
  } else {
    apiUrl = `https://api.spacexdata.com/v3/capsules?${queryString}`;
  }

  const response = await fetchDelay(apiUrl);
  if (!response.ok) {
    throw new Error("API request failed");
  }
  const data = await response.json();
  return data;
}
