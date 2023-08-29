import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";


export default function PetView() {
    let { idPet } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate(-1)}>Voltar</Button>
            Pet view - {idPet}
        </>
    );
}