import HttpStatus from 'http-status';
import Pet from '../../models/pet.model';

export const getPets = (req, res, next) => {
    let {page, pageSize} = req.query;
    Pet.find(
        {},
        '_id name title age price views createdAt',
        {
            sort: {createdAt: -1},
            skip: (page - 1) * pageSize,
            limit: pageSize
        })
        .then(pets => {
            res.status(HttpStatus.OK).json(pets);
        })
        .catch(err => res.json(HttpStatus.BAD_REQUEST).json(err));
};

export const getPetsCount = (req, res, next) => {
    Pet.count({})
        .then(count => {
            res.status(HttpStatus.OK).json(count);
        })
        .catch(cErr => res.json(HttpStatus.BAD_REQUEST).json(cErr));
};

export const createPet = (req, res, next) => {
    const reqData = req.body;
    const pet = new Pet({
        name: reqData.name,
        title: reqData.title,
        description: reqData.description,
        age: reqData.age,
        price: reqData.price,
        properties: reqData.properties,
        categoryId: reqData.categoryId,
        userId: req.currentUser._id
    });
    pet.save()
        .then(result => {
            res.status(HttpStatus.OK).json(result);
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
};

export const updatePet = (req, res, next) => {
    const reqData = req.body;
    Pet.findOneAndUpdate(
        {_id: reqData.id},
        {
            $set: {
                name: reqData.name,
                title: reqData.title,
                description: reqData.description,
                age: reqData.age,
                price: reqData.price,
                properties: reqData.properties,
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

export const deletePet = (req, res, next) => {
    Pet.findOneAndDelete({_id: req.params.id})
        .then(result => res.status(HttpStatus.OK).json(result))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json(err));
};