const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['providers']
    const result = await mongodb.getDatabase().db().collection('providers').find();
    result.toArray().then((providers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(providers);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['providers']
    const providerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('providers').find({ _id: providerId});
    result.toArray().then((providers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(providers[0]);
    });
};

const createprovider = async (req, res) => {
    //#swagger.tags=['providers']
    const provider = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        title: req.body.title
    };
    const response = await mongodb.getDatabase().db().collection('provider').insertOne(provider);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the provider.');
    }
};

const  updateprovider = async (req, res) => {
    //#swagger.tags=['providers']
    const providerId = new ObjectId(req.params.id);
    const provider = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        title: req.body.title
    };
    const response = await mongodb.getDatabase().db().collection('providers').replaceOne({ _id: providerId }, provider);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the provider.');
    }
};

const deleteprovider = async (req, res) => {
    //#swagger.tags=['providers']
    const providerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('providers').deleteOne({ _id: providerId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the provider.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createprovider,
    updateprovider,
    deleteprovider
};