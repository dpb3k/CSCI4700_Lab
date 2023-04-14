// the following file allows you to see details of the labs 
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'wouter';
import Card from 'react-bootstrap/Card';
import fb from '../../firebase';
const DB = fb.firestore()
const Labslist = DB.collection('labs');

const LabDetailView = ({id}) => {
    const [labs, Setlabs] = useState([]);
    Labslist.doc(id).get().then((snapshot) => {
        const data = snapshot.data()
        // initialize variable with data
        Setlabs(data);
    }); 

    return (
        <div> 
            <div>
                <li>
                <Link href={"/back"}> 
                        <button> Back to Browse </button>
                </Link>

                </li>
            
            </div>

            <Card style={{  borderWidth: '2px', borderStyle: 'solid', margin: '100px', borderRadius: '12px',backgroundColor:'hsl(209, 98%, 52%, 0.3)'}}>
                <Card.Body>
            <div>
            
                <h1> {labs.Title}</h1>
                <h2> {labs.Department}</h2>
                <h3> {labs.Overview} </h3>
                <h3> Professor: {labs.Prof}</h3>
                <p> {labs.Body} </p>
                <p> Skills: {labs.Skills}</p>
                <h4> Semesters: {labs.Semester} </h4>
                
            </div>

            
                        <li>
                        <Link href = {"/student/"}> 
                        <button> Apply </button>
                         </Link>

                        </li>
           
                        </Card.Body>
                </Card>
                    
                    <br></br><br></br>
                    <div className='ending'>why</div>
                    <br></br>
                

            
            
            
           

        </div>
    );
};

export default LabDetailView;