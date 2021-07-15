module.exports = (process.env.NODE_ENV === "production") ? {
  BASE_API_URL: "",
} : {
  BASE_API_URL: "http://localhost:5118/",
}
