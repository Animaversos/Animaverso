import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import api from "../../service/api";
import { useQuery } from "@tanstack/react-query";
import { any } from "prop-types";

const AutocompleteEstado = ({ register, setValue, defaultValue }) => {
  const [options, setOptions] = useState([]);
  const handleInputChange = async () => {
    const { data } = await api.get(
      `https://api.animaverso.com.br/api/enderecos/estados`
    );
    setOptions(data);
    return data;
  };

  const { isLoading } = useQuery({
    queryKey: ["getEstados"],
    queryFn: handleInputChange,
  });

  return (
    <Autocomplete
      id="autocomplete-estado"
      defaultValue={defaultValue}
      options={options || []}
      loading={isLoading}
      getOptionLabel={(option) => option.label}
      noOptionsText={"Nenhum estado encontrado"}
      getOptionSelected={(option, value) => option.id === value.id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, value) => {
        setValue(register.name, value ? { id: value.id, uf: value.uf } : null);
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
  defaultValue: any,
};

export default AutocompleteEstado;
