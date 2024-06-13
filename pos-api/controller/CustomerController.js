const CustomerSchema = require('../model/CustomerSchema');

const create = (req, resp) => {
    const customer = new CustomerSchema({
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    customer.save().then(response => {
        resp.status(201).json({'message': 'customer saved!'});
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const findById = (req, resp) => {
    const id = req.params.id;
    console.log("req.param.id : " + req.params.id)
    CustomerSchema.findOne({_id: id}).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message': 'customer not found!'});
    });

}
const update = async (req, resp) => {
    const id = req.params.id;
    console.log("update req.param.id : " + req.params.id)
    const updateData = await CustomerSchema.findOneAndUpdate({_id: id}, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            salary: rezq.body.salary
        }
    }, {new: true});
    if (updateData) {
        resp.status(200).json({'message': 'customer updated!'})
    } else {
        resp.status(500).json({'message': 'internal server error!'})
    }
}
const deleteById = async (req, resp) => {

    try {
        const id = req.params.id;
        console.log("req.param.id : " + req.params.id)
        const deleteData = await CustomerSchema.findByIdAndDelete(id);
        if (deleteData) {
            return resp.status(200).json({'message': 'customer deleted!'})
        } else {
            return resp.status(500).json({'message': 'internal server error!'})
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
        const response = await CustomerSchema.find(query)
            .limit(pageSize)
            .skip(skip);

        // Log the entire response
        console.log("response: ", response);

        // Return the data as JSON
        return resp.status(200).json(response);

    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};

const findCount = async (req, resp) => {
    try {
        // Await the result of the MongoDB query
        CustomerSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};


module.exports = {
    create, findById, update, deleteById, findAll ,findCount
}