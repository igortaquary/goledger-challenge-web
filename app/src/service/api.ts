import axios from 'axios'

const api = axios.create({
    baseURL: "http://ec2-100-26-133-117.compute-1.amazonaws.com/api"
});

export interface Artist {
    "@key"?: string,
    id?: string,
    name?: string,
    location?: string,
    description?: string
}

export interface StreamingService {
    "@key"?: string,
    id?: string,
    name?: string,
}

export interface Album {
    "@key"?: string,
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

export function deleteAsset(type: "artist" | "streaming" | "album", asset: Artist | Album | StreamingService){
    const payload = {
        key: {
            "@assetType": type,
            ...asset
        }
    }
    return api.delete('/invoke/deleteAsset', {data: payload})
}

export function searchAssetByName(type: "artist" | "streaming" | "album", searchQuery: string, page: number = 1) {
    const itemsPerPage = 5;
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