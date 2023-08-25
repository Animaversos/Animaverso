import Box from "@mui/material/Box";
import {Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField} from "@mui/material";
import * as React from "react";


export default function FiltersContent() {
    return(
        <>
            <Box  sx={{flexGrow: 1, overflowY: 'auto', flex: 1}}>
                <Box sx={{display: 'flex', flexDirection: 'column' ,padding: 2, gap: 2}}>
                    <div>Localização</div>
                    <TextField variant={"outlined"} label={"Cidade"} />
                </Box>
                <Divider />
                <Box sx={{display: 'flex', flexDirection: 'column' ,padding: 2, gap: 2}}>
                    <div>Porte</div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Pequeno" />
                        <FormControlLabel  control={<Checkbox />} label="Medio" />
                        <FormControlLabel  control={<Checkbox />} label="Grande" />
                    </FormGroup>
                </Box>
                <Divider />
                <Box sx={{display: 'flex', flexDirection: 'column' ,padding: 2, gap: 2}}>
                    <div>Especie</div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Cachorro" />
                        <FormControlLabel  control={<Checkbox />} label="Gato" />
                        <FormControlLabel  control={<Checkbox />} label="Outros" />
                    </FormGroup>
                </Box>
                <Divider />
                <Box sx={{display: 'flex', flexDirection: 'column' ,padding: 2, gap: 2}}>
                    <div>Genero</div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label="Macho" />
                        <FormControlLabel  control={<Checkbox />} label="Femea" />
                    </FormGroup>
                </Box>
                <Box sx={{display: 'grid', placeItens: 'center',padding: 2}}>
                    <Button variant={"contained"}>Pesquisar</Button>
                </Box>
            </Box>

            <Box>
                <Divider/>
                <Box sx={{display: 'grid', placeItens: 'center',padding: 2, backgroundColor: 'white'}}>
                    <Button variant={"contained"}>Limpar</Button>
                </Box>
            </Box>
        </>
    )
}