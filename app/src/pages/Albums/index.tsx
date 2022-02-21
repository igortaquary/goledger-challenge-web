import { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Fab, IconButton, TextField, Tooltip } from "@mui/material"
import { Card, CardsContainer, RowContainer, SearchContainer } from "./styles";
import { Album, deleteAsset, searchAssetByName } from "../../service/api";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import AlertDialog from "../../components/AlertDialog";

const AlbumsPage = () => {

    const [albums, setAlbums] = useState<Album[]>([]);
    const [noMoreLoad, setNoMoreLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteAlbum, setDeleteAlbum] = useState<any>();

    useEffect(() => {
        if(page === 1 && !noMoreLoad && albums.length === 0){
            fetchAlbums()
        }
    }, [page, noMoreLoad, albums]);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const res = await searchAssetByName("album", searchTerm, page);
            const result = res.data?.result;
            if(result){
                setAlbums(prev => [...prev, ...result]);
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
        setAlbums([]);
    }

    const openDeleteDialog = (asset: Album) => {
        console.log(asset);
        setDeleteAlbum(asset);
        setOpenDialog(true);
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            console.log(deleteAlbum);
            setOpenDialog(false);
            if(deleteAlbum) await deleteAsset("album", deleteAlbum);
            setDeleteAlbum(null);
        } catch (error) {
            console.log(error);
        }
        handleSearch();
    }

    return (
        <Container>
            <RowContainer>
                <h2>
                    Albums
                </h2>
                <Link to="/album/form">
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
                        <TextField label="Search Album" variant="outlined" size="small" 
                        onChange={(e) => setSearchTerm(e.target.value)} defaultValue={searchTerm} />
                        <Fab onClick={() => handleSearch()} color="primary" variant="circular" size="small" style={{marginLeft: 10}} >
                            <SearchIcon />
                        </Fab>
                    </SearchContainer>
                    { albums.length > 0 && albums.map( (album: Album, i) => 
                        <Card key={i}>
                            <RowContainer>
                                <div>
                                    <h3>{album.name}</h3>
                                    <p>{album.genre}</p>
                                    <p>{album.explicit && "Explicit"}</p>
                                </div>
                                <div>
                                    <Tooltip title="Edit">
                                        <Link to={"/album/form"} state={{album: album}}>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="primary" onClick={() => openDeleteDialog(album)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </RowContainer>
                        </Card>
                    ) }
                    { albums.length > 0 &&
                    <Fab onClick={() => fetchAlbums()} disabled={noMoreLoad} variant="extended" color="secondary" style={{marginTop: 20}} >
                        {noMoreLoad ? "That is all" : "Load More"}
                    </Fab>}
                </>
                }
            </CardsContainer>
            <AlertDialog 
                title="Delete Album?"
                text="This action is irreversible"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleConfirm={() => handleDelete()}
            />
        </Container>
    )
}

export default AlbumsPage;