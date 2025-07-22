const Airtable = require("airtable");
const dotenv = require("dotenv");
dotenv.config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY || "",
});

const base = Airtable.base(process.env.AIRTABLE_BASE || "");
const table = base(process.env.AIRTABLE_TABLE || "");

const getHighScores = async (isEmptyFilterRequired) => {
  const query = {
    sort: [{ field: "score", direction: "desc" }],
  };
  if (isEmptyFilterRequired) {
    query.filterByFormula = `AND(name != '', score > 0)`;
  }
  const highScores = await table.select(query).firstPage();

  const formattedScores = highScores.map((record) => {
    return {
      id: record.id,
      fields: record.fields,
    };
  });
  return formattedScores;
};

module.exports = {
  table,
  getHighScores,
};
