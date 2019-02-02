import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {type: String, required: true},
    title: {type: String},
    type:{type:String, default:'property'},
    parentId: {type: Schema.Types.ObjectId, default:null},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps:true});

export default mongoose.model('properties', propertySchema);
