import React from "react";
import PersonDetailsForm from "../components/personDetailsForm";
import FavoriteFoodRadioButton from "../components/favoriteFoodRadioButton";
import RatingTable from "../components/ratingtable";

export default function formPage(){
    var personalForm ;

    var favoriteFood = "";

    var questions = {
        watch_movies:"",
        listen_radio:"",
        eat_out:"",
        watch_tv:""
    };

    function onformchange(data){
        personalForm = data;
    }

    function onFoodChange(data){
        favoriteFood = data;
    }

    function onQuestionChange(data){
        questions = data;
        console.log(questions)
    }

    function handleClick(){
        let data = {
            personalForm,
            favoriteFood,
            questions
        };
        const response =  fetch("http://localhost:4000/survey", {
                method: "post",
                body: JSON.stringify(data) ,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
            }).then(()=>{
                alert("Success")
            });
    }

return (<><div className="grid">
            <div>1</div>
            <div><PersonDetailsForm sendData={onformchange} /></div>
            <div></div>
            <div></div>
        </div>
        <FavoriteFoodRadioButton sendData={onFoodChange} />
        <RatingTable sendData={onQuestionChange} />
        <input type="submit" value="Submit" onClick={handleClick} />
        </>);
}