import { useEffect, useState } from 'react'
import './App.css'
import 'paper-css/paper.min.css';
// Date Picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from 'react-datepicker'

function App() {

  const [selectedCountry, setSelectedCountry] = useState("")
  const [countryData, setCountryData] = useState([])
  const [selectedYear, setSelectedYear] = useState("2026")
  const [vacationList, setVacationList] = useState([])

  // API importing data

  // Fetching Country codes
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
    if (!selectedCountry) return

    const fetchHolidays = async () => {
      try {
        // change when using selecting date to `
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/${selectedCountry}`)
        const data = await response.json()
        setVacationList(data)
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchHolidays()
  }, [selectedCountry, selectedYear])

  return (
    <>
      <h1 style={{ width: '80%' }}>Public holidays app</h1>

      {/* Selecting Country */}
      <select style={{ width: '35%' }} id="options" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value={""}>-- Select a Country --</option>
        {countryData.map((country) => {
          return (
            <option key={country.countryCode} value={country.countryCode}>
              <strong>{country.name}</strong>
            </option>
          )
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
      <div>
        <ul className="inline">
          {vacationList.map((countryVacation) => {
            return (
              <li key={countryVacation.date}>
                <strong>{countryVacation.localName}: {countryVacation.date}<br /></strong>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App