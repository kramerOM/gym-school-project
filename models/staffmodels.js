const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Move the method definition inside the schema declaration
staffSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    return false;
  }
};



const StaffModel = mongoose.model('Staff', staffSchema);
module.exports = StaffModel;
