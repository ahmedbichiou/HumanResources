const express = require('express');
const employeeRoute = express.Router();
// Employee model
let Employee = require('../models/Employee');

// Add Employee
employeeRoute.route('/create').post(async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// Get All Employees
employeeRoute.route('/').get(async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// Get single employee
employeeRoute.route('/read/:id').get(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// Update employee
employeeRoute.route('/update/:id').put(async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// Delete employee
// Delete employee
employeeRoute.route('/delete/:id').delete(async (req, res, next) => {
    try {
      const result = await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: result
      });
    } catch (error) {
      next(error);
    }
});
  
employeeRoute.get('/search-employees', async (req, res) => {
  try {
    const searchTerm = req.query.name;

    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(400).send('Search term is required.');
    }

    // Escape any special characters for regex
    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedSearchTerm, 'i');

    // Search only by the 'name' field
    const results = await Employee.find({ name: regex });

    res.json(results);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send('Server error');
  }
});


module.exports = employeeRoute;
