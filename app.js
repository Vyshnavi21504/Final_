const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ✅ Replace these with your details
const FULL_NAME = "john_doe";
const DOB = "17091999"; // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// ----------------------------------
// POST /bfhl route
// ----------------------------------
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array.",
      });
    }

    let oddNumbers = [];
    let evenNumbers = [];
    let alphabets = [];
    let specialCharacters = [];
    let sum = 0;
    let concatString = "";

    data.forEach((item) => {
      if (!isNaN(item)) {
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        const upper = item.toUpperCase();
        alphabets.push(upper);
        concatString = upper + concatString;
      } else {
        specialCharacters.push(item);
      }
    });

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("✅ REST API is working. Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`👉 Use this URL in Postman for POST: http://localhost:${PORT}/bfhl`);
});
