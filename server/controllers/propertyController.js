const fs = require('fs');

const properties = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/properties-simple.json`)
);


exports.checkID = (req, res, next, val) => {
  console.log(`Property id is: ${val}`);

  if (req.params.id * 1 > properties.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing price'
    });
  }
  next();
};

exports.getAllProperties = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: properties.length,
    data: {
      properties
    }
  });
};

exports.getProperty = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const property = properties.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      property
    }
  });
};

exports.createProperty = (req, res) => {
  // console.log(req.body);

  const newId = properties[properties.length - 1].id + 1;
  const newProperty = Object.assign({ id: newId }, req.body);

  properties.push(newProperty);

  fs.writeFile(
    `${__dirname}/data/properties-simple.json`,
    JSON.stringify(properties),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          property: newProperty
        }
      });
    }
  );
};

exports.updateProperty = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated property here...>'
    }
  });
};

exports.deleteProperty = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};