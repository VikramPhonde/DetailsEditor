import React, { useState } from 'react'
import datafetched from '../Celebrities.json'
import CelebrityInfo from './CelebrityInfo'
import Alert from './Alert'

function Home() {

    const [alert, setAlert] = useState(null);
    // const data = JSON.parse(JSON.stringify(datafetched));
    const [data,setData]= useState(JSON.parse(JSON.stringify(datafetched)));

    //rpugh code
    
    //rough code
    const [choice, setChoice] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [accoLocker, setAccoLocker] = useState(false);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
    }

    const handleSearchButton = () => {
        setChoice('button')
    }

    const handleEnter = (e) => {
        if(e.key==="Enter"){
            e.preventDefault();
        setChoice('button')
        }
    }

    return (
        <>
            <div className=''>

                <div className='my-3 mx-3'>
                    <h4 className=''><strong>Celebrity Details Editor</strong></h4>
                </div>
                <div>
                    <Alert alert={alert} />
                </div>
                <div className='mx-3'>
                    <form className="d-flex w-50" role="search">
                        <input className="form-control me-2" type="search" aria-label="Search" placeholder='Type Keywords'
                            value={searchText} onChange={handleSearchChange} onKeyPress={handleEnter} 
                            disabled={accoLocker===false?false:true}/>
                        <span className="btn btn-outline-success" type="submit" onClick={handleSearchButton} 
                         >Search</span>
                    </form>
                </div>

                <div className="accordion accordion-flush mx-3" id="accordionFlushExample">
                    <div className="accordion-item">
                        {choice === 'All' ?
                            data.map((element, index) => {

                                if(element){
                                    return <CelebrityInfo key={index} id={element.id} fname={element.first} lname={element.last} gender={element.gender}
                                    country={element.country} description={element.description} dob={element.dob} setAlert={setAlert}
                                    setData={setData} data={data} iterate={index} accoLocker={accoLocker} 
                                     setAccoLocker={setAccoLocker}
                                 />}
                                
                            })
                            :
                            data.map((element, index) => {

                                if(element){
                                    if (element.first.toLowerCase().includes(searchText.toLowerCase()) || element.last.toLowerCase().includes(searchText.toLowerCase())
                                          || searchText.toLowerCase().includes(element.first.toLowerCase()+" "+element.last.toLowerCase())    ) {
                                      return <CelebrityInfo key={index} id={element.id} fname={element.first} lname={element.last} gender={element.gender}
                                       country={element.country} description={element.description} dob={element.dob} setAlert={setAlert}
                                        setData={setData} data={data} iterate={index} accoLocker={accoLocker} 
                                         setAccoLocker={setAccoLocker} 
                                    />}
                                }
                                

                            })
                        }
                        {/* {
                            data.map((element, index) => {
                                return <CelebrityInfo key={index} id={element.id} fname={element.first} lname={element.last} gender={element.gender}
                                  country={element.country} description={element.description} dob={element.dob} setAlert={setAlert}
                                   />
                            })
                        } */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
