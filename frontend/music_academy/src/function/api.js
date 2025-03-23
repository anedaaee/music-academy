import axios from "axios";

import app_config from "@/config/config"

const api = async (method,url,data,token,contentType) => {
    try{
        let config = {
            method : method,
            url : `${app_config.API_URL}${url}`,
            maxBodyLength: Infinity,
            data:data,
            headers:{
                "Content-Type": contentType?contentType:"application/json",
                ...(token && {Authorization:token})
            }
        }

        let result = await axios.request(config)

        return result
    }catch(err){
        if(err.name && err.name == 'AxiosError'){
            return err.response
        }else{
            throw err
        }
    }
}


export default api