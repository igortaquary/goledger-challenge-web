import { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Fab, Grid, IconButton, TextField, Tooltip } from "@mui/material"
import { ArtistCard, CardsContainer, RowContainer, SearchContainer } from "./styles";
import { Artist, deleteAsset, searchAssetByName } from "../../service/api";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";

const ArtistsPage = () => {

    const [artists, setArtists] = useState<Artist[]>([]);
    const [noMoreLoad, setNoMoreLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteArtist, setDeleteArtist] = useState<any>();

    useEffect(() => {
        if(page === 1 && !noMoreLoad && artists.length === 0){
            fetchArtists()
        }
    }, [page, noMoreLoad, artists]);

    const fetchArtists = async () => {
        setLoading(true);
        try {
            const res = await searchAssetByName("artist", searchTerm, page);
            const result = res.data?.result;
            if(result){
                setArtists(prev => [...prev, ...result]);
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
        setArtists([]);
    }

    const openDeleteDialog = (asset: Artist) => {
        console.log(asset);
        setDeleteArtist(asset);
        setOpenDialog(true);
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            console.log(deleteArtist);
            setOpenDialog(false);
            if(deleteArtist) await deleteAsset("artist", deleteArtist);
            setDeleteArtist(null);
        } catch (error) {
            console.log(error);
        }
        handleSearch();
    }

    return (
        <Container>
            <RowContainer>
                <h2>
                    Artists
                </h2>
                <Link to="/artist/form">
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
                        <TextField label="Search Artist" variant="outlined" size="small" 
                        onChange={(e) => setSearchTerm(e.target.value)} defaultValue={searchTerm} />
                        <Fab onClick={() => handleSearch()} color="primary" variant="circular" size="small" style={{marginLeft: 10}} >
                            <SearchIcon />
                        </Fab>
                    </SearchContainer>
                    { artists.length > 0 && artists.map( (artist: Artist, i) => 
                        <ArtistCard key={i}>
                            <RowContainer>
                                <div>
                                    <h3>{artist.name}</h3>
                                    <p>{artist.description}</p>
                                    <p>{artist.location}</p>
                                </div>
                                <div>
                                    <Tooltip title="Edit">
                                        <Link to={"/artist/form"} state={{artist: artist}}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="primary" onClick={() => openDeleteDialog(artist)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </RowContainer>
                        </ArtistCard>
                    ) }
                    { artists.length > 0 &&
                    <Fab onClick={() => fetchArtists()} disabled={noMoreLoad} variant="extended" color="secondary" style={{marginTop: 20}} >
                        {noMoreLoad ? "That is all" : "Load More"}
                    </Fab>}
                </>
                }
            </CardsContainer>
            <AlertDialog 
                title="Delete Artist?"
                text="This action is irreversible"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleConfirm={() => handleDelete()}
            />
        </Container>
    )
}

export default ArtistsPage;