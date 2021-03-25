import * as crypto from 'crypto';
import * as env from '../config';
const { environment } = env;

const { AesKey, encryptionType, encryptionEncoding, bufferEncryption } = environment;
const IV_LENGTH = 16;

class AesEncryption {

    encrypt(jsonObject: Object): string {
        let result = '';
        try {
            const val = JSON.stringify(jsonObject);
            let iv = crypto.randomBytes(IV_LENGTH);
            const key = crypto.createHash('sha256').update(String(AesKey)).digest(encryptionEncoding).substr(0, 32);
            const mykey = crypto.createCipheriv(encryptionType, key, iv);
            let encrypted = mykey.update(val);
            encrypted = Buffer.concat([encrypted, mykey.final()]);
            result = iv.toString(encryptionEncoding) + ':' + encrypted.toString(encryptionEncoding);
        } catch (error) {
            console.error(`Error encrypt: ${error.message}`);          
        }
        return result;
    }

    decrypt(str: string): any {
    let result = {};
        try {
            const textParts = str.split(':');
            const iv = Buffer.from(textParts.shift(), encryptionEncoding);
            const encryptedText = Buffer.from(textParts.join(':'), encryptionEncoding);
            const key = crypto.createHash('sha256').update(String(AesKey)).digest(encryptionEncoding).substr(0, 32);
            const decipher = crypto.createDecipheriv(encryptionType, key, iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            const mystr =  decrypted.toString();
            result = JSON.parse(mystr);
        } catch (error) {
            console.error(`Error decrypt: ${error.message}`);
        }
        return result;
      }
}

export default new AesEncryption;