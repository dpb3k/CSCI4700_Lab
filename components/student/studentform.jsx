// allows students to apply for a lab
import React, {useState} from 'react';
import { Link } from 'wouter';
import Card from 'react-bootstrap/Card';
import fb from '../../firebase';
// import { Link } from 'react-router-dom';
const DB = fb.firestore()
const StudentForm= DB.collection('studentform');



// create lab function
const StudentInfo = () => {
    // lab content vars
    const [f_name, SetFName] = useState("");
    const [l_name, SetLName] = useState("");
    const [m_number, SetMnumber] = useState("");
    const [email, SetEmail] = useState("");
    const [body, SetBody] = useState("");
    const [skills, SetSkills] = useState("");
    const [semester, SetSemester] = useState("");


    //once user submits
    const submit = (e)=> {
        e.preventDefault();
        StudentForm.add ({
            FName: f_name,
            LName: l_name,
            M_number: m_number,
            Email: email,
            Body: body,
            Skills: skills,
            Semester: semester
        // if data successfully submitted
        }).then ((docRef)=> {
            alert("data successfully submitted")
        // if data not submitted
        }).catch((error)=> {
            console.error("error adding document: ", error);
        });
    }
    return (
        <Card style={{  borderWidth: '2px', borderStyle: 'solid', margin: '100px',backgroundColor:'hsl(209, 98%, 52%, 0.3)'}}>
                <Card.Body>
        <div>
            
            <div>
            
            <h2>Please fill out the following form </h2>

            </div>

           
                <form onSubmit={(event) => {submit(event)}}>    
                

                
                    <div >
                    

                        <div style= {{margin: '10px'}}> First Name:  
                            <input type="text" class="form-control" placeholder="First name" onChange={(e)=>{SetFName(e.target.value)}} required />

                            Last Name: 
                            <input type="text" class="form-control" placeholder="Last name" onChange={(e)=>{SetLName(e.target.value)}} required />
                        </div>

                    <br></br>
                        <div>
                          M Number:                           
                         <input type="text" class="form-control" placeholder="M# " onChange={(e)=>{SetMnumber(e.target.value)}} required />

                         MT Mail:
                         <input type="text" class="form-control" placeholder="@mtmail.mtsu.edu" onChange={(e)=>{SetEmail(e.target.value)}} required />
                         </div> 
                    </div>
                    <br></br>
                    
                     <div>
                    <div> Research Background </div>
                    <textarea  name="content" type="text" placeholder="Any prior background"
                     rows="10" cols="50" onChange={(e)=>{SetBody(e.target.value)}} required >
                     </textarea>
                    </div>

                    <br></br>

                    <div>
                    <div> Key Skills </div>
                    <textarea  name="key skills" type="text" placeholder="What skills do you have"
                    rows="5" cols="50" onChange={(e)=>{SetSkills(e.target.value)}} required >
                    </textarea> 
                    </div>

                    <br></br>
                     {/* <div> 
                        
                    <div> Semester Duration </div>
                    <input //prof
                    type="text" placeholder="Semesters" 
                    onChange={(e)=>{SetSemester(e.target.value)}} required /> 
                    </div>*/}

                    <br></br>

                    <div>
                    <button type="submit" >Submit</button>
                    <Link href="/back"> 
                        <button>   Done</button>
                    </Link>
             
                    {/*<button onClick={() => window.location.reload(true)}>Clear</button>*/}

                    </div>
                    
             </form>
            
             
            
            
             

            </div>
            </Card.Body>
                </Card>
    );
};

export default StudentInfo;