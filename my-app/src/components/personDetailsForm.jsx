import React, {useState , useEffect} from "react";

export default function PersonDetailsForm({sendData}) {
    var [form , setForm] = useState({
        name:"",
        email:"",
        dob:Date.now,
        phone:""
    });

    useEffect(()=> sendData(form) , [form]);

    function handleChange(e) {
        const value = e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        });
    }


    return (<>
        <label htmlFor="name">Full Names</label>
        <input name="name" placeholder="Text" value={form.name} onChange={handleChange} aria-label="Text" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Text" value={form.email} onChange={handleChange} aria-label="Text" />
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" placeholder="Text" value={form.dob} onChange={handleChange} aria-label="Text" />
        <label htmlFor="phone">Contact Number</label>
        <input type="tel" name="phone" placeholder="Text" value={form.phone} onChange={handleChange} aria-label="Text" />
    </>
    );
}