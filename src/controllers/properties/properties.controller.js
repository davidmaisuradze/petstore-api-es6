import HttpStatus from 'http-status';
import Property from '../../models/property.model';
import Category from '../../models/category.model';
import {arrayToTree} from "../../utils/array-to-tree";

export const getProperties = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        const properties = await Property.find({});

        categories.sort((a, b) => {
            if (a.parentId === null) {
                return 1;
            } else if (b.parentId === null) {
                return -1;
            } else if (a.parentId === b.parentId) {
                return 0;
            }
        });

        let treeList = [];
        let lookup = {};

        categories.forEach(obj => {
            const categoryProperties = properties.filter(x => obj.properties.map(item => item.toString()).includes(x._id.toString()));
            const propertiesTree = categoryProperties && categoryProperties.length ? arrayToTree(categoryProperties) : [];
            lookup[obj._id] = {...obj.toObject(), children: propertiesTree};
        });

        for (let item in lookup) {
            const obj = lookup[item];

            if (obj.parentId != null && lookup[obj.parentId]) {
                lookup[obj.parentId].children.push(obj);
            } else if (obj.parentId === null) {
                treeList.push(obj);
            }
        }

        res.status(HttpStatus.OK).json(treeList);
    } catch (err) {
        console.log(err, 'err');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const reqData = req.body;
        const property = new Property({
            name: reqData.name,
            title: reqData.title,
            parentId: reqData.parentId,
            userId: req.currentUser._id
        });
        const result = await property.save();

        const categoryUpdate = await Category.findOneAndUpdate(
            {_id: reqData.categoryId},
            {
                $push: {
                    properties: result._id
                }
            }
        );
        console.log(categoryUpdate, 'categoryUpdate');

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const updateProperty = (req, res, next) => {
    const reqData = req.body;
    Property.findOneAndUpdate(
        {_id: reqData.id},
        {
            $set: {
                name: reqData.name,
                title: reqData.title,
                parentId: reqData.parentId,
                categoryId: reqData.categoryId,
                userId: req.currentUser._id
            }
        },
        {upsert: true}
    )
        .then(result => {
            res.status(HttpStatus.OK).json(result);
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
};

export const deleteProperty = (req, res, next) => {
    Property.findOneAndDelete({_id: req.params.id})
        .then(result => res.status(HttpStatus.OK).json(result))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
};