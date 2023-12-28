import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import api from "../../service/api";
import { debounce } from "lodash";

const AutocompleteEstado = () => {
  const [options, setOptions] = useState([]);

  const handleInputChange = debounce(async (event, value) => {
    try {
      const response = await api.get(
        `http://localhost:3000/api/enderecos/estados?nome=${value}`
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  }, 300); // Atraso de 300 milissegundos

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Digite o endereço"
          variant="outlined"
          size="small"
        />
      )}
    />
  );
};

export default AutocompleteEstado;
