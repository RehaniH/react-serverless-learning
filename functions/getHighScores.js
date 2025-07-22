const Airtable = require("airtable");
const dotenv = require("dotenv");
dotenv.config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY || "",
});

const base = Airtable.base(process.env.AIRTABLE_BASE || "");
const table = base(process.env.AIRTABLE_TABLE || "");

exports.handler = async (event) => {
  try {
    const highScores = await table
      .select({
        sort: [{ field: "score", direction: "desc" }],
        filterByFormula: `AND(name != '', score > 0)` })
      .firstPage();

    const formattedScores = highScores.map((record) => {
      return {
        id: record.id,
        feilds: record.fields,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(formattedScores),
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
