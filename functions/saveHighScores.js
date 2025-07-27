const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "The method is not allowed" }),
    };
  }

  const { name, score } = JSON.parse(event.body);

  if (typeof score === "undefined" || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad Request" }),
    };
  }
  let updatedRecord;
  try {
    const highScores = await getHighScores(false);

    const lowestRecord = highScores[9];
    console.log(highScores);

    if (
      typeof lowestRecord.fields.score === "undefined" ||
      lowestRecord.fields.score < score
    ) {
      updatedRecord = {
        id: lowestRecord.id,
        fields: {
          name,
          score,
        },
      };

      await table.update([updatedRecord]);
      return {
        statusCode: 201,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: error.message || "Failed to store record in highscores",
      }),
    };
  }
};
// This function simulates fetching high scores and returns them in the response.
