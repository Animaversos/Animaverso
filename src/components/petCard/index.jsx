import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PetIcon from '@mui/icons-material/Pets';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import {Link} from "react-router-dom";

const PetCard = ({ petData }) => {
    const {id, name, summary, sex, size, weight, image } = petData;

    return (
        <Card style={{ width: '300px', margin: '10px' }}>
            <img src={image} alt={name} style={{ width: '100%', height: '250px' }} />
            <CardContent>
                <Typography variant="h6" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {summary}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    {sex === 'Male' ? <MaleIcon fontSize="small" color="primary" /> : <FemaleIcon fontSize="small" color="secondary" />}
                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: '4px' }}>
                        Size: {size}, Weight: {weight}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Link to={`/pet/${id}`}>
                    <Button fullWidth variant="contained" color="primary">
                        Ver mais
                    </Button>
                </Link>

            </CardActions>
        </Card>
    );
};

export default PetCard;
