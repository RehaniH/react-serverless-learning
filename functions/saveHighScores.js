const Airtable = require("airtable");
const dotenv = require("dotenv");
dotenv.config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY || "",
});

const base = Airtable.base(process.env.AIRTABLE_BASE || "");
const table = base(process.env.AIRTABLE_TABLE || "");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "The method is not allowed" }),
    };
  }

  const { name, score } = JSON.parse(event.body);

  if (!score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad Request" }),
    };
  }
  let updatedRecord;
  try {
    const highScores = await table
      .select({
        sort: [{ field: "score", direction: "desc" }],
      })
      .firstPage();

    const formattedScores = highScores.map((record) => {
      return {
        id: record.id,
        fields: record.fields,
      };
    });

    const lowestRecord = formattedScores[9];
    console.log(lowestRecord);

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
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedRecord),
    };
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
