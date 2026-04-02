/**Requests.js
 * 
 * description: the schema for our mutual aid Requests collection.
 * This is effectively the request that mutual aid seekers will create when looking for help.
 */

const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String },
  requestorName: { type: String, required: true },
  requestorPhone: { type: String },
  requestorEmail: { type: String },
  helperName: { type: String },
  helperPhone: { type: String },
  helperEmail: { type: String },
  status: { 
    type: String, 
    enum: ['Open', 'Claimed', 'Completed'], 
    required: true, 
    default: 'Open' 
  },
  createdTimestamp: { type: Date, default: Date.now },
  claimedTimestamp: { type: Date },
  completedTimestamp: { type: Date }
});

module.exports = mongoose.model('Request', requestSchema);