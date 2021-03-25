import mongoose from 'mongoose';
import * as env from '../config';

// export let connectMongoose;
const { environment } = env;
const mongooseUri = environment.mongoDB.uri;

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('Mongo Connection Established');
});
connection.on('reconnected', () => {
    console.log('Mongo Connection Reestablished');
});
connection.on('disconnected', () => {
    console.log('Mongo Connection Disconnected');
    console.log('Trying to reconnect to Mongo ...');
    setTimeout(() => {
        run();
    }, 3000);
});
connection.on('close', () => {
    console.log('Mongo Connection Closed');
});
connection.on('error', (error: Error) => {
    console.log('Mongo Connection ERROR: ' + error);
});

export async function run() {
    try {
        await mongoose.connect(mongooseUri, {
            keepAlive: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error(`Mongo Connection ERROR: ${error}`);
        setTimeout(() => {
            run();
        }, 3000);
    }
};