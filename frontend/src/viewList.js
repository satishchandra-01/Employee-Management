import React, { useState, useEffect } from 'react';
import './viewList.css';
import axios from 'axios';
import  {useHistory}  from 'react-router-dom';
import Button from '@mui/material/Button';
export default function ViewEmployee() {
    const history = useHistory();
    const [employeeData, setEmployeeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            const fetchEmployeeData = await axios.get(`${process.env.REACT_APP_API_URL}/employee/`)
            if (fetchEmployeeData) {
                setEmployeeData(fetchEmployeeData.data.data);
                setIsLoading(false);
                console.log(fetchEmployeeData.data.data);
            }
          } catch (error) {
            console.log('Failed to fetch details. Please try again.','error');
          }
    }
    useEffect(() => {
        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    

    const navigateToPage = () => {
        console.log(`/add-employee`);
        history.push('/add-employee');
    }
    function handleUpdate(uid){
        console.log("update function called");
        history.push(`/add-employee/${uid}`);
        //to be done
    }
    async function handleDelete(uid){
        await axios.delete(`${process.env.REACT_APP_API_URL}/employee/${uid}`)
        .then((response) => {
            console.log("deleted successfully",response.data)
            window.location.reload(false);
        })
        .catch((error) => {
            console.log("failed to delete")
        })
        history.push(`/`);
        //to be done
    }
    function handleView(uid){
        console.log("view function called",uid);
        const temp=JSON.stringify(uid);
        history.push(`/view-employee/${temp}`);
        //to be done
    }
    return(
    <div className='employee-table'>
    <h3>Employees List</h3>
    <Button variant='contained' color='primary' className='button-schedule-page button-type-1' onClick={() => navigateToPage()}>
        Add Employee
    </Button>      
    <table>
        <thead>
        <tr>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>
                Actions
            </th>
        </tr>
        </thead>
        {isLoading && 
            <div>Loading....</div>
        }
        {!isLoading &&
        <tbody>
        {employeeData.map((temp) => (
            <tr>
                <td>{temp.firstName}</td>
                <td>{temp.lastName}</td>
                <td>{temp.email}</td>
                <td>
                    <div className='button-container'>
                        <div>
                            <Button variant='contained' color='primary' className='button-schedule-page button-type action-buttons' onClick={() => handleUpdate(temp._id)}>
                                Update
                            </Button>
                        </div>
                        <div>
                            <Button variant='contained' color='error' className='button-schedule-page button-type action-buttons' onClick={() => handleDelete(temp._id)}>
                                delete
                            </Button>
                        </div>
                        <div>
                            <Button variant='contained' color='primary' className='button-schedule-page button-type action-buttons' onClick={() => handleView(temp)}>
                                View
                            </Button>
                        </div>
                    </div>
                    
                </td>
            </tr>
        ))}
        </tbody>
        }
    </table>
      </div>
    )
}