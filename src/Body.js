import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';

const Body = ({candidate1,candidate2 , vote}) =>{
    const[candidate, setCandidate] = useState();
    const onChange = (e) => {
        setCandidate(e.target.value);
    }
    const onsubmit = async (e)=>{
            e.preventDefault()
            if(candidate.id !=0) vote(Number(candidate));
            else
                window.alert("Error in submission");
    }
    return(<div>
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Vote count</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>{candidate1.name}</td>
                <td>{candidate1.vote_count}</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">{candidate2.id}</th>
                <td>{candidate2.name}</td>
                <td>{candidate2.vote_count}</td>
                <td>@mdo</td>
            </tr>
            </tbody>
        </table>
        <form onSubmit={onsubmit}>
            <select name="candidate" className="form-control" onChange={onChange}>
                <option defaultValue="">select</option>
                <option value = "1">{candidate1.name}</option>
                <option value = "2">{candidate2.name}</option>
            </select>
            <button className="btn btn-primary mt-2 btn-sm w-100">Vote Candidate {candidate}</button>
        </form>
    </div>)
}
export default Body