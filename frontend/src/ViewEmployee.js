import  {useHistory, useParams}  from 'react-router-dom';
import Button from '@mui/material/Button';
import React from 'react';
import './viewList.css';
export default function ViewEmployeeDetails(){
    const  employeeData = useParams();
    const employee=JSON.parse(employeeData.id);
    const history = useHistory();
    const navigateToPage = () => {
        history.push('/');
    }
    return(
        <>
        
        <div className="employee-table">
            <div className='heading-container'>
                <h3>Employee Details</h3>
            </div>
            <div className='Main-box'>
            <table>
                <tbody>
                <tr>
                    <td className='employee-cells'>First Name</td>
                    <td className='employee-cells'>{employee.firstName}</td>
                </tr>
                <tr>
                    <td className='employee-cells'>Last Name</td>
                    <td className='employee-cells'>{employee.lastName}</td>
                </tr>
                <tr>
                    <td className='employee-cells'>Email Id</td>
                    <td className='employee-cells'>{employee.email}</td>
                </tr>
                <tr>
                    <td className='employee-cells'>Employee ID</td>
                    <td className='employee-cells'>{employee.eid}</td>
                </tr>
                <tr>
                    <td className='employee-cells'>Contact Number</td>
                    <td className='employee-cells'>{employee.contactNumber}</td>
                </tr>
                </tbody>
                
            </table>
            <br></br>
            <div style={{  display:'inline-block',marginRight:'10%',marginTop:'1%'}}>
            <Button variant='contained' color='primary' className='button-schedule-page button-type' onClick={navigateToPage}>
                        Go Back
                    </Button>
            </div>
            
            </div>
        </div>      
        </>
    )
}