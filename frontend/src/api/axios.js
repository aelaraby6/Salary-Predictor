import axios from 'axios'

const api = axios.create({
    baseURL: 'https://salary-predictor-3ubw.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api
