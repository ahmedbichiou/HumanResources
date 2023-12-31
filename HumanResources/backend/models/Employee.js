const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Employee = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   password: {
      type: String
   }
}, {
   collection: 'employees'
})
module.exports = mongoose.model('Employee', Employee)