import {parse, formatISO, startOfDay, endOfDay, isValid} from "date-fns"
import {handleNotFoundError, validateObjectId} from "../utils/index.js"
import Appointment from '../models/Appointment.js';
import {
    sendEmailDeletedAppointment,
    sendEmailNewAppointment,
    sendEmailUpdateAppointment
} from "../emails/appointmentEmailService.js";
import {formatDate} from "../utils/index.js";

const createAppointment = async (req, res) => {
    const {services, date, time, totalAmount} = req.body;

    try {
        const newAppointment = new Appointment({
            services,
            date,
            time,
            totalAmount,
            user: req.user._id.toString()
        });
        const result = await newAppointment.save();

        res.json({
            msg: 'Appointment created successfully',
        })

        sendEmailNewAppointment({
            date: formatDate(result.date),
            time: result.time,
        }).catch(err => console.error('[mail][create] error:', err));

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while creating the appointment'})
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

    try {
        const isoDate = formatISO(newDate)
        const appointments = await Appointment.find({
            date: {
                $gte: startOfDay(new Date(isoDate)),
                $lte: endOfDay(new Date(isoDate))
            }
        }).select('time')
        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while fetching appointments'})
    }
}

const getAppointmentsById = async (req, res) => {
    const {id} = req.params;
    //Validate ObjectId
    if (validateObjectId(id, res)) return;

    try {
        //validate if appointment exists
        const appointment = await Appointment.findById(id).populate('services');
        if (!appointment) {
            return handleNotFoundError('Appointment not found', res);
        }

        //user validation
        if (appointment.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized User');
            return res.status(403).json({
                msg: error.message,
            })
        }

        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while fetching the appointment'})
    }
}

const updateAppointment = async (req, res) => {
    const {id} = req.params;
    //Validate ObjectId
    if (validateObjectId(id, res)) return;

    try {
        //validate if appointment exists
        const appointment = await Appointment.findById(id).populate('services');
        if (!appointment) {
            return handleNotFoundError('Appointment not found', res);
        }

        //user validation
        if (appointment.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized User');
            return res.status(403).json({
                msg: error.message,
            })
        }

        const {date, time, totalAmount, services} = req.body;
        appointment.date = date ?? appointment.date
        appointment.time = time ?? appointment.time
        appointment.totalAmount = totalAmount ?? appointment.totalAmount
        appointment.services = services ?? appointment.services

        const result = await appointment.save();

        res.json({
            msg: 'Appointment updated successfully',
        })

        await Appointment.populate(result, {path: 'services'});
        sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time,
            services: result.services.map(s => s.name).join(', '),
        }).catch(err => console.error('[mail][update] error:', err));

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while updating the appointment'})
    }
}

const deleteAppointment = async (req, res) => {
    const {id} = req.params;
    //Validate ObjectId
    if (validateObjectId(id, res)) return;

    try {
        //validate if appointment exists
        const appointment = await Appointment.findById(id).populate('services');
        if (!appointment) {
            return handleNotFoundError('Appointment not found', res);
        }

        //user validation
        if (appointment.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized User');
            return res.status(403).json({
                msg: error.message,
            })
        }
        //save data for email
        const mailPayload = {
            date: formatDate(appointment.date),
            time: appointment.time,
        };

        await appointment.deleteOne()

        res.json({msg: 'Appointment deleted successfully'})

        sendEmailDeletedAppointment(mailPayload)
            .catch(err => console.error('[mail][delete] error:', err));

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'An error occurred while deleting the appointment'})
    }
}

export {
    createAppointment,
    getAppointmentsByDate,
    getAppointmentsById,
    updateAppointment,
    deleteAppointment
}
