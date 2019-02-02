import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    age: {type: Number},
    price: {type: Number, default: 0},
    views: {type: Number, default: 0},
    properties: {type: Array, default: []},
    categoryId: {type: Schema.Types.ObjectId, required: true},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps:true});

export default mongoose.model('pets', petSchema);