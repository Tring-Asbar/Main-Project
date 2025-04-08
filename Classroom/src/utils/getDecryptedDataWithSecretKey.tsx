import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_ENCRYPT_SECRET_KEY;

const getDecryptedDataWithSecretKey = (cipherText: string): {
  originalText: string;
} => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey as string);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return { originalText };
  } catch (error) {
    console.error("Decryption failed:", error);
    return { originalText: "" };
  }
};

export default getDecryptedDataWithSecretKey;
