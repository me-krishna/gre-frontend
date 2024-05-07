import CryptoJS from "crypto-js";
const secretPass = process.env.REACT_APP_ENCODE_KEY as string;

export const encryptData = (inp: any) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(inp),
    secretPass
  ).toString();
  return data
};

export const decryptData = (inp: string) => {
  const bytes = CryptoJS.AES.decrypt(inp, secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data
};
