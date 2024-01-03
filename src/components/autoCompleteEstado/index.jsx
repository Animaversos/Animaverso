import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import api from "../../service/api";
import { useQuery } from "@tanstack/react-query";
import { any } from "prop-types";

const AutocompleteEstado = ({ register, setValue }) => {
  const [options, setOptions] = useState([]);
  const handleInputChange = async () => {
    const { data } = await api.get(
      `http://localhost:3000/api/enderecos/estados`
    );
    setOptions(data);
    return data;
  };

  useQuery({
    queryKey: ["getEstados"],
    queryFn: handleInputChange,
  });

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      noOptionsText={"Nenhum estado encontrado"}
      getOptionSelected={(option, value) => option.id === value.id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, value) => {
        console.log(value);

        setValue(register.name, value.id); // Atualiza o valor no react-hook-form
      }}
      renderInput={(params) => (
        <TextField {...params} label="Estado" variant="outlined" size="small" />
      )}
      inputRef={register}
    />
  );
};

AutocompleteEstado.propTypes = {
  register: any,
  setValue: any,
};

export default AutocompleteEstado;
