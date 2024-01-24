import React from "react";
import Container from "@mui/material/Container";
import AcceptedCartsUser from "./AcceptedCartsUser";
import UnacceptedCartsUser from "./UnacceptedCartsUser";

export default function CartsManagementUser() {

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <UnacceptedCartsUser />
            <AcceptedCartsUser />
        </Container>
    );
}
