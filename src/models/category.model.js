import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {type: String, required: true, unique: true},
    order: {type: Number, default: 0},
    isDeleted: {type: Boolean, default: false},
    filterProperties: [{type: Schema.Types.ObjectId}],
    parentId: {type: Schema.Types.ObjectId, default: null},
    userId: {type: Schema.Types.ObjectId, required: true}
}, {timestamps: true});

export default mongoose.model('categories', categorySchema);
