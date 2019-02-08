import HttpStatus from 'http-status';
import Category from '../../models/category.model';
import Property from '../../models/property.model';

export const getProperties = async (req, res, next) => {
    try {
        const properties = await Property.find({}, null, {sort: {type: 1, title: 1}});
        return res.status(HttpStatus.OK).json(properties);
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const getByCategoryId = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);

        if (category) {
            const properties = await Property.find(
                {_id: {$in: category.filterProperties}}, null,
                {sort: {type: 1, title: 1}}
            );

            return res.status(HttpStatus.OK).json(properties);
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json('category not found');
        }
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const createProperty = async (req, res, next) => {
    try {
        const reqData = req.body;

        const checkProperty = await Property.findOne({title: reqData.title});
        if (checkProperty) {
            return res.status(HttpStatus.BAD_REQUEST).json('property already exists');
        }

        // set property data
        const property = new Property({
            title: reqData.title,
            type: reqData.type,
            attributes: reqData.attributes,
            userId: req.currentUser._id
        });

        // save property
        const result = await property.save();

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        console.log(err);
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
                    attributes: reqData.attributes,
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

export const deleteProperty = async (req, res, next) => {
    try {
        const result = await Property.findOneAndDelete({_id: req.params.id});

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};


