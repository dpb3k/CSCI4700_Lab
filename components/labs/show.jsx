// the following file allows you to see details of the labs 
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'wouter';
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

        
            <div>
                <p> Title: {labs.Title}</p>
                <p> Overview: {labs.Overview} </p>
                <p> Professor: {labs.Prof}</p>
                <p> Body: {labs.Body} </p>
                <p> Skills: {labs.Skills}</p>
                <p> Semesters: {labs.Semester} </p>
            </div>

            
                        <li>
                        <Link href = {"/student/"}> 
                        <button> Apply </button>
                         </Link>

                        </li>
           
                  
                    
                    <br></br><br></br>
                    <div className='ending'>why</div>
                    <br></br>
                

            
            
            
           

        </div>
    );
};

export default LabDetailView;