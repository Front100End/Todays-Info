const request = require("request");
const iconv = require("iconv-lite");
const charset = require("charset");
const axios = require("axios");

const crawlerDecode = async (URI, decoding) => {
  try {
    let result = await axios.get(`${URI}`, { responseType: "arraybuffer" });
    const decodedResult = iconv.decode(result.data, `${decoding}`).toString();
    return decodedResult;
  } catch (error) {
    console.log(error);
  }
};
const crawler = async (URI, decoding) => {
  try {
    let result = await axios.get(`${URI}`, { responseType: "arraybuffer" });
    const decodedResult = iconv.decode(result.data, `${decoding}`).toString();
    return decodedResult;
  } catch (error) {
    console.log(error);
  }
};

module.exports = crawlerDecode;
module.exports = crawler;
