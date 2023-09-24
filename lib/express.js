//ExpressJS
const express = require("express");
const app = express();
const port = 3000;

//<========== Start Expressjs ==========>
app.get("/", (req, res) => {
  res.send("Bot in ready");
});

app.listen(port, () =>
  console.log(`Example app listening on port http://127.0.0.1:${port}/`),
);
//<========== End Expressjs ==========>
