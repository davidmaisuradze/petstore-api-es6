import HttpStatus from 'http-status';
import Property from '../../models/property.model';
import PropertyAttribute from '../../models/property-attribute.model';

export const getAttributes = async (req, res, next) => {
    try {
        const propertyAttributes = await PropertyAttribute.find({}, null, {sort: {type: 1, value: 1}});
        console.log(propertyAttributes, 'propertyAttributes');
        res.status(HttpStatus.OK).json(propertyAttributes);
    } catch (err) {
        console.log(err, 'err');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const getPropertyAttributesByPropertyId = async (req, res, next) => {
    try {
        const propertyId = req.params.propertyId;
        const property = await Property.findById(propertyId);

        let propertyAttributes = [];
        if (property.attributes && property.attributes.length) {
            propertyAttributes = await PropertyAttribute.aggregate([
                {
                    $match: {
                        _id: ObjectId(propertyId)
                    }
                },
                {
                    $group: {
                        _id: '$type',
                        data: {$push: '$$ROOT'}
                    }
                },
                {$sort: {name: 1}}
            ]);
        }

        return res.status(HttpStatus.OK).json(propertyAttributes);
    } catch (err) {
        console.log(err, 'err');
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const createPropertyAttribute = async (req, res, next) => {
    try {
        const reqData = req.body;
        const propertyAttribute = new PropertyAttribute({
            value: reqData.value,
            type: reqData.type,
            userId: req.currentUser._id
        });

        const result = await propertyAttribute.save();

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const updatePropertyAttribute = async (req, res, next) => {
    try {
        const reqData = req.body;

        const result = await PropertyAttribute.findOneAndUpdate(
            {_id: reqData.id},
            {
                $set: {
                    value: reqData.value,
                    type: reqData.type,
                    userId: req.currentUser._id
                }
            },
            {upsert: true, new: true}
        );

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};

export const deletePropertyAttribute = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await PropertyAttribute.findOneAndDelete({_id: id});

        return res.status(HttpStatus.OK).json(result);
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};