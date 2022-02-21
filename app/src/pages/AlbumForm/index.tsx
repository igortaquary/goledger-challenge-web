import { Button, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Album, updateAsset, createAsset, Artist, StreamingService, searchAssetByName } from "../../service/api";
import { FormContainer } from "./styles";
import { useNavigate } from "react-router-dom"

const AlbumForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const album = (location.state as any)?.album as Album;

    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtistKey, setSelectedArtistKey] = useState<string | null>(album?.artist["@key"]!);
    const [strOptions, setStrOptions] = useState<StreamingService[]>([]);
    const [selectedStr, setSelectedStr] = useState<string[]>([]);

    useEffect(() => {
        searchArtists("");
        searchStreamings();
        if(album){
            //setSelectedArtistKey(album.artist["@key"]!);
            if(album.strOptions)
                setSelectedStr(album.strOptions.map( s => s["@key"]!))
        }
    }, [])


    const searchArtists = async (searchTerm: string = "") => {
        setLoading(true);
        try {
            const res = await searchAssetByName("artist", searchTerm, 1);
            const result = res.data?.result;
            if(result) setArtists(result);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const searchStreamings = async () => {
        setLoading(true);
        try {
            const res = await searchAssetByName("streaming", "", 1);
            const result = res.data?.result;
            if(result) setStrOptions(result);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const albumAsset = formatAlbumAsset();
            console.log(albumAsset);
            if(album){
                await updateAsset("album", albumAsset);
            } else {
                await createAsset("album", albumAsset);
            }
            navigate("/album")
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const formatAlbumAsset = () => {
        const asset: Album = {nTracks: 0, artist: ({} as Artist)};
        asset.id = album?.id;
        asset["@key"] = album && album["@key"];
        asset.name = (document.getElementById("album-name") as HTMLInputElement)?.value;
        asset.genre = (document.getElementById("album-genre") as HTMLInputElement)?.value;
        asset.year = Number((document.getElementById("album-year") as HTMLInputElement)?.value);
        asset.nTracks = Number((document.getElementById("album-nTracks") as HTMLInputElement)?.value);
        asset.explicit = (document.getElementById("album-explicit") as HTMLInputElement)?.checked;
        asset.artist = artists.find( a => a["@key"] === selectedArtistKey)!;
        asset.strOptions = strOptions.filter( s => selectedStr.includes(s["@key"]!));
        return asset;
    }

    return (
        <Container>
            <div>
                <h2>
                    {album ? "Edit" : "New"} album
                </h2>
            </div>
            <FormContainer>
                <TextField id="album-name" label="Name" defaultValue={album?.name}  />
                <TextField id="album-genre" label="Genre" defaultValue={album?.genre}  />
                <TextField id="album-year" label="Year" defaultValue={album?.year} type="number"  />
                <TextField id="album-nTracks" label="Number of Tracks" defaultValue={album?.nTracks} type="number" />
                <div>
                    <FormControlLabel control={<Switch id="album-explicit" />} label="Explict" />
                </div>
                <FormControl fullWidth >
                    <InputLabel>Artist</InputLabel>
                    <Select
                        value={selectedArtistKey}
                        label="Artist"
                        onChange={(e) => setSelectedArtistKey(e.target.value)}
                    >
                        { artists.map( (artist, i) => 
                            <MenuItem key={i} value={artist["@key"]}>{artist.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl fullWidth  >
                    <InputLabel>Streaming Services</InputLabel>
                    <Select
                        value={selectedStr}
                        label="Streaming Services"
                        multiple
                        onChange={(e) => 
                            setSelectedStr(
                            // Autofill get a stringified value.
                            typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                          ) 
                        }
                    >
                        { strOptions.map( (str, i) => 
                            <MenuItem key={i} value={str["@key"]}>{str.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <div style={{marginLeft: 'auto'}}>
                    <Button variant="text" onClick={() => navigate("/album")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => handleSubmit()} disabled={loading}>
                        Save
                    </Button>
                </div>
            </FormContainer>
        </Container>
    )
}

export default AlbumForm;