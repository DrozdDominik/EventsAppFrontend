type Coordinates = {
    lat: number;
    lon: number;
}

interface DataFromAPI {
    lat: string;
    lon: string;
    [key: string]: string;
}

type APIResponse = [DataFromAPI] | [];

export const geocode = async (address: string): Promise<Coordinates | null> => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}\`&format=json&limit=1`);
    const data = await response.json() as APIResponse;

    if(data.length !== 0) {
        const lat = parseFloat(data[0].lat)
        const lon = parseFloat(data[0].lon)

        return {
            lat,
            lon,
        }
    }

    return null;
}