const apiUrl = "https://example.com/api/nationalities";

export const fetchNationalities = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const nationalities = data.nationalities; // Assuming the API response has a field called "nationalities"
      return nationalities;
    } else {
      throw new Error("Failed to fetch nationalities.");
    }
  } catch (error) {
    console.error("Error fetching nationalities:", error);
    return [];
  }
};
