import React, { useState } from 'react';

function CelebrityInfo(props) {


    const pair = {
        1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", 11: "Eleven", 12: "Twelve",
        13: "Thirteen", 14: "Fourteen", 15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen", 20: "Twenty"
    };

    const tempdata = JSON.parse(JSON.stringify(props.data))
    const today = new Date();
    const dobdate = new Date(props.dob)
    let newAge = today.getFullYear() - dobdate.getFullYear();
    if (
        today.getMonth() < dobdate.getMonth() ||
        (today.getMonth() === dobdate.getMonth() &&
            today.getDate() < dobdate.getDate())
    ) {
        newAge--;
    }

    newAge= newAge.toString();
    //rough code
    console.log(props.dob)
    if(!props.dob.includes('-')){
        newAge= props.dob;
    }
    //rpigh code

    const [age, setAge] = useState(newAge);
    const [gen, setGen] = useState(props.gender);
    const [countr, setCountr] = useState(props.country);
    const [descr, setDescr] = useState(props.description);
    const [readable, setReadable] = useState(true);
    const [savebackDisable, setSaveBackDisable] = useState(true);
    const [editDelDisable, setEditDelDisable] = useState(false)
    const [genderDisable, setGenderDisable] = useState(true)
    

    const [prevAge, setPrevAge] = useState('')
    const [prevGen, setPrevGen] = useState('')
    const [prevCountr, setPrevCountr] = useState('')
    const [prevDescr, setPrevDescr] = useState('')


    const handleAge = (event) => {
        if (!isNaN(event.target.value)) {
            setAge(event.target.value)
        }
        else {
            props.setAlert({ msg: "Only Numbers Allowed", type: "danger" })
            setTimeout(() => {
                props.setAlert(null);
            }, 1000);
        }
    }


    const handleCountry = (event) => {
        if (event.target.value.match(/^[a-zA-Z ]*$/)) {
            setCountr(event.target.value)
        }
        else {
            props.setAlert({ msg: "Only Letters Allowed", type: "danger" })
            setTimeout(() => {
                props.setAlert(null);
            }, 1000);
        }
    }

    const handleDescription = (event) => {
        if (event.target.value.match(/^[a-zA-Z,.!? ]*$/)) {
            setDescr(event.target.value)
        }
        else {
            props.setAlert({ msg: "Only Letters Allowed", type: "danger" })
            setTimeout(() => {
                props.setAlert(null);
            }, 1000);
        }
    }

    const handleGenDrop = (event) => {
        setGen(event.target.value);
    }

    const handleEdit = () => {

        if(age<18){
            props.setAlert({ msg: "Cant edit details if not an adult", type: "danger" })
            setTimeout(() => {
                props.setAlert(null);
            }, 1000);
        }
        else{
            setPrevAge(age);
        setPrevCountr(countr);
        setPrevGen(gen);
        setPrevDescr(descr);
        setEditDelDisable(true);
        setSaveBackDisable(false);
        setReadable(false);
        setGenderDisable(false);
        props.setAccoLocker(true);
        }
        

    }

    const handleDelete = () => {

        if (window.confirm("DO you really want to delete!") === true) {
            delete tempdata[props.iterate];
        console.log(tempdata);
        props.setData(tempdata);
          } else {
            
          }

        // delete tempdata[props.iterate];
        // console.log(tempdata);
        // props.setData(tempdata);
    }

    const handleSave = () => {

        if (age === ''|| countr === '' || descr === '') {
            props.setAlert({ msg: "Cant keep fields empty", type: "danger" })
            setTimeout(() => {
                props.setAlert(null);
            }, 1000);
        }

        else {
            
            tempdata[props.iterate].gender=gen;
            tempdata[props.iterate].description=descr;
            tempdata[props.iterate].country=countr;
            tempdata[props.iterate].dob=age;
            props.setData(tempdata);
            setEditDelDisable(false);
            setSaveBackDisable(true);
            setReadable(true);
            setGenderDisable(true);
            props.setAccoLocker(false);
        }
    }

    const handleBack = () => {
        setAge(prevAge);
        setGen(prevGen);
        setCountr(prevCountr);
        setDescr(prevDescr);
        setEditDelDisable(false);
        setSaveBackDisable(true);
        setReadable(true);
        setGenderDisable(true);
        props.setAccoLocker(false);
    }

    return (
        <>
            <h2 className="accordion-header w-50" >
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                data-bs-target={`#flush-collapse${pair[props.id]}`} aria-expanded="true" 
                aria-controls={`flush-collapse${pair[props.id]}`} disabled={props.accoLocker===false?false:true} >
                    {props.fname} {props.lname}
                </button>
            </h2>
            <div id={`flush-collapse${pair[props.id]}`} className="accordion-collapse collapse w-50" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    <div className='d-flex justify-content-between '>
                        <p>Age</p>
                        <p>Gender</p>
                        <p>Country</p>
                    </div>
                    <div className='d-flex justify-content-between '>
                        <input value={age} onChange={handleAge} readOnly={readable} />
                        {/* <input value={gen} onChange={handleGender} readOnly={readable} /> */}
                        <select className="form-select" aria-label="Default select example" disabled={genderDisable} 
                                value={gen} onChange={handleGenDrop} >
                            {/* {gen !== "male" && <option >male</option>}
                            {gen !== "female" && <option >female</option>} */}
                            <option >male</option>
                            <option >female</option>
                            <option >Transgender</option>
                            <option >Rather Not Say</option>
                            <option >Other</option>

                        </select>
                        <input value={countr} onChange={handleCountry} readOnly={readable} />
                    </div>
                    <div>
                        <p>Description</p>
                    </div>
                    <div>
                        <textarea className='w-100' value={descr} onChange={handleDescription} readOnly={readable} />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex my-2'>
                            <button type="button" className="btn btn-primary mx-1" onClick={handleEdit}
                                disabled={editDelDisable}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}
                                disabled={editDelDisable}>Delete</button>

                        </div>
                        <div className='d-flex my-2'>
                            <button type="button" className="btn btn-success mx-1" disabled={savebackDisable} onClick={handleSave}>Save</button>
                            <button type="button" className="btn btn-danger" disabled={savebackDisable} onClick={handleBack}>Back</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CelebrityInfo
