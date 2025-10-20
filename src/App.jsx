import React from 'react'
import { useEffect,useState } from 'react'
import './App.css'
import axios from 'axios'


const App = () => {
  const [val,setval] = useState(1)
  const [fromcry,setFromcry] = useState('USD')
  const [tocry,setTocry] = useState('INR')
  const [res,setres] = useState(0)

  useEffect(()=>{
    const getExchange = async () =>{
       try{
          let url = `https://api.exchangerate-api.com/v4/latest/${fromcry}`
          let result = await axios.get(url)
          let data = result.data.rates
          // console.log("hiiii",data)
          let rate = data[tocry]
          let final = val * rate
          setres(final.toFixed(2))
        
        }
    catch(error){
      console.log('error ',error)

    }

    }
    getExchange()
   
  })

  const handleExchange = (e)=>{
    const value = parseFloat(e.target.value)
    setval(value <0 ?0:  value)

  }

  


  return (
    <div className='container'>
      <div className="box">
        <h1>Currency Converter</h1>
        <hr/>
        
        <div className='comp'>
          <label >AMOUNT</label><br />
        <input type="number" value={val} name="" id="" onChange={handleExchange}/>
        </div>
        <div className='comp'>
          <label>FROM</label><br />
            <select name="" className='opt' value={fromcry} onChange={e=>setFromcry(e.target.value)}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>

        </div>

        <div className='comp'>
          <label>TO</label><br />
        <select name="" className="opt" value={tocry} onChange={e=>setTocry(e.target.value)}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>


        </div>
        

        <p>RESULT  Rs.{res} value {val} {fromcry} to {tocry}</p>
      </div>
      
    </div>
  )
}

export default App
