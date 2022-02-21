import React from "react";
import { Button } from "@mui/material";
import { HeaderContainer, Logo } from "./styles";
import { Link, useLocation } from "react-router-dom";

const Header = () => {

    const location = useLocation();

    return (
        <HeaderContainer>
            <Link to="/" >
                <Logo src="/logo.svg" />
            </Link>
            <nav>
                <Link to="/artist" >
                    <Button color={location?.pathname?.includes("artist") ? "primary" : "secondary"}>
                        Artists
                    </Button>
                </Link>
                <Link to="/album">
                    <Button color={location?.pathname?.includes("album") ? "primary" : "secondary"} >
                        Albums
                    </Button>
                </Link>
                <Link to="/streaming">
                    <Button color={location?.pathname?.includes("streaming") ? "primary" : "secondary"} >
                        Streaming
                    </Button>
                </Link>
            </nav>
        </HeaderContainer>
    )
}

export default Header;