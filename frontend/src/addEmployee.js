import * as React from 'react';
import  {useHistory, useParams}  from 'react-router-dom';
import Button from '@mui/material/Button';
import './viewList.css';
import axios from 'axios';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default function AddEmployee(){
    const {id }= useParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [alert, setMessage] = React.useState({ message: "", severity: "" });
    const INTIAL_STATE = {
        firstName:'',
        lastName:'',
        mail:'',
        eid :'',
        number:''
      };
    const [employeeData, setEmployeeData] = React.useState(INTIAL_STATE);
    const history = useHistory();
    function handleResponse(newMessage,newSeverity){
        const message = alert;
        message.message = newMessage;
        message.severity = newSeverity;
        setMessage(message);
        setOpen(true);
        console.log("entered handle response",newMessage,newSeverity)

      }
    const fetchRequiredData = async () => {
        if(id){
          try {
            const resData = await axios.get(`${process.env.REACT_APP_API_URL}/employee/${id}`);
            if (resData) {
                
                const temp={...employeeData};
                temp.firstName=resData.data.data.firstName;
                temp.lastName=resData.data.data.lastName;
                temp.mail=resData.data.data.email;
                temp.eid=resData.data.data.eid;
                temp.number=resData.data.data.contactNumber;
                setEmployeeData(temp);
                console.log(resData);
                setIsLoading(false);
            }
          } catch (error) {
            console.log('Failed to fetch details. Please try again.',error);
          }
        }
        else{
            setIsLoading(false);
        }
      }
    React.useEffect(() => {
        fetchRequiredData();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    function validateAndSubmit(){
        if(employeeData.firstName===""){
            handleResponse('First name cannot be empty','error');
            return false;
        }
        if(employeeData.lastName===""){
            handleResponse('Last name cannot be empty','error');
            return false;
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(employeeData.mail)){
            handleResponse('enter valid email address','error');
            return false;
        }
        if(!/^([0-9]{5}|[0-9]{5})$/.test(employeeData.eid)){
            handleResponse('enter valid employee ID (5 Digit random number)','error');
            return false;
        }
        if(!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(employeeData.number)){
            handleResponse('enter valid 10 Digit mobile number','error');
            return false;
        }
        return true;
    }
    async function uploadDetails() {
        axios.post(`${process.env.REACT_APP_API_URL}/employee/addEmployee`, employeeData)
        .then((response)=> {
            console.log("successfully added",employeeData);
            handleResponse('employee details uploaded successfully','success');
        })
        .catch((error) => {
            handleResponse('employee details uploading failed','error');
            console.log("failed to add data",employeeData);
        })
    }
    async function updateDetails() {
        axios.patch(`${process.env.REACT_APP_API_URL}/employee/${id}`, employeeData)
        .then((response)=> {
            console.log("successfully updated",employeeData);
            handleResponse('employee details updated successfully','success');
        })
        .catch((error) => {
            handleResponse('employee details updating failed','error');
            console.log("failed to update data",employeeData);
        })
    }
    const handleFirstNameChange = (e) => {
        const temp={...employeeData};
        temp.firstName=e.target.value;
        setEmployeeData(temp);
    }
    const handleLastNameChange = (e) => {
        const temp={...employeeData};
        temp.lastName=e.target.value;
        setEmployeeData(temp);
    }
    const handleEmailChange = (e) => {
        const temp={...employeeData};
        temp.mail=e.target.value;
        setEmployeeData(temp);
    }
    const handleEidChange = (e) => {
        const temp ={...employeeData};
        temp.eid=e.target.value;
        setEmployeeData(temp);
    }
    const handleNumberChange = (e) => {
        const temp={...employeeData};
        temp.number=e.target.value;
        setEmployeeData(temp);
    }
    return(
        <>
        
        <div className="employee-table">
            <h3>Add New Employee</h3>
            <div className='Main-box'>
                {isLoading && <div>loading...</div>}
                {!isLoading && 
                <div className='form-for-schedule box'>
                        <div className="row">
                        <FormControl>
                        <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={employeeData.firstName}
                        onChange={handleFirstNameChange}
                        label="First Name"
                        />
                    </FormControl>
                    </div>
                    <div className="row">
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={employeeData.lastName}
                        onChange={handleLastNameChange}
                        label="Last Name"
                        />
                    </FormControl>
                    </div>
                        <div className="row">
                        <FormControl>
                        <InputLabel htmlFor="component-outlined">Email</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={employeeData.mail}
                        onChange={handleEmailChange}
                        label="Email Id"
                        />
                    </FormControl>
                        </div>
                        <div className="row">
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Employee ID</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={employeeData.eid}
                        onChange={handleEidChange}
                        label="Employee ID"
                        />
                    </FormControl>
                    </div>
                    <div className="row">
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Contact Number</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        value={employeeData.number}
                        onChange={handleNumberChange}
                        label="Contact Number"
                        />
                    </FormControl>
                    </div>
                    <Snackbar open={open} autoHideDuration={2000} onClose={() => {setOpen(false); if(alert.severity==="success")history.push('/')}}>
                        <Alert onClose={() => setOpen(false)} severity={alert.severity}>
                            {alert.message}
                        </Alert>
                    </Snackbar>
                </div>
                }
                <div style={{  display:'inline-block',marginLeft:'20%',marginTop:'1%'}}>
                {id &&
                    <Button variant='contained' color='primary' className='button-schedule-page button-type' onClick={() => {if(validateAndSubmit()){updateDetails();}}}>
                        Update Employee
                    </Button>
                }
                {!id &&
                    <Button variant='contained' color='primary' className='button-schedule-page button-type' onClick={() => {if(validateAndSubmit()){uploadDetails();}}}>
                        Upload Employee
                    </Button>
                }
                  
                </div>
                
                
            </div>
            
        </div>      
        </>
    )
}