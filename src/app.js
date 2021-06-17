const { createService } = require("./stem-service");
const app = createService();

app.listen(3000);
console.log("started")
