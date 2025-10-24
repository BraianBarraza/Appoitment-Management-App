import {parse, formatISO, startOfDay, endOfDay, isValid} from "date-fns"
import {handleNotFoundError, validateObjectId} from "../utils/index.js"
import Appointment from '../models/Appointment.js';

const createAppointment = async (req, res) => {
    const appointment = req.body;
    appointment.user = req.user._id.toString();
    try {
        const newAppointment = new Appointment(appointment);
        await newAppointment.save();

        res.json({
            message: 'Appointment created successfully',
        })
    } catch (err) {
        console.error(err);
    }
}

const getAppointmentsByDate = async (req, res) => {
    const {date} = req.query;
    const newDate = parse(date, 'dd/MM/yyyy', new Date());

    if (!isValid(newDate)) {
        const error = new Error('Invalid date');
        return res.status(400).json({
            msg: error.message,
        })
    }

    const isoDate = formatISO(newDate)
    const appointments = await Appointment.find({
        date: {
            $gte: startOfDay(new Date(isoDate)),
            $lte: endOfDay(new Date(isoDate))
        }
    }).select('time')
    res.json(appointments);
}

const getAppointmentsById = async (req, res) => {
    const {id} = req.params;
    //Validate ObjectId
    if(validateObjectId(id, res)) return;

    //validate if appointment exists
    const appointment = await Appointment.findById(id).populate('services');
    if(!appointment){
        return handleNotFoundError('Appointment not found', res);
    }

    //user validation
    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('Unauthorized User');
        return res.status(403).json({
            error: error.message,
        })
    }

    res.json(appointment);
}

const updateAppointment = async (req, res) => {
    const {id} = req.params;
    //Validate ObjectId
    if(validateObjectId(id, res)) return;

    //validate if appointment exists
    const appointment = await Appointment.findById(id).populate('services');
    if(!appointment){
        return handleNotFoundError('Appointment not found', res);
    }

    //user validation
    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('Unauthorized User');
        return res.status(403).json({
            error: error.message,
        })
    }

    const {date, time, totalAmount, services} = req.body;
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try{
        const result = await appointment.save();
        res.json({
            message: 'Appointment updated successfully',
        })
    }catch(err){
        console.error(err);
    }
}

const deleteAppointment = async (req, res) => {
    const {id} = req.params;
    //Validate ObjectId
    if(validateObjectId(id, res)) return;

    //validate if appointment exists
    const appointment = await Appointment.findById(id).populate('services');
    if(!appointment){
        return handleNotFoundError('Appointment not found', res);
    }

    //user validation
    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('Unauthorized User');
        return res.status(403).json({
            error: error.message,
        })
    }

    try{
        await appointment.deleteOne()
        res.json({message: 'Appointment deleted successfully'})
    }catch (err){
        console.error(err);
    }
}

export {
    createAppointment,
    getAppointmentsByDate,
    getAppointmentsById,
    updateAppointment,
    deleteAppointment
}