import Artist from "../models/ArtistSchema.js";

// Step 1: Fetch All Approved Artists
const fetchApprovedArtists = async () => {
  try {
    const artists = await Artist.find({ isApproved: "approved" }).select(
      "-password"
    );
    return artists;
  } catch (error) {
    console.error("Failed to fetch approved artists:", error);
    throw new Error("Failed to fetch approved artists");
  }
};

// Step 2: Sort Artists by Average Rating
const sortArtistsByAverageRating = (artists) => {
  return artists.sort((a, b) => b.averageRating - a.averageRating);
};

// Step 3: Categorize Artists by Rating
const categorizeArtistsByRating = (sortedArtists) => {
  const categorizedArtists = {
    5: [],
    4: [],
    3: [],
    2: [],
    1: [],
    0: [],
  };

  sortedArtists.forEach((artist) => {
    const rating = Math.floor(artist.averageRating); // Get the integer part of the rating
    if (rating >= 0 && rating <= 5) {
      categorizedArtists[rating].push(artist);
    }
  });

  return categorizedArtists;
};

// Step 4: Create the Recommendation List
const createRecommendationList = (categorizedArtists) => {
  return [
    ...categorizedArtists[5],
    ...categorizedArtists[4],
    ...categorizedArtists[3],
    ...categorizedArtists[2],
    ...categorizedArtists[1],
    ...categorizedArtists[0],
  ];
};

// Full Recommendation Algorithm
const collaborativeFilteringAlgorithm = async () => {
  try {
    const approvedArtists = await fetchApprovedArtists();
    const sortedArtists = sortArtistsByAverageRating(approvedArtists);
    const categorizedArtists = categorizeArtistsByRating(sortedArtists);
    const recommendationList = createRecommendationList(categorizedArtists);
    return recommendationList;
  } catch (error) {
    console.error("Failed to process artists:", error);
    throw new Error("Failed to process artists");
  }
};

export default collaborativeFilteringAlgorithm;
