import React, {useState} from 'react';
import { Link } from 'wouter';
import Card from 'react-bootstrap/Card';
import fb from '../../firebase';
const DB = fb.firestore()
const Labs = DB.collection('labs');



// create lab function
const CreateLab = () => {
    // lab content vars
    const [title, SetTitle] = useState("");
    const [department, SetDepartment]= useState("");
    const [overview, SetOverview] = useState("");
    const [prof, SetProf] = useState("");
    const [body, SetBody] = useState("");
    const [skills, SetSkills] = useState("");
    const [semester, SetSemester] = useState("");


    //once user submits
    const submit = (e)=> {
        e.preventDefault();
        Labs.add ({
            Title: title,
            Department: department,
            Overview: overview,
            Prof: prof,
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
        <Card style={{  borderWidth: '2px', borderStyle: 'solid', margin: '2px', width:"700px", backgroundColor:'hsl(209, 98%, 52%, 0.3)'}}>
        <Card.Body>
        <div>
            <div>
            
            <h2>Write the content of your lab </h2>

            </div>
            


                <form onSubmit={(event) => {submit(event)}}>    
                    <div>
                    
                   
                    <div style= {{margin: '10px'}}> 
                    <label for = "labtitle" > Lab Title:  </label>
                    <input type="text" class="Text" placeholder="Insert the title of your lab" 
                    onChange={(e)=>{SetTitle(e.target.value)}} required/>

                    <label for = "department" > Department:  </label>
                    <input type="text" class="Text" placeholder="eg. Basic and Applied Sciences" 
                    onChange={(e)=>{SetDepartment(e.target.value)}} required/>
                        </div>
                    </div>

                    <br></br>
                    
                    <div> 
                    <div style= {{margin: '10px'}}> 
                    <label for = "profs" > Professor(s):  </label>
                    <input type="text" class="bigText" placeholder="Enter name and email of all staff" 
                    onChange={(e)=>{SetProf(e.target.value)}} required/>
                
                    </div>
                    </div>

                    <br></br>

                    <div>
                    <div>Overview: </div>
                    <textarea  name="content" type="text" placeholder="What will you be studying"
                     rows="5" cols="70" onChange={(e)=>{SetOverview(e.target.value)}} required >
                     </textarea>
                    </div>
                        
                        <br></br>

                    <div>
                    <div>Lab Details: </div>
                    <textarea  name="content" type="text" placeholder="Write the contents of your lab here"
                     rows="20" cols="70" onChange={(e)=>{SetBody(e.target.value)}} required >
                     </textarea>
                    </div>

                    <br></br>

                    <div>
                    <div>Key Skills: </div>
                    <textarea  name="key skills" type="text" placeholder="What key skills are you looking for"
                    rows="5" cols="70" onChange={(e)=>{SetSkills(e.target.value)}} required >
                    </textarea> 
                    </div>

                    <br></br>

                    <div> 
                    <div style= {{margin: '10px'}}> 
                    <label for = "semester" > Semester(s):  </label>
                    <input type="text" class="Text" placeholder="Semester duration" 
                    onChange={(e)=>{SetSemester(e.target.value)}} required/>
                
                    </div>
                    </div>
                    <br></br>

                    <div>
                    <button type="submit" >Submit</button>
                    <li>
                            <Link href={"/back"}> 
                    <button onClick={() => window.location.reload(true)}>Done</button>
                    </Link>

                        </li>
                    

                    </div>
                     
             </form>

             <div>
                        
            
            </div>

             
             

         </div>
            </Card.Body>
            </Card>
    );
};

export default CreateLab;