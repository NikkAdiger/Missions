import * as configEnv  from 'dotenv';
configEnv.config();
 
const basicConfig = {
    production: false,
    release: false,
    missionRoute: 'api/v1/mission',
    encryptionType: 'aes-256-ctr',
    encryptionEncoding: 'base64',
    bufferEncryption: 'utf-8'
};

const connection = {
    dev: {
        webServer: {
            host: '0.0.0.0',
            port: 3000
        },

        missionServer: {
            protocol: 'http',
            host: '0.0.0.0',
            port: 3030
        },

        mongoDB: {
            uri: 'mongodb+srv://user:123@cluster0.8dscf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        },

        AesKey: 'ABCDEFGHJKLMNOPQRSTUVWXYZABCDEF',
        jwtSecret: 'mySecretMission'
    },

    release: {
        webServer: {
            host: '0.0.0.0',
            port: 3020
        },

        missionServer: {
            protocol: 'http',
            host: '0.0.0.0',
            port: 3030
        },

        mongoDB: {
            uri: 'mongodb+srv://user:123@cluster0.8dscf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        },

        AesKey: 'ABCDEFGHJKLMNOPQRSTUVWXYZABCDEF',
        jwtSecret: 'mySecretMission'
    },

    production: {
        webServer: {
            host: process.env.HOST,
            port: process.env.PORT
        },

        missionServer: {
            protocol: process.env.PROTOCOL,
            host: process.env.MISSION_HOST,
            port: process.env.MISSION_PORT
        },

        mongoDB: {
            uri: process.env.MONGODB_URI
        },

        AesKey: process.env.AES_KEY,
        jwtSecret: process.env.JWT_KEY
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