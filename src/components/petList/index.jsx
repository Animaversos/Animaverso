import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PetCard from "../petCard/index.jsx";

const mockPetData = [
    {
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },{
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    {
        name: 'Bolinha',
        summary: 'Bolinha é um cachorro muito legal',
        sex: 'M',
        size: 'M',
        weight: '10kg',
        image: 'https://i.pinimg.com/564x/2f/36/86/2f36863ace484e30b40aa9e58b562897.jpg'
    },
    // Array com os dados dos pets (substitua isso pelos seus próprios dados)
];

const PetList = () => {
    const [petsToShow, setPetsToShow] = useState(3); // Quantidade inicial de pets a serem exibidos

    const handleLoadMore = () => {
        setPetsToShow(petsToShow + 3); // Carregar mais 3 pets
    };

    const renderedPetCards = mockPetData.slice(0, petsToShow).map((pet, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={3}>
            <PetCard petData={pet} />
        </Grid>
    ));

    return (
        <div>
            <Grid container spacing={2}>
                {renderedPetCards}
            </Grid>
            {petsToShow < mockPetData.length && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={handleLoadMore}>
                        Carregar Mais
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PetList;
