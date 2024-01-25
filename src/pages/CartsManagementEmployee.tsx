import React from "react";
import Container from "@mui/material/Container";
import AcceptedCartsEmployee from "./AcceptedCartsEmployee";
import UnacceptedCartsEmployee from "./UnacceptedCartsEmployee";

export default function CartsManagementEmployee() {

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <UnacceptedCartsEmployee />
            <AcceptedCartsEmployee />
        </Container>
    );
}
