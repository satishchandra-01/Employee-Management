var express = require("express");
const employee = require("../models/employee");
var router = express.Router();
var mongoose = require("mongoose");
const Employee = employee;

router.post("/addEmployee", async (req, res) => {
  
    const newEmployee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.mail,
        eid:req.body.eid,
        contactNumber:req.body.number,
        isActive:true
    });
  
    try {
        await newEmployee.save();
        return res.status(200).json({
            status: {
                status: true,
                code: 200,
                message: "Registered Successfully",
            },
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: {
                success: false,
                code: 400,
                message: "Registration Unsuccessful",
            },
        });
    }
});
router.get("/",async(req,res) => {
    try {
        const employeeList = await Employee.find({ isActive: true });
        if (employeeList && employeeList.length === 0) {
            res.status(404).json({
                "status": {
                    "success": false,
                    "code": 404,
                    "message": "models not found"
                }
            });
        } else {
            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 200,
                    "message": "successfull"
                },
                "data": employeeList
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": {
                "success": false,
                "code": 500,
                "message": err.message
            }
        });
    }
})
router.get("/:employeeId",async(req,res) => {
    try {
        const id = req.params.employeeId;
        const employeeList = await Employee.findOne({ _id:id,isActive: true });
        if (!employeeList) {
            res.status(404).json({
                "status": {
                    "success": false,
                    "code": 405,
                    "message": "models not found"
                }
            });
        } else {
            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 200,
                    "message": "successfull"
                },
                "data": employeeList
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": {
                "success": false,
                "code": 500,
                "message": err.message
            }
        });
    }
})
router.patch("/:employeeId",async(req,res) => {
        try {
            const id = req.params.employeeId;
            var newEmployee = await Employee.findOne({ _id: id, isActive: true });
            console.log(newEmployee);
            if (!newEmployee) {
                res.status(404).json({
                    "status": {
                        "success": false,
                        "code": 404,
                        "message": "not found"
                    }
                });
            } else {
                newEmployee.firstName=req.body.firstName;
                newEmployee.lastName=req.body.lastName;
                newEmployee.email=req.body.mail;
                newEmployee.contactNumber=req.body.number;
                newEmployee.eid=req.body.eid;
                await newEmployee.save();
                res.status(200).json({
                    "status": {
                        "success": true,
                        "code": 204,
                        "message": "updated"
                    },
                    "data": newEmployee
                });
            }
        }
        catch (err) {
            res.status(500).json({
                "status": {
                    "success": false,
                    "code": 500,
                    "message": err.message
                }
            });
            console.log(err);
        }       
})
router.delete("/:employeeId", async (req, res) => {
    try {
        const id = req.params.employeeId;
        const newEmployee = await Employee.findById(id);
        if (!newEmployee) {
            res.status(404).json({
                "status": {
                    "success": false,
                    "code": 404,
                    "message": "not found"
                }
            });
        }
        else {
            await Employee.findByIdAndUpdate(id, { isActive: false });
            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 204,
                    "message": "deleted"
                }
            });
        }
    }
    catch (err) {
        res.status(500).json({
            "status": {
                "success": false,
                "code": 500,
                "message": err.message
            }
        });
        console.log(err);
    }
});
module.exports = router;