import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { updateAsset, createAsset, StreamingService } from "../../service/api";
import { useNavigate } from "react-router-dom"

const StreamingForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const streaming = (location.state as any)?.streaming as StreamingService;

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const streamingAsset = formatAsset();
            console.log(streamingAsset);
            if(streaming){
                await updateAsset("streaming", streamingAsset);
            } else {
                await createAsset("streaming", streamingAsset);
            }
            navigate("/streaming")
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const formatAsset = () => {
        const asset: StreamingService = {};
        asset["@key"] = streaming && streaming["@key"];
        asset.name = (document.getElementById("streaming-name") as HTMLInputElement)?.value;
        return asset;
    }

    return (
        <Container>
            <div>
                <h2>
                    {streaming ? "Edit" : "New"} streaming service
                </h2>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <TextField id="streaming-name" label="Name" defaultValue={streaming?.name} style={{marginBottom: 10}} />
                <div style={{marginLeft: 'auto'}}>
                    <Button variant="text" onClick={() => navigate("/streaming")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => handleSubmit()} disabled={loading}>
                        Save
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default StreamingForm;