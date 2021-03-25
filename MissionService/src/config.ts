import * as configEnv  from 'dotenv';
configEnv.config();
 
const basicConfig = {
    production: false,
    release: false,

    encryptionType: 'aes-256-ctr',
    encryptionEncoding: 'base64',
    bufferEncryption: 'utf-8'
};

const connection = {
    dev: {
        webServer: {
            host: '0.0.0.0',
            port: 3030
        },

        mongoDB: {
            uri: 'mongodb+srv://user:123@cluster0.8dscf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        },

        AesKey: 'ABCDEFGHJKLMNOPQRSTUVWXYZABCDEF'
    },

    release: {
        webServer: {
            host: '0.0.0.0',
            port: 3010
        },

        mongoDB: {
            uri: 'mongodb+srv://user:123@cluster0.8dscf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        },
    },

    production: {
        webServer: {
            host: process.env.HOST,
            port: process.env.PORT
        },

        mongoDB: {
            uri: process.env.MONGODB_URI
        },
    }
}

export let environment;
if (basicConfig.production) {
    environment = Object.assign(basicConfig, connection.production)
} else if (basicConfig.release) {
    environment = Object.assign(basicConfig, connection.release)
} else {
    environment = Object.assign(basicConfig, connection.dev);
};