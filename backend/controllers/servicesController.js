import Services from "../models/Services.js";
import {handleNotFoundError, validateObjectId} from "../utils/index.js";

const createService = async (req, res) => {
    const {name, price} = req.body;
    if (!name || price === undefined || price === null) {
        const error = new Error('All fields are required');
        return res.status(400).json({
            msg: error.message,
        })
    }

    try {
        const service = new Services({name, price});
        await service.save()
        res.json({
            msg: "Service created successfully",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while creating the service'})
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.json({services})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while fetching services'})
    }
}

const getServiceById = async (req, res) => {
    const {id} = req.params
    //validate if it is an ObjectId
    if (validateObjectId(id, res)) return

    try {
        //validate the existence of the id
        const service = await Services.findById(id)
        if (!service) {
            return handleNotFoundError(`Service not found`, res)
        }
        //show the service
        res.json(service)
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while fetching the service'})
    }
}

const updateService = async (req, res) => {
    const {id} = req.params
    //validate the existence of the id
    if (validateObjectId(id, res)) return

    try {
        //validate the existence of the service
        const service = await Services.findById(id)
        if (!service) {
            return handleNotFoundError(`Service not found`, res)
        }

        //update the service values (use ?? to allow 0 as a valid price)
        service.name = req.body.name ?? service.name
        service.price = req.body.price ?? service.price

        await service.save()
        res.json({
            msg: "Service updated successfully",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while updating the service'})
    }
}

const deleteService = async (req, res) => {

    const {id} = req.params
    //validate the existence of the id
    if (validateObjectId(id, res)) return

    try {
        //validate the existence of the service
        const service = await Services.findById(id)
        if (!service) {
            return handleNotFoundError(`Service not found`, res)
        }

        //delete the service values
        await service.deleteOne()
        res.json({
            msg: "Service deleted successfully",
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while deleting the service'})
    }
}

export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}
