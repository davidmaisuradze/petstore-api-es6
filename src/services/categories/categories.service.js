import Category from "../../models/category.model";
import HttpStatus from "http-status";

export const getAllCategories = (req, res, next) => {
    Category.find(
        {isDeleted: false},
        '_id name title order parentId'
    )
        .then(categories => {
            categories.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });

            res.status(HttpStatus.OK).json(categories);
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
};

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
