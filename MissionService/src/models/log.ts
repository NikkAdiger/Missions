import { model, Model, Schema, Document } from 'mongoose';

export interface ILog extends Document {
    date: number;
    status: number;
    method: string;
    route: string;
    data?: Object,
    error?: string
}

export const LogSchema: Schema = new Schema({
    date: {
        type: Number,
        default: Date.now()
    },
    status: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true        
    },
    data: {
        type: Object,    
    },
    error: {
        type: String       
    }
})

export const Log: Model<ILog> = model<ILog>('Log', LogSchema);