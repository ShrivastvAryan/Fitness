import axios from "axios";

const api=axios.create({
    baseURL:"/json/tshirt.json"
})

export default api