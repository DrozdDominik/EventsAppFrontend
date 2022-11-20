import {apiUrl} from "../config/api";

export const fetchPost = async <T> (path: string, data: T): Promise<Response> => {
    return await fetch(`${apiUrl}/${path}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}