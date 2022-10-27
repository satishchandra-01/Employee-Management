//Dependencies Imported :
var mongoose = require("mongoose");

var employeeSchema = mongoose.Schema({
    //Object ID : (Unique ID, automatically created by MongoDb)
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, "please enter Name"],
    },
    lastName: {
        type: String,
        required: [true, "please enter Name"],
    },
    //Validation for Email :
    email: {
        type: String,
        required: false,
        unique: false,
        lowercase: [true, "email address must be lowercase"],
        validate: [
            {
                validator: function(v) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                Error: "please enter a valid email address"
            }
        ]
    },
    eid:{
        type: String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    isActive:{
        type: Boolean,
        default:true
    },
});

module.exports = mongoose.model("Employee", employeeSchema);