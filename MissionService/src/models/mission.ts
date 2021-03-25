import { model, Model, Schema, Document } from 'mongoose';

export interface IMission extends Document {
    key: string;
    value: JSON;
}

export const MissionSchema: Schema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: JSON,
        required: true
    }
})

export const Mission: Model<IMission> = model<IMission>('Mission', MissionSchema);