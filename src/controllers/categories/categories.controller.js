import HttpStatus from 'http-status';
import Category from '../../models/category.model';
import {updateCategoryService} from "../../services/categories/categories.service";
import {arrayToTree, sortTree} from "../../utils/array-to-tree";

export const getCategoriesTree = async (req, res, next) => {
    try {
        let categories = await Category.find({isDeleted: false});
        categories = sortTree(arrayToTree(categories));

        res.status(HttpStatus.OK).json(categories);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const getCategories = async (req, res, next) => {
    try {
        let categories = await Category.find(
            {isDeleted: false},
            '_id name title order parentId'
        );

        categories.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        return res.status(HttpStatus.OK).json(categories);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const reqData = req.body;
        const maxOrder = await Category.findOne(
            {},
            'order',
            {sort: {order: -1}, limit: 1});

        // set category data
        const category = new Category({
            title: reqData.title,
            order: maxOrder ? maxOrder.order + 1 : 1,
            parentId: reqData.parentId,
            type: reqData.type,
            userId: req.currentUser._id
        });

        // save category
        const result = await category.save();
        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err)
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const reqData = req.body;
        console.log(reqData, 'updateCategoryReqData');

        const result = await Category.findOneAndUpdate(
            {_id: reqData.id},
            {
                $set: {
                    title: reqData.title,
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

export const updateCategoryParent = async (req, res, next) => {
    try {
        const reqData = req.body;
        const userId = req.currentUser._id;
        let order = 0;

        console.log(reqData, 'reqData');
        if (!reqData.prevSiblingId) {
            order = 1;
        } else {
            const sibling = await Category.findById(reqData.prevSiblingId);
            order = sibling.order + 1;

            console.log(sibling, 'sibling');
            // find and update all siblings with ordering greater than previous sibling
            const updatedSiblings = await Category.updateMany(
                {parentId: reqData.parentId, order: {$gt: sibling.order}},
                {$inc: {order: 1}, $set: {userId: req.currentUser._id}}
            );
            console.log(updatedSiblings, 'updatedSiblings');
        }

        // find and update current category
        return await updateCategoryService(res, reqData, order, userId);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const result = await Category.findOneAndUpdate(
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


