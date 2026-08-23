const url = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3050").replace(
  /\/$/,
  ""
);

export default url;
