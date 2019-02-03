import HttpStatus from 'http-status';
import Property from '../../models/property.model';
import Category from '../../models/category.model';
import {arrayToTree, sortTree} from "../../utils/array-to-tree";
import {updatePropertyService} from "../../services/properties/properties.service";

export const getPropertiesTree = async (req, res, next) => {
    try {
        let properties = await Property.find({isDeleted: false});
        properties = sortTree(arrayToTree(properties));

        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        const result = properties.filter(x => category.filterProperties.includes(x._id));

        res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const reqData = req.body;
        const maxOrder = await Property.findOne(
            {},
            'order',
            {sort: {order: -1}, limit: 1});

        // set property data
        const property = new Property({
            title: reqData.title,
            order: maxOrder ? maxOrder.order + 1 : 1,
            parentId: reqData.parentId,
            type: reqData.type,
            userId: req.currentUser._id
        });

        // save property
        const result = await property.save();

        const category = await Category.findOneAndUpdate(
            {_id: reqData.categoryId},
            {
                $push: {filterProperties: property._id}
            }
        );

        return res.status(HttpStatus.OK).json({property: result, category: category});
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const updateProperty = async (req, res, next) => {
    try {
        const reqData = req.body;

        const result = await Property.findOneAndUpdate(
            {_id: reqData.id},
            {
                $set: {
                    title: reqData.title,
                    type: reqData.type,
                    userId: req.currentUser._id,
                }
            },
            {upsert: true, new: true}
        );

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};

export const updatePropertyParent = async (req, res, next) => {
    try {
        const reqData = req.body;
        const userId = req.currentUser._id;
        let order = 0;

        if (!reqData.prevSiblingId) {
            order = 1;
        } else {
            const sibling = await Property.findById(reqData.prevSiblingId);
            order = sibling.order + 1;

            // find and update all siblings with ordering greater than previous sibling
            const updatedSiblings = await Property.updateMany(
                {parentId: reqData.parentId, order: {$gt: sibling.order}},
                {$inc: {order: 1}, $set: {userId: req.currentUser._id}}
            );
        }

        // find and update current category
        return await updatePropertyService(res, reqData, order, userId);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};

export const deleteProperty = async (req, res, next) => {
    try {
        const result = await Property.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    isDeleted: true
                }
            });

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};


