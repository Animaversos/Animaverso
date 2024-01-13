import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male.js";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomCheckboxGenero from "../checkBoxGenero/index.jsx";
import { useState } from "react";
import AutocompleteCidadeFiltro from "../autoCompleteCidadeFiltro/index.jsx";
import PetsApi from "../../service/apis/pets";
import usePetStore from "../../hooks/usePetStore.js";

export default function FiltersContent() {
  const { setPets, setIsLoading } = usePetStore();
  const [checkedValuesPorte, setCheckedValuesPorte] = useState([]);
  const [checkedValuesGenero, setCheckedValuesGenero] = useState([]);
  const [checkedValuesEspecie, setCheckedValuesEspecie] = useState([]);
  const [cidade, setCidade] = useState(null);

  const findPets = async () => {
    try {
      setIsLoading(true);
      const queryString = generateQueryString();
      const { data } = await PetsApi.search(queryString);
      setPets(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChangePorte = (value) => {
    const currentIndex = checkedValuesPorte.indexOf(value);
    const newCheckedValues = [...checkedValuesPorte];
    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setCheckedValuesPorte(newCheckedValues);
  };

  const handleCheckboxChangEspecie = (value) => {
    const currentIndex = checkedValuesEspecie.indexOf(value);
    const newCheckedValues = [...checkedValuesEspecie];
    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setCheckedValuesEspecie(newCheckedValues);
  };

  const handleCheckboxChangGenero = (value) => {
    const currentIndex = checkedValuesGenero.indexOf(value);
    const newCheckedValues = [...checkedValuesGenero];
    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setCheckedValuesGenero(newCheckedValues);
  };

  const generateQueryString = () => {
    var queryString = "";

    if (checkedValuesPorte.length != 0) {
      queryString = `porte=${checkedValuesPorte.join(",")}&`;
    }

    if (checkedValuesEspecie.length != 0) {
      queryString = `${queryString}especie=${checkedValuesEspecie.join(",")}&`;
    }

    if (checkedValuesGenero.length != 0) {
      queryString = `${queryString}genero=${checkedValuesGenero.join(",")}&`;
    }

    if (cidade) {
      queryString = `${queryString}cidade=${cidade.id}&`;
    }
    return queryString;
  };

  const handleButtonClick = () => {
    findPets();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: 2,
            paddingBottom: 2,
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#0E223B",
              marginBottom: 1,
            }}
          >
            Localização
          </Typography>
          <AutocompleteCidadeFiltro setValue={setCidade} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: 2,
            paddingBottom: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#0E223B",
            }}
          >
            Porte
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={checkedValuesPorte.includes("PEQUENO")}
                  onClick={() => handleCheckboxChangePorte("PEQUENO")}
                />
              }
              label="Pequeno"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={checkedValuesPorte.includes("MEDIO")}
                  onChange={() => handleCheckboxChangePorte("MEDIO")}
                />
              }
              label="Medio"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={checkedValuesPorte.includes("GRANDE")}
                  onChange={() => handleCheckboxChangePorte("GRANDE")}
                />
              }
              label="Grande"
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: 2,
            paddingBottom: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#0E223B",
            }}
          >
            Espécie
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size={"small"}
                  checked={checkedValuesEspecie.includes("CACHORRO")}
                  onClick={() => handleCheckboxChangEspecie("CACHORRO")}
                />
              }
              label="Cachorro"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size={"small"}
                  checked={checkedValuesEspecie.includes("GATO")}
                  onClick={() => handleCheckboxChangEspecie("GATO")}
                />
              }
              label="Gato"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size={"small"}
                  checked={checkedValuesEspecie.includes("OUTROS")}
                  onClick={() => handleCheckboxChangEspecie("OUTROS")}
                />
              }
              label="Outros"
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingX: 2,
            paddingBottom: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#0E223B",
              marginBottom: 1,
            }}
          >
            Genero
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <CustomCheckboxGenero
              label={"Masculino"}
              checked={checkedValuesGenero.includes("MASCULINO")}
              onClick={() => handleCheckboxChangGenero("MASCULINO")}
              icon={
                <MaleIcon
                  sx={{ fontSize: "40px", color: "#68F" }}
                  color="primary"
                />
              }
            />
            <CustomCheckboxGenero
              isFemea={true}
              label={"Feminino"}
              checked={checkedValuesGenero.includes("FEMININO")}
              onClick={() => handleCheckboxChangGenero("FEMININO")}
              icon={
                <FemaleIcon
                  sx={{ fontSize: "40px", color: "#FF4DB8" }}
                  color="primary"
                />
              }
            />
          </Box>
        </Box>
        <Box sx={{ paddingX: 2, paddingBottom: 2, mt: 1 }}>
          <Button
            variant={"contained"}
            size="small"
            fullWidth
            onClick={() => {
              handleButtonClick();
            }}
          >
            Buscar
          </Button>
        </Box>
      </Box>

      <Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            placeItens: "center",
            padding: 2,
            gap: 1,
            backgroundColor: "white",
          }}
        >
          <Button
            variant={"contained"}
            fullWidth
            size="small"
            color="error"
            onClick={() => {
              setCheckedValuesPorte([]);
              setCheckedValuesEspecie([]);
              setCheckedValuesGenero([]);
            }}
          >
            Limpar
          </Button>
        </Box>
      </Box>
    </>
  );
}
