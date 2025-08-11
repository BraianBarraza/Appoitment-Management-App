import Services from "../models/Services.js";
import {handleNotFoundError, validateObjectId} from "../utils/index.js";

const createService = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Please are fields are required');

        return res.status(400).json({
            msg: error.message,
        })
    }

    try {
        const service = new Services(req.body);
        const result = await service.save()
        res.json({
            msg: "Service created successfully",
        })

    } catch (err) {
        console.log(err);
    }

}

const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.json({services})
    } catch (err) {
        console.log(err);
    }
}

const getServiceById = async (req, res) => {
    const {id} = req.params
    //validate if it is an ObjectId
    if (validateObjectId(id, res)) return
    //validate the existence of the id
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError(`Service not found`, res)
    }
    //show the service
    res.json(service)
}

const updateService = async (req, res) => {
    const {id} = req.params
    //validate the existence of the id
    if (validateObjectId(id, res)) return

    //validate the existence of the service
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError(`Service not found`, res)
    }

    //update the service values
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()
        res.json({
            msg: "Service updated successfully",
        })
    } catch (err) {
        console.log(err);
    }
}

const deleteService = async (req, res) => {

    const {id} = req.params
    //validate the existence of the id
    if (validateObjectId(id, res)) return

    //validate the existence of the service
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError(`Service not found`, res)
    }

    //delete the service values
    try {
        await service.deleteOne()
        res.json({
            msg: "Service deleted successfully",
        })
    } catch (err) {
        console.log(err);
    }
}

export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}