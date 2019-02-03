import Property from "../../models/property.model";
import HttpStatus from "http-status";

export const updatePropertyService = async (res, reqData, order, userId) => {
    try {

        const property = await Property.findOneAndUpdate(
            {_id: reqData.id},
            {
                $set: {
                    parentId: reqData.parentId,
                    type: reqData.type,
                    order: order,
                    userId: userId
                }
            }
        );
        return res.status(HttpStatus.OK).json(property);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
}
