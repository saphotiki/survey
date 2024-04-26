import React , {useState , useEffect} from "react";

export default function RatingTable({sendData}){
    const questions = [{q:"I like to watch movies",v:"watch_movies"}, 
    {q:"I like to listen to radio",v:"listen_radio"}, 
    {q:"I like to eat out",v:"eat_out"}, 
    {q:"I like to watch TV",v:"watch_tv"}];
    var [table , setTable] = useState({
        watch_movies:"",
        listen_radio:"",
        eat_out:"",
        watch_tv:""
    });

    useEffect(()=> sendData(table) , [table]);

    function handleChange(e) {
        const value = e.currentTarget.value;
        setTable({
            ...table,
            [e.currentTarget.name]: value
        });
    }

    const listquestions = questions.map((o,i,a)=>
        <tr key={i}>
            <th scope="col">{o.q}</th>
            <th scope="col"><input type="radio" onChange={handleChange}  value="SA" name={o.v} /></th>
            <th scope="col"><input type="radio" onChange={handleChange}  value="A" name={o.v} /></th>
            <th scope="col"><input type="radio" onChange={handleChange}  value="N" name={o.v} /></th>
            <th scope="col"><input type="radio" onChange={handleChange}  value="DA" name={o.v} /></th>
            <th scope="col"><input type="radio" onChange={handleChange}  value="SDA" name={o.v} /></th>
        </tr>)

    return (<>
        <p>Please rate your level of agreement on a scale from 1 to 5, with 1 being "strong agree" and 5 being "strong disagree"</p>
        <table>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Strongly Agree</th>
                    <th scope="col">Agree</th>
                    <th scope="col">Neutral</th>
                    <th scope="col">Disagree</th>
                    <th scope="col">Strongly Disagree</th>
                </tr>
            </thead>
            <tbody>
                {listquestions}
            </tbody>
        </table>
    </>)
}