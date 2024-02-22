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
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        fullname: req.body.fullname,
        favcolor: req.body.favcolor,
        state: req.body.state
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
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        fullname: req.body.fullname,
        favcolor: req.body.favcolor,
        state: req.body.state
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