import { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Fab, IconButton, TextField, Tooltip } from "@mui/material"
import { Card, CardsContainer, RowContainer, SearchContainer } from "./styles";
import { StreamingService, deleteAsset, searchAssetByName } from "../../service/api";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";

const StreamingPage = () => {

    const [services, setServices] = useState<StreamingService[]>([]);
    const [noMoreLoad, setNoMoreLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteService, setDeleteService] = useState<any>();

    useEffect(() => {
        if(page === 1 && !noMoreLoad && services.length === 0){
            fetchServices()
        }
    }, [page, noMoreLoad, services]);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await searchAssetByName("streaming", searchTerm, page);
            const result = res.data?.result;
            if(result){
                setServices(prev => [...prev, ...result]);
                setPage(prev => prev+1);
                if(result.length < 5) setNoMoreLoad(true);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleSearch = () => {
        setPage(1);
        setNoMoreLoad(false);
        setServices([]);
    }

    const openDeleteDialog = (asset: StreamingService) => {
        console.log(asset);
        setDeleteService(asset);
        setOpenDialog(true);
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            console.log(deleteService);
            setOpenDialog(false);
            if(deleteService) await deleteAsset("streaming", deleteService);
            setDeleteService(null);
        } catch (error) {
            console.log(error);
        }
        handleSearch();
    }

    return (
        <Container>
            <RowContainer>
                <h2>
                    Streaming Services
                </h2>
                <Link to="/streaming/form">
                    <Button variant="contained" endIcon={<AddCircleOutlineIcon />}>
                        New
                    </Button>
                </Link>
            </RowContainer>
            <CardsContainer>
                { loading ?
                    <CircularProgress color="secondary" />
                :
                <>
                    <SearchContainer>
                        <TextField label="Search Streaming" variant="outlined" size="small" 
                        onChange={(e) => setSearchTerm(e.target.value)} defaultValue={searchTerm} />
                        <Fab onClick={() => handleSearch()} color="primary" variant="circular" size="small" style={{marginLeft: 10}} >
                            <SearchIcon />
                        </Fab>
                    </SearchContainer>
                    { services.length > 0 && services.map( (streaming: StreamingService, i) => 
                        <Card key={i}>
                            <RowContainer>
                                <div>
                                    <h3>{streaming.name}</h3>
                                </div>
                                <div>
                                    <Tooltip title="Edit">
                                        <Link to={"/streaming/form"} state={{streaming: streaming}}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="primary" onClick={() => openDeleteDialog(streaming)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </RowContainer>
                        </Card>
                    ) }
                    { services.length > 0 &&
                    <Fab onClick={() => fetchServices()} disabled={noMoreLoad} variant="extended" color="secondary" style={{marginTop: 20}} >
                        {noMoreLoad ? "That is all" : "Load More"}
                    </Fab>}
                </>
                }
            </CardsContainer>
            <AlertDialog 
                title="Delete Streaming Service?"
                text="This action is irreversible"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleConfirm={() => handleDelete()}
            />
        </Container>
    )
}

export default StreamingPage;