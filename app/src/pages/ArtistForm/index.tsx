import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Artist, updateAsset, createAsset } from "../../service/api";
import { FormContainer } from "./styles";
import { useNavigate } from "react-router-dom"

const ArtistForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const artist = (location.state as any)?.artist as Artist;

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const artistAsset = formatArtistAsset();
            console.log(artistAsset);
            if(artist){
                await updateAsset("artist", artistAsset);
            } else {
                await createAsset("artist", artistAsset);
            }
            navigate("/artist")
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const formatArtistAsset = () => {
        const asset: Artist = {};
        asset.id = artist?.id;
        asset.name = (document.getElementById("artist-name") as HTMLInputElement)?.value;
        asset.description = (document.getElementById("artist-description") as HTMLInputElement)?.value;
        asset.location = (document.getElementById("artist-location") as HTMLInputElement)?.value;
        return asset;
    }

    return (
        <Container>
            <div>
                <h2>
                    {artist ? "Edit" : "New"} artist
                </h2>
            </div>
            <FormContainer>
                <TextField id="artist-name" label="Name" defaultValue={artist?.name} style={{marginBottom: 10}} />
                <TextField id="artist-description" label="Description" defaultValue={artist?.description} style={{marginBottom: 10}} />
                <TextField id="artist-location" label="Location" defaultValue={artist?.location } style={{marginBottom: 10}} />
                <div style={{marginLeft: 'auto'}}>
                    <Button variant="text" onClick={() => navigate("/artist")}>
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

export default ArtistForm;