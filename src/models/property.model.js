import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: {type: String, required: true},
    order: {type: Number, default: 0},
    isDeleted: {type: Boolean, default: false},
    type: {type: String, required: true},
    parentId: {type: Schema.Types.ObjectId, default: null},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: true});

export default mongoose.model('properties', propertySchema);
