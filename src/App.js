import { useState } from "react"
import './App.css';
function App() {
  let array = [0, 0, 0];
  const [a, setA] = useState()
  const [b, setB] = useState()
  const [c, setC] = useState()
  const [search, setSearch] = useState("")
  const [alert, setAlert] = useState(false);
  const [hum, setHum] = useState(0);
  const [temp, setTemp] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [pre, setPre] = useState(0);
  const [gro, setGro] = useState(0);

  let submithandler = (event) => {
    setAlert(false)
    setHum(0);
    setMin(0);
    setTemp(0);
    setMax(0);
    setPre(0);
    setGro(0);
    event.preventDefault();
    let fetchdata = async () => {
      let prom = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.toUpperCase()}&units=metric&appid=c224254437a0d066a180d9525018825f`)
      let output = await prom.json()
      console.log(output);
      if ((output.message === "city not found")||(output.message==="Nothing to geocode")) {
        setAlert(true);
      } 
       else{
        setHum(output.main.humidity);
        setMin(output.main.temp_min);
        setTemp(output.main.temp);
        setMax(output.main.temp_max);
        setPre(output.main.pressure);
        setGro(output.main.feels_like);
       }
      
    
if(temp){
  array.push(search);
  if (array.length > 3) {
    array.pop()
  }
  if (array[0] !== 0) {
    setA(array[0])
  }
  if (array[1] !== 0) {
    setB(array[1])
  }
  if (array[2] !== 0) {
    setC(array[2])
  }

}


    }
    fetchdata();
  }
  return (
    <div >
      <div id="parent">
        <div id="child" >
          <h1 id="weather">Weather App </h1>
          <div>
            <input type={'search'} id='input' placeholder='Enter City Name' onChange={(e) => { setSearch(e.target.value) }}  ></input>
            <button onClick={submithandler}  >Submit </button>
            {(alert===true) ?
              <>
                {a}{b}{c}
                
              </>
              : <></>
            }
            {alert ?
              <div id="alert" > "Please Enter The Valid City Name " </div> :
              <>
              </>
            }

            {(search !== ".") && (!alert) && (search !== "") && (temp !== 0) ? <> <div>

              <ul id="ui">
                <li>Weather Details of City:{search.toUpperCase()}</li>
                <li>Current Temperature:{temp}</li>
                <li>Temperature Range:{max}*C to {min}*C</li>
                <li>Humidity:{hum}</li>
                <li>Sea Leavel:{pre}</li>
                <li>Ground Level:{gro}</li>
              </ul>
            </div></> : <></>}


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
