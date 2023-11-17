import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const CityAutocomplete = () => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            if (inputValue.length >= 3) {
                try {
                    const response = await axios.get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?country=BR&access_token=SEU_TOKEN_DO_MAPBOX`
                    );

                    const cityOptions = response.data.features.map((feature) => ({
                        label: feature.text,
                    }));

                    setOptions(cityOptions);
                } catch (error) {
                    console.error('Erro ao buscar cidades:', error);
                }
            } else {
                setOptions([]);
            }
        };

        fetchCities();
    }, [inputValue]);

    return (
        <Autocomplete
            id="city-autocomplete"
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Digite uma cidade no Brasil"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setInputValue(e.target.value)}
                />
            )}
        />
    );
};

export default CityAutocomplete;
