// allows students to apply for a lab
import React, {useState} from 'react';
import { Link } from 'wouter';
import fb from '../../firebase';
// import { Link } from 'react-router-dom';
const DB = fb.firestore()
const StudentForm= DB.collection('studentform');



// create lab function
const StudentInfo = () => {
    // lab content vars
    const [name, SetName] = useState("");
    const [m_number, SetMnumber] = useState("");
    const [email, SetEmail] = useState("");
    const [body, SetBody] = useState("");
    const [skills, SetSkills] = useState("");
    const [semester, SetSemester] = useState("");


    //once user submits
    const submit = (e)=> {
        e.preventDefault();
        StudentForm.add ({
            Name: name,
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
        <div>
            <div>
            
            <h2>Please fill out the following form </h2>

            </div>


                <form onSubmit={(event) => {submit(event)}}>    
                    <div>
                    <div> Name </div>
                    <textarea  name="name" type="text" placeholder="Insert your name"
                    rows="3" cols="30" onChange={(e)=>{SetName(e.target.value)}} required >
                     </textarea> 
                    </div>
                    
                    <div>
                    <div> M number </div>
                    <textarea  name="mnumber" type="text" placeholder="Your M#"
                    rows="10" cols="20" onChange={(e)=>{SetMnumber(e.target.value)}} required >
                    </textarea> 
                    </div>
                    
                    <div> 
                    <div> MTMail </div>
                    <textarea  name="email" type="text" placeholder="your mt mail"
                    rows="10" cols="20" onChange={(e)=>{SetEmail(e.target.value)}} required >
                    </textarea> 
                    </div>
                        
                    <div>
                    <div> Research Background </div>
                    <textarea  name="content" type="text" placeholder="Any prior background"
                     rows="5" cols="50" onChange={(e)=>{SetBody(e.target.value)}} required >
                     </textarea>
                    </div>

                    <div>
                    <div> Key Skills </div>
                    <textarea  name="key skills" type="text" placeholder="What skills do you have"
                    rows="10" cols="20" onChange={(e)=>{SetSkills(e.target.value)}} required >
                    </textarea> 
                    </div>

                    <div> 
                    <div> Semester Duration </div>
                    <input //prof
                    type="text" placeholder="What and how many semesters are you available" 
                    onChange={(e)=>{SetSemester(e.target.value)}} required /> 
                    </div>

                    <div>
                    <button type="submit" >Submit</button>
                    {/*<button onClick={() => window.location.reload(true)}>Clear</button>*/}

                    </div>
                     
             </form>
             
             <Link href="/back"> 
                        <button> Done</button>
            </Link>
             
            
             

            </div>
    );
};

export default StudentInfo;