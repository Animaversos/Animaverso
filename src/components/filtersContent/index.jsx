import Box from "@mui/material/Box";
import {Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import CustomCheckboxGenero from "../checkBoxGenero/index.jsx";
import MaleIcon from "@mui/icons-material/Male.js";
import FemaleIcon from "@mui/icons-material/Female";


export default function FiltersContent() {
    return (
        <>
            <Box sx={{flexGrow: 1, flex: 1}}>
                <Box sx={{display: 'flex', flexDirection: 'column', paddingX: 2, paddingBottom: 2}}>
                    <Typography sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        color: '#0E223B',
                        marginBottom: 1
                    }}>Localização</Typography>
                    <TextField size={"small"} variant={"outlined"} sx={{width: '234px'}} label={"Cidade"}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', paddingX: 2, paddingBottom: 1}}>
                    <Typography sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        color: '#0E223B'
                    }}>Porte</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size={"small"}/>} label="Pequeno"/>
                        <FormControlLabel control={<Checkbox size={"small"}/>} label="Medio"/>
                        <FormControlLabel control={<Checkbox size={"small"}/>} label="Grande"/>
                    </FormGroup>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', paddingX: 2, paddingBottom: 1}}>
                    <Typography sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        color: '#0E223B'
                    }}>Espécie</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox size={"small"}/>} label="Cachorro"/>
                        <FormControlLabel control={<Checkbox size={"small"}/>} label="Gato"/>
                        <FormControlLabel control={<Checkbox size={"small"}/>} label="Outros"/>
                    </FormGroup>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', paddingX: 2, paddingBottom: 2}}>
                    <Typography sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        color: '#0E223B',
                        marginBottom: 1
                    }}>Genero</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                            <CustomCheckboxGenero label={"Masculino"} icon={<MaleIcon sx={{fontSize: '40px', color: '#68F'}} color="primary"/>}/>
                            <CustomCheckboxGenero isFemea={true} label={"Feminino"} icon={<FemaleIcon sx={{fontSize: '40px', color: '#FF4DB8'}}  color="primary"/>}/>
                    </Box>
                </Box>
                <Box  sx={{paddingX: 2, paddingBottom: 2, mt:1}}>
                    <Button variant={"contained"} size="small" fullWidth>Buscar</Button>
                </Box>

            </Box>

            <Box>
                <Divider/>
                <Box sx={{display: 'flex', placeItens: 'center', padding: 2, gap: 1, backgroundColor: 'white'}}>
                    <Button  variant={"contained"} fullWidth size="small" color="error">Limpar</Button>
                </Box>
            </Box>
        </>
    )
}