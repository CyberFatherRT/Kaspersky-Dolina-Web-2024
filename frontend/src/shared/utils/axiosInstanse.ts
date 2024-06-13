import axios from "axios";


export const axiosInstanse = axios.create()
 
axiosInstanse.interceptors.request.use((config) => {
  const token = localStorage.getItem('teamToken');
  config.headers['X-TEAM-NAME'] = token;
  return config;
});