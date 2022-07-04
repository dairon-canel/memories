import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // GOOGLE TOKEN => 101812741113512873136
    // GOOGLE LEN => 21

    // CUSTOM TOKEN => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydG9nb256QGdtYWlsLmNvbSIsImlkIjoiNjJjMGM4NTIwYTJjYjRjM2RmYjMxYzBjIiwiaWF0IjoxNjU2ODU3MjkxLCJleHAiOjE2NTY4NjA4OTF9.UZ2iDbAd0V2XpxsEBbzI7Wmx94yBMerf1vwWo8EdAuQ
    // CUSTOM LEN => 213
    const isCustomAuth = token.length > 50;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      req.userId = token ? token : null;
      /* decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; */
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
