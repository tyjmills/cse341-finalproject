const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['patients']
    const result = await mongodb.getDatabase().db().collection('patients').find();
    result.toArray().then((patients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(patients);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['patients']
    const patientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('patients').find({ _id: patientId});
    result.toArray().then((patients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(patients[0]);
    });
};

const createpatient = async (req, res) => {
    //#swagger.tags=['patients']
    const patient = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    const response = await mongodb.getDatabase().db().collection('patient').insertOne(patient);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the patient.');
    }
};

const  updatepatient = async (req, res) => {
    //#swagger.tags=['patients']
    const patientId = new ObjectId(req.params.id);
    const patient = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    const response = await mongodb.getDatabase().db().collection('patients').replaceOne({ _id: patientId }, patient);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the patient.');
    }
};

const deletepatient = async (req, res) => {
    //#swagger.tags=['patients']
    const patientId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('patients').deleteOne({ _id: patientId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the patient.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createpatient,
    updatepatient,
    deletepatient
};