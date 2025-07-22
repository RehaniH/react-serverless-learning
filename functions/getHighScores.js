const { getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  try {
    const highScores = await getHighScores(true);

    return {
      statusCode: 200,
      body: JSON.stringify(highScores),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: error.message || "An error occurred while fetching high scores.",
      }),
    };
  }
};
// This function simulates fetching high scores and returns them in the response.
