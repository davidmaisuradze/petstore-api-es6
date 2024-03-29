import Category from "../../models/category.model";
import HttpStatus from "http-status";

export const updateCategoryService = async (res, reqData, order, userId) => {
    try {

        const category = await Category.findOneAndUpdate(
            {_id: reqData.id},
            {
                $set: {
                    parentId: reqData.parentId,
                    order: order,
                    userId: userId
                }
            }
        );
        return res.status(HttpStatus.OK).json(category);
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};
