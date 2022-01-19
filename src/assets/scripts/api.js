import axios from 'axios'
const sheetId = process.env.VUE_APP_GOOGLE_SHEET_ID
    const key = process.env.VUE_APP_GOOGLE_API_KEY

const getPeopleListAPI = ()=>{
   
    
    const sheetName = 'people'
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?alt=json&key=${key}`
    return axios.get(url)
}

export {getPeopleListAPI};