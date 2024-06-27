import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

interface ApiResponse<T> {
  results: T;
}
export default async function fetchGallery<T>(
  query: string,
  page: number
): Promise<T> {
  try {
    const response = await axios.get<ApiResponse<T>>("/search/photos", {
      params: {
        client_id: "idQEMAAxVDoA0_AnEYE8eUrxYtdMT7nnnEwA8ceawAU",
        query,
        page,
        per_page: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
}

// aNotxHfou_iYUfpZtKGu2_JGjUf1g1iV - dle7hDUolg
