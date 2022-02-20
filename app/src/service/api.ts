import axios from 'axios'

const api = axios.create({
    baseURL: "http://ec2-100-26-133-117.compute-1.amazonaws.com/api"
});

interface Artist {
    id?: string,
    name?: string,
    location?: string,
    description?: string
}

interface StreamingService {
    id?: string,
    name?: string,
}

interface Album {
    id?: string,
    name?: string,
    year?: number,
    nTracks: number,
    artist: Artist,
    genre?: string,
    explicit?: boolean,
    strOptions?: StreamingService[]
}

export function createAsset(type: "artist" | "streaming" | "album", asset: Artist | Album | StreamingService){
    const payload = {
        asset: [
            {
              "@assetType": type,
              ...asset
            }
          ]
    }
    return api.post('/invoke/createAsset', payload)
}

export function updateAsset(type: "artist" | "streaming" | "album", asset: Artist | Album | StreamingService){
    const payload = {
        update: {
            "@assetType": type,
            ...asset
        }
    }
    return api.put('/invoke/updateAsset', payload)
}

export function deleteAsset(type: "artist" | "streaming" | "album", assetId: string){
    const payload = {
        key: {
            "@assetType": type,
            id: assetId
        }
    }
    return api.delete('/invoke/deleteAsset', {data: payload})
}

export function searchAssetByName(type: "artist" | "streaming" | "album", searchQuery: string, page: number = 1) {
    const itemsPerPage = 10;
    const payload = {
        query: {
            selector: {
                "@assetType": type,
                "name": { 
                    "$regex": `^(?i).*(${searchQuery}).*`
                }
            },
            limit: itemsPerPage,
            skip: (page - 1) * itemsPerPage
        }
    }
    return api.post('/query/search', payload);
}