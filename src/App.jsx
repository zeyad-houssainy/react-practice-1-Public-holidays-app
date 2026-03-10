import { useEffect, useState } from 'react'
import './App.css'
import 'paper-css/paper.min.css';
// import DatePicker from 'react-datepicker'
// Date Picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function App() {

  const [selectedCountry, setselectedCountry] = useState("")
  const [countryData, setCountryData] = useState([])
  const [selectedYear, setSelectedYear] = useState("")
  const [vacationList, setVacationList] = useState([])


  // API importing data

  // Fetching Country codes
  // get/api/v3/AvailableCountries
  useEffect(() => {
    const fetchContries = async () => {
      try {
        const response = await fetch("https://date.nager.at/api/v3/AvailableCountries")
        const data = await response.json()
        setCountryData(data)
        // console.log(countryData)
      } catch (err) {
        console.error(err)
      }
    }

    fetchContries()
}, [])

// Fetching Country Vacation
// get/api/v3/PublicHolidays/{year}/{countryCode}
useEffect(() => {
  const fetchHolidays = async () => {
    try {
      // change when using selecting date to `https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/${selectedCountry}
      const response = await fetch (`https://date.nager.at/api/v3/PublicHolidays/2026/${selectedCountry}`)
      const data = await response.json()
      setVacationList(data)
      console.log(data)
      // console.log(`Year: ${selectedYear}, Country: ${selectedCountry}`)
    } catch (err) {
      console.error(err)
    }
  }

  fetchHolidays()
}, [selectedCountry, selectedYear])

  return (  
    <>


        <h1 style={{width : '80%'}}>Public holidays app</h1>
        
        {/* Selecting Country */}
        <select style={{width : '35%'}} id="options" value={selectedCountry} onChange={(e) => setselectedCountry(e.target.value)}>
          <option  value={""}>-- Select a Country --</option>
          {countryData.map((country) => {
            console.log(selectedCountry)
            return(<option key={country.countryCode} value={country.countryCode}>{country.name}</option>)
          })}
        </select>
          
        {/* Selecting Year */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker 
                openTo="year"
                label={'"year"'} 
                selected={selectedYear}
                onChange={(date) => setSelectedYear(date)}
                showYearPicker
                dateFormat={"yyyy"}
                format="YYYY" 
                />
            </DemoContainer>
          </LocalizationProvider> */}

          {/* <DatePicker
            selected={selectedYear}
            onChange={(date) => setSelectedYear(date.getFullYear())}
            showYearPicker
            dateFormat={"yyyy"}
            className="my-custom-input"
            
          /> */}

          {/* Vacations list */}
          <div >
            <ul  className="inline">
              {vacationList.map((countryVacation) => {
                return (
                  <li key={countryVacation.date}><strong>{countryVacation.localName}: {countryVacation.date}<br/></strong></li>
                )
              })}
            </ul>
          </div>
    </>
  )
}

export default App
