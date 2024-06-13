const OrderSchema = require('../model/OrderSchema');

const create = (req,resp)=>{
    const order = new OrderSchema({
        date: req.body.date,
        customerDetails: req.body.customerDetails,
        totalCost: req.body.totalCost,
        product: req.body.product
    });
    order.save().then(response => {
        resp.status(201).json({'message': 'order saved!'});
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const findById = (req,resp)=>{
    OrderSchema.findOne({'_id': req.param.id}).then(selectedObj => {
        if (selectedObj != null) {
            resp.status(200).json({'data': selectedObj})
        }
        resp.status(404).json({'message': 'order not found!'});
    });
}
const update = async (req, resp) => {
    const updateData = await OrderSchema.findOneAndUpdate({'_id': req.param.id}, {
        $set: {
            date: req.body.date,
            customerDetails: req.body.customerDetails,
            totalCost: req.body.totalCost,
            product: req.body.product
        }
    }, {new: true});
    if (updateData) {
        resp.status(200).json({'message': 'order updated!'})
    } else {
        resp.status(500).json({'message': 'internal server error!'})
    }
}
const deleteById = async (req, resp) => {
    const deleteData = await OrderSchema.findByIdAndDelete({'_id': req.param.id});

    if (deleteData) {
        resp.status(200).json({'message': 'order deleted!'})
    } else {
        resp.status(500).json({'message': 'internal server error!'})
    }
}
const findAll = async (req, resp) => {
    try {
        const { searchText, page = 1, size = 10 } = req.query;
        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageNumber - 1) * pageSize;

        // Await the result of the MongoDB query
        const data = await OrderSchema.find(query)
            .limit(pageSize)
            .skip(skip);

        // Return the data as JSON
        return resp.status(200).json(data);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: 'Internal server error!' });
    }
};

const findCount = async (req, resp) => {
    try {
        // Await the result of the MongoDB query
        OrderSchema.countDocuments().then(data=>{
            return resp.status(200).json(data);
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};

const findAllIncome = async (req, resp) => {
    try {
        // Await the result of the MongoDB query
        const result = await OrderSchema.aggregate([
            {$group:{
                _id:null,
                    totalCostSum:{$sum:'$totalCost'}
            }}
        ]);
        const totalCostSum = result.length>0?result[0].totalCostSum:0;
        return resp.json({totalCostSum});
    } catch (error) {
        console.log(error);
        resp.status(500).json({message: 'Internal server error!'});
    }
};



module.exports={
    create,findById,update,deleteById,findAll,findCount,findAllIncome
}