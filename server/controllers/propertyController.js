const Property = require('./../models/propertyModel');
const APIFeatures = require('./../utils/apiFeatures');
// const fs = require('fs');

// const properties = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/properties-simple.json`)
// );


// exports.checkID = (req, res, next, val) => {
//   console.log(`Property id is: ${val}`);

//   if (req.params.id * 1 > properties.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing price'
//     });
//   }
//   next();
// };

exports.getAllProperties = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Property.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const properties = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: {
        properties
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        property
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createProperty = async (req, res) => {
  try {
    // const newProperty = new Property({})
    // newProperty.save()

    const newProperty = await Property.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        property: newProperty
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        property
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};