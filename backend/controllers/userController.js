import Appointment from "../models/Appointment.js";

const getUserAppointments = async (req, res) => {
    const {user} = req.params;
    if (user !== req.user._id.toString()) {
        const error = new Error('Unauthorized access to appointments');
        return res.status(403).json({msg: error.message});
    }

    try {
        const query = req.user.admin ? {date: {$gte: new Date()}} : {user, date: {$gte: new Date()}}
        const appointments = await Appointment
            .find(query)
            .populate('services')
            .populate({path:'user', select:'name email'})
            .sort({date: 'asc'}) //populate service details

        res.json(appointments);
    } catch (err) {
        console.log(err);
    }
}

export {
    getUserAppointments
}