exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, World!",
    }),
  };

  return response;
};
