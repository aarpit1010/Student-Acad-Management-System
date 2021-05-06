const app = require("./app");

app.listen(3001 || process.env.PORT, () => console.log("Server Up and Running"));