const ProductSchema = require('../model/ProductSchema');


const create = (req, resp) => {
    const product = new ProductSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        unitPrice: req.body.unitPrice,
        qtyOnHand: req.body.qtyOnHand
    });
    product.save().then(response => {
        resp.status(201).json({'message': 'product saved!'});
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const findById = (req, resp) => {
    const id = req.params.id;
    console.log("req.param.id : " + req.params.id)
    ProductSchema.findOne({_id: id}).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message': 'product not found!'});
    });
}

const update = async (req, resp) => {
    const id = req.params.id;

    console.log("update req.param.id : " + req.params.id)

    const updateData = await ProductSchema.findOneAndUpdate({_id: id}, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            unitPrice: req.body.unitPrice,
            qtyOnHand: req.body.qtyOnHand
        }
    }, {new: true});
    if (updateData) {
        resp.status(200).json({'message': 'product updated!'})
    } else {
        resp.status(500).json({'message': 'internal server error!'})
    }
}

const deleteById = async (req, resp) => {
    try {
        const id = req.params.id;
        console.log("req.param.id : " + req.params.id)
        const deleteData = await ProductSchema.findByIdAndDelete(id);

        if (deleteData) {
            resp.status(200).json({'message': 'product deleted!'})
        } else {
            resp.status(500).json({'message': 'internal server error!'})
        }
    } catch (e) {
        console.log(e)
        return resp.status(500).json({'message': 'internal server error!'});
    }
}
const findAll = async (req, resp) => {
    try {
        const {searchText, page = 1, size = 10} = req.query;
        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText};
        }
        const skip = (pageNumber - 1) * pageSize;

        // Await the result of the MongoDB query
        const data = await ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip);

        // Return the data as JSON
        return resp.status(200).json(data);
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};


const findAllMin = async (req, resp) => {
    try {
        // Await the result of the MongoDB query
        ProductSchema.find({qtyOnHand:{$lt:10}}).then(data=>{
            return resp.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};


const findCount = async (req, resp) => {
    try {
        // Await the result of the MongoDB query
        ProductSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};


module.exports = {
    create, findById, update, deleteById, findAll,findAllMin ,findCount
}