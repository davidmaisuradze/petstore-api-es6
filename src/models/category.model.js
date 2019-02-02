import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {type: String, default: ''},
    order: {type: Number, default: 0},
    isDeleted: {type: Boolean, default: false},
    parentId: {type: Schema.Types.ObjectId, default:null},
    properties: [{type: Schema.Types.ObjectId}],
    type:{type:String, default: 'category'},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: true});

export default mongoose.model('categories', categorySchema);
