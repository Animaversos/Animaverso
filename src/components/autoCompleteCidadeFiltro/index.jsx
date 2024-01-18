import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../service/api";
import { useQuery } from "@tanstack/react-query";
import { func } from "prop-types";

const AutocompleteCidadeFiltro = ({ setValue }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timer, setTimer] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const fetchData = async (searchTerm) => {
    try {
      const { data } = await api.get(
        `https://api.animaverso.com.br/api/enderecos/cidades?nome=${searchTerm}`
      );
      setTimer(null);
      return data;
    } catch (error) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        setSearchTerm(inputText);
      }, 2000)
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => fetchData(searchTerm),
    enabled: !!searchTerm,
  });

  const handleSelect = (event, newValue) => {
    setSelectedValue(newValue);

    // Use a propriedade setValue para definir o valor fora do componente
    setValue(newValue);
  };

  const options = data || [];

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      loading={isLoading}
      value={selectedValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading || timer != null ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

AutocompleteCidadeFiltro.propTypes = {
  setValue: func,
};

export default AutocompleteCidadeFiltro;
