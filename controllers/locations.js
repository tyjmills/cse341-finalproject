const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['locations']
    const result = await mongodb.getDatabase().db().collection('locations').find();
    result.toArray().then((locations) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(locations);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['locations']
    const locationId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('locations').find({ _id: locationId});
    result.toArray().then((locations) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(locations[0]);
    });
};

const createlocation = async (req, res) => {
    //#swagger.tags=['locations']
    const location = {
        name: req.body.name,
        city: req.body.city,
        State: req.body.State
    };
    const response = await mongodb.getDatabase().db().collection('location').insertOne(location);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the location.');
    }
};

const  updatelocation = async (req, res) => {
    //#swagger.tags=['locations']
    const locationId = new ObjectId(req.params.id);
    const location = {
        name: req.body.name,
        city: req.body.city,
        State: req.body.State
    };
    const response = await mongodb.getDatabase().db().collection('locations').replaceOne({ _id: locationId }, location);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the location.');
    }
};

const deletelocation = async (req, res) => {
    //#swagger.tags=['locations']
    const locationId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('locations').deleteOne({ _id: locationId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the location.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createlocation,
    updatelocation,
    deletelocation
};