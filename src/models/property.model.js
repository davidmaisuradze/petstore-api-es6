import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    attributes: [{type: Schema.Types.ObjectId}],
    isDeleted: {type: Boolean, default: false},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: true});

export default mongoose.model('properties', propertySchema);
