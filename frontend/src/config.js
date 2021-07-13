module.exports = (process.env.NODE_ENV === "production") ? {
  BASE_URL: "",
  BASE_API_URL: "",
} : {
  BASE_URL: "http://localhost:8080/",
  BASE_API_URL: "http://localhost:5118/",
}
