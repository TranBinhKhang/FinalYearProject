import { create } from 'apisauce';

const apiClient = create({
 baseURL: 'http://192.168.1.142:4000/api'
});

export default apiClient;