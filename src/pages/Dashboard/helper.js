import { base_url } from "../../Components/shared/Url";

const token = sessionStorage.getItem("jwt_token");

async function fetchNameCustom(url) {
    url = `${base_url}/${url}/`;
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.first_name;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function customName(url) {
    try {
        const name = await fetchNameCustom(url);
        console.log(name);
        return name;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



//new try
async function fetchData(url) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export default async function getData() {
    const url = base_url+'/contructor-beneficaries/13'; // Replace with your API URL
    try {
        const data = await fetchData(url);
        console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}
