const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['appointments']
    const result = await mongodb.getDatabase().db().collection('appointments').find();
    result.toArray().then((appointments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appointments);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['appointments']
    const appointmentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('appointments').find({ _id: appointmentId});
    result.toArray().then((appointments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(appointments[0]);
    });
};

const createappointment = async (req, res) => {
    //#swagger.tags=['appointments']
    const appointment = {
        type: req.body.type,
        date: req.body.date,
        time: req.body.time,
        provider: req.body.provider,
        patient_lastname: req.body.patient_lastname,
        patient_firstname: req.body.patient_firstname,
        phone_number: req.body.phone_number
    };
    const response = await mongodb.getDatabase().db().collection('appointment').insertOne(appointment);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the appointment.');
    }
};

const  updateappointment = async (req, res) => {
    //#swagger.tags=['appointments']
    const appointmentId = new ObjectId(req.params.id);
    const appointment = {
        type: req.body.type,
        date: req.body.date,
        time: req.body.time,
        provider: req.body.provider,
        patient_lastname: req.body.patient_lastname,
        patient_firstname: req.body.patient_firstname,
        phone_number: req.body.phone_number
    };
    const response = await mongodb.getDatabase().db().collection('appointments').replaceOne({ _id: appointmentId }, appointment);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the appointment.');
    }
};

const deleteappointment = async (req, res) => {
    //#swagger.tags=['appointments']
    const appointmentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('appointments').deleteOne({ _id: appointmentId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the appointment.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createappointment,
    updateappointment,
    deleteappointment
};