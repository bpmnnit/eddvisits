
import { AES } from "crypto-es/lib/aes";
import { Utf8 } from "crypto-es/lib/core";

const SECRET_KEY = "harekrishnaharekrishnakrishnakrishnaharehare";

class CryptService {

  encrypt(text) {
    const encrypted = AES.encrypt(text, SECRET_KEY);
    return encrypted.toString();
  }

  decrypt(encryptedText) {
    const decrypted = AES.decrypt(encryptedText, SECRET_KEY);
    return decrypted.toString(Utf8);
  }

};

const cryptService = new CryptService();
export default cryptService;