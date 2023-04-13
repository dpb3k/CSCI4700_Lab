// the following file shows all student submissions for research
import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'wouter';
import fb from '../firebase';
const DB = fb.firestore()
const Studentlist = DB.collection('studentform');

const StudentlistView = () => {
    // list function to display 
    const [student, Setstudent] = useState([]);
    // search query

    // catch and show data to users
    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Studentlist.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            // Update state
            Setstudent(data);
          });
  
          // Detach listener
          return unsubscribe;

    },[])

  

    return (
        <div>
            
          
            {studentform.map(student=> (
                <Card style={{  borderWidth: '2px', borderStyle: 'solid', margin: '100px', borderRadius: '12px',backgroundColor:'hsl(209, 98%, 52%, 0.3)'}}>
                <Card.Body>

                
                <div key = {student.id}>
                    <h1> {student.Name}</h1>
                    <h3> {student.M_number} </h3>
                    <h4> {student.Email}</h4>
                    <p> {student.Body} </p>
                    <p> Skills: {student.Skills} </p> 
                    <p> Semesters: {student.Semester} </p>
                    
                </div>
                </Card.Body>
                </Card>

            ))}

        </div>
    );

};
export default StudentlistView;