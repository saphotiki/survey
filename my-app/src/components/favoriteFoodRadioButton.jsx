import React , {useEffect , useState} from "react";

export default function FavoriteFoodRadioButton({sendData}){
    var [food , setFood] = useState();
    useEffect(()=> sendData(food) , [food]);

    function handleChange(e){
        setFood(e.currentTarget.value);
    }

    return (<fieldset>
    <span>What is your favorite food?   </span>
        <input type="radio" id="pizza" onChange={handleChange} value="pizza" name="favourite-food" />
        <label htmlFor="pizza">Pizza</label>
        <input type="radio" id="pasta" onChange={handleChange}  value="pasta" name="favourite-food"  />
        <label htmlFor="pasta">Pasta</label>
        <input type="radio" id="PapAndWors" onChange={handleChange}  value="PapAndWors" name="favourite-food"  />
        <label htmlFor="PapAndWors">Pap and Wors</label>
        <input type="radio" id="other" onChange={handleChange}  value="other" name="favourite-food"  />
        <label htmlFor="other">Other</label>
    </ fieldset>);
}