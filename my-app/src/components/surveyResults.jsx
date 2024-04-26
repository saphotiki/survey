import React from "react";
import { useLoaderData } from "react-router-dom";

const surveys = { SA : "Strongly Agree",
        A:"Agree",
        N:"Neutral",
        D:"Disagree",
        SDA:"Strongly Disagree"
};


export default function SurveyResults({ props }) {
    const response = useLoaderData();

    const totalSurveys = response.total;
    const averageAge = response.averageAge;

    const oldestPerson = response.oldest;
    const youngestPerson = response.youngest;

    const pizzaLovers = response.percentagePizza;
    const pastaLovers = response.percentagePasta;
    const papAndWorsLovers = response.percentagePapAndWors;

    const movieLovers = surveys[response.watchMovies];
    const radioListeners = surveys[response.listenRadio];
    const eatOutFans = surveys[response.eatOut];
    const tvWatchers = surveys[response.watchTV];

    function getAge(dob){
        var dob = new Date(dob)
        var month_diff = Date.now() - dob.getTime();  
      
        //convert the calculated difference in date format  
        var age_dt = new Date(month_diff);   
          
        //extract year from date      
        var year = age_dt.getUTCFullYear();  
          
        //now calculate the age of the user  
        var age = Math.abs(year - 1970);  
        return age;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="survey-results" style={{ width: '60%', padding: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Survey Results</h3>
                <div className="container">
                    <div style={{ marginBottom: '20px' }}>
                        <p>Total number of surveys: {totalSurveys}</p>
                        <p>Average Age: {averageAge.toFixed(2)}</p>
                        <p>Oldest person who participated in survey: {oldestPerson.name}, {getAge(oldestPerson.dob)} years old</p>
                        <p>Youngest person who participated in survey: {youngestPerson.name}, {getAge(youngestPerson.dob)} years old</p>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <p>Percent of people who like Pizza: {(pizzaLovers).toFixed(2)}%</p>
                        <p>Percent of people who like Pasta: {(pastaLovers).toFixed(2)}%</p>
                        <p>Percent of people who like Pap and Wors: {(papAndWorsLovers).toFixed(2)}%</p>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <p>People who like to watch movies: {movieLovers}</p>
                        <p>People who like to listen to radio: {radioListeners}</p>
                        <p>People who like to eat out: {eatOutFans}</p>
                        <p>People who like to watch TV: {tvWatchers}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    }    

    export async function loader(){
        const response = await fetch("http://localhost:4000/survey" , {
            method: "get",
            headers: {
              "content-type": "application/json",
            }
          })
        
          if (!response.ok || response.status == 500) {
            return [];
          }
        
          if (response.status === 422 || response.status === 401) {
            const json = await response.json();
            return json;
          }
        
          const res = await response.json();
          console.log(res);
          return res;
    }