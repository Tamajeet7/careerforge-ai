import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
==================================
🚀 CareerForge Backend Started
🌍 http://localhost:${PORT}
==================================
`);
});