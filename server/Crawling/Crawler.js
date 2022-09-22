import iconv from "iconv-lite";
import axios from "axios";

export const crawlerDecode = async (URI, decoding) => {
  try {
    let result = await axios.get(`${URI}`, { responseType: "arraybuffer" });
    const decodedResult = iconv.decode(result.data, `${decoding}`).toString();
    return decodedResult;
  } catch (error) {
    console.log(error);
  }
};
export const crawler = async (URI) => {
  try {
    let result = await axios.get(`${URI}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
