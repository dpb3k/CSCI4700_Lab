import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'wouter';
import fb from '../firebase';
const DB = fb.firestore()
const Labslist = DB.collection('labs');

const LabslistView = () => {
    // list function to display 
    const [labs, Setlabs] = useState([]);
    // search query
    const [search, SetSearch] = useState ([""]);

    // catch and show data to users
    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = Labslist.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            // Update state
            Setlabs(data);
          });
  
          // Detach listener
          return unsubscribe;

    },[])

    const SearchLabs = (e)=> {
        e.preventDefault();
        Setlabs(labs.filter((labs)=>
            labs.Title.toLowerCase().includes(search.toLowerCase()) || labs.Title.toUpperCase().includes(search.toUpperCase())||
            labs.Overview.toLowerCase().includes(search.toLowerCase()) || labs.Overview.toUpperCase().includes(search.toUpperCase()) ||
            labs.Prof.toLowerCase().includes(search.toLowerCase()) || labs.Prof.toUpperCase().includes(search.toUpperCase())||
            labs.Body.toLowerCase().includes(search.toLowerCase()) || labs.Body.toUpperCase().includes(search.toUpperCase()) ||
            labs.Skills.toLowerCase().includes(search.toLowerCase()) || labs.Skills.toUpperCase().includes(search.toUpperCase())||
            labs.Semester.toLowerCase().includes(search.toLowerCase()) || labs.Semester.toUpperCase().includes(search.toUpperCase())
        ));
    };

    return (
        <div>
            
            <form onSubmit={(e)=> {SearchLabs(e)}}>
                <Card class = "bg-primary mb-3" >
                    <Card.Body>
                    <div class="input-group" style= {{margin: '10px'}}>
                    <label for="lsearch">Lab Search:  </label>
                    <input type="search"  name="lsearch" onChange={(e)=> {SetSearch(e.target.value)}}  placeholder="Search for a lab" size = "70"  /> 
                    <button type="submit" class="btn btn-outline-primary">  Search</button>     
                    </div>                
                     </Card.Body>
                 </Card>
                   
                <p className="read-the-docs">
                    Use the search bar or click the header at the top to navigate or click the logo to go to mtsu's website
                </p>
                <div className='closer'>Or scroll to browse the full list</div>
            </form>
          
            {labs.map(lab=> (
                <Card style={{  borderWidth: '2px', borderStyle: 'solid', margin: '100px', borderRadius: '12px',backgroundColor:'hsl(209, 98%, 52%, 0.3)'}}>
                <Card.Body>

                
                <div key = {lab.id}>
                    <h1> {lab.Title}</h1>
                    <h3> {lab.Overview} </h3>
                    <h4> {lab.Prof}</h4>
                    {/*<p> {lab.Body} </p>
                    <p> Skills: {lab.Skills} </p> */}
                    <p> Semesters: {lab.Semester} </p>
                    <li>
                    <Link href={"/show/" + lab.id}> 
                        <button> View </button>
                         </Link>
                    </li>
                    
                   
                </div>
                </Card.Body>
                </Card>

            ))}

        </div>
    );

};
export default LabslistView;