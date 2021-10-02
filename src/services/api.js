import axios from "axios";
// https://api.themoviedb.org/3/movie/now_playing?api_key=48f186009f535f5beb7051466c945314&language=pt-BR&page=1

export const key = '48f186009f535f5beb7051466c945314'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api