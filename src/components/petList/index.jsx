import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PetCard from "../petCard/index.jsx";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";

const mockPetData = [
    {
        id: 1,
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legalassssssss  ssssssssssssssssssssssssssssssssssssdads',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        id: 2,
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        id: 3,
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        id: 4,
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        id: 5,
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
];

const PetList = () => {
    const [petsToShow, setPetsToShow] = useState(4); // Quantidade inicial de pets a serem exibidos

    const handleLoadMore = () => {
        setPetsToShow(petsToShow + 3);
    };

    const renderedPetCards = mockPetData.slice(0, petsToShow).map((pet, index) => (
        <Grid item key={index} xs>
            <PetCard petData={pet} />
        </Grid>
    ));

    return (
        <Container  maxWidth="xl">
            <Typography variant="h5" sx={{mb: 2}} fontWeight={500}>Aumiguinhos e miauguinhos disponíveis</Typography>
            <Grid container spacing={1} >
                {renderedPetCards}
            </Grid>
            {petsToShow < mockPetData.length && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleLoadMore}>
                        Carregar Mais
                    </Button>
                </div>
            )}
        </Container>

    );
};

export default PetList;
