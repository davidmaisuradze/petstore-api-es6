import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const propertyAttributes = new Schema({
    value: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model('propertyAttributes', propertyAttributes);