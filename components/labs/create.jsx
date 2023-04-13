import React, {useState} from 'react';

import fb from '../../firebase';
const DB = fb.firestore()
const Labs = DB.collection('labs');



// create lab function
const CreateLab = () => {
    // lab content vars
    const [title, SetTitle] = useState("");
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
        <div>
            <div>
            
            <h2>Write the content of your lab </h2>

            </div>


                <form onSubmit={(event) => {submit(event)}}>    
                    <div>
        
                    <textarea  name="TITLE" type="text" placeholder="Insert the title of your lab"
                    rows="3" cols="30" onChange={(e)=>{SetTitle(e.target.value)}} required >
                    </textarea> 
                    </div>
                    
                    <div>
                    <textarea  name="overview" type="text" placeholder="What will you be studying"
                    rows="10" cols="20" onChange={(e)=>{SetOverview(e.target.value)}} required >
                    </textarea> 
                    </div>
                    
                    <div> 
                    <textarea  name="professors" type="text" placeholder="Professor name and email"
                    rows="10" cols="20" onChange={(e)=>{SetProf(e.target.value)}} required >
                    </textarea> 
                    </div>
                        
                    <div>
                    <textarea  name="content" type="text" placeholder="Write the contents of your lab here"
                     rows="5" cols="50" onChange={(e)=>{SetBody(e.target.value)}} required >
                     </textarea>
                    </div>

                    <div>
                    <textarea  name="key skills" type="text" placeholder="What are key skills required"
                    rows="10" cols="20" onChange={(e)=>{SetSkills(e.target.value)}} required >
                    </textarea> 
                    </div>

                    <div> 
                    <input //prof
                    type="text" placeholder="Lab semesters" 
                    onChange={(e)=>{SetSemester(e.target.value)}} required /> 
                    </div>

                    <div>
                    <button type="submit" >Submit</button>
                    <button onClick={() => window.location.reload(true)}>Clear</button>

                    </div>
                     
             </form>

             
             

            </div>
    );
};

export default CreateLab;