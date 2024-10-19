import { API_URL } from "./constants";
import { formatDistanceToNow } from 'date-fns';

// Example timestamp (in milliseconds)


// console.log(timeAgo); // Output: "2 hours ago" (if current time is 12:00)


export const formatDateTime = (datetime) => {
    const timestamp = new Date(datetime).getTime();
    let timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    if (timeAgo.startsWith('about ')){
        timeAgo = timeAgo.slice(6)
    }
    return timeAgo
}
export const getEndpoint = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data
    }
    catch (error) {
        console.error('Error fetching data', error);
    }
}

export const postEndpoint = async(endpoint, data=null, config=null) => {
    try{
        const response =  await axios.post(endpoint, data=data, config=config);
    }
   catch(error){
    console.error('Error occured', error)
   }
}

export const getBackend = async(endpoint) => {
    return await getEndpoint(API_URL + endpoint)
}
export const postBackend = async(endpoint, data=null, config=null) => {
    return await postEndpoint(
        API_URL + endpoint,
        data,
        {
            headers: config.headers ?? {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer access-token'
            },
            params: config.params
        }
    )
}