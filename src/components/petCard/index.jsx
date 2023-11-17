import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {CardMedia} from "@mui/material";

const PetCard = ({petData}) => {
    const {id, name, summary, sex, size, weight, image} = petData;

    return (
        <Card variant={"outlined"} sx={{height: '530px', width: '334px', borderRadius: 3, boxShadow: 3}}>
            <CardMedia
                component="img"
                alt={name}
                height="334"
                image={image}
            />
            <CardContent sx={{mb: 2}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" component="div">
                        {name}
                    </Typography>
                    {
                        sex === 'Male' ? <MaleIcon fontSize="medium" color="primary"/> :
                            <FemaleIcon fontSize="medium" color="primary"/>
                    }
                </Box>

                <Typography variant="body2" color="text.secondary"  sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    {summary}
                </Typography>
                <div style={{display: 'flex',  marginTop: '8px'}}>
                    <Typography variant="body2" color="text.secondary">
                       Criciuma, Santa luzia
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" color="primary">
                    <Link to={`/pet/${id}`} target="_blank" style={{textDecoration: 'none', color: 'white'}}>
                        Quero adotar
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
};

export default PetCard;
