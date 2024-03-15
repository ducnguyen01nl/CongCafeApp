import axios from "axios";
export const addressApi = {
    getAddress: async() =>{
        try {
            const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            return response.data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
}