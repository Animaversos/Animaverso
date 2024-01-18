import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import api from "../../service/api";
import { useQuery } from "@tanstack/react-query";
import { any, object } from "prop-types";
import { useEffect, useState } from "react";

const AutocompleteCidade = ({
  register,
  setValue,
  estado,
  defaultValue,
  defaultValueEstado,
}) => {
  const [cidade, setCidade] = useState({ id: 0, label: "" });
  const { data: cidades, isLoading } = useQuery({
    queryKey: ["getCidades", estado],
    queryFn: async () => {
      if (estado) {
        const { data } = await api.get(
          `https://api.animaverso.com.br/api/enderecos/cidades/${estado.uf}`
        );
        if (defaultValue && defaultValueEstado?.id === estado?.id) {
          setCidade(defaultValue);
          setValue("cidade", defaultValue);
        }
        return data.map((cidade) => {
          return { id: cidade.id, label: cidade.nome };
        });
      }
      return [];
    },
  });

  useEffect(() => {
    if (!cidades) return;

    const cidadeValidaParaEstado = cidade
      ? cidades.some((c) => c.id === cidade.id)
      : false;

    if (!cidadeValidaParaEstado) {
      setValue("cidade", null);
    }
  }, [cidade, cidades, estado, setValue]);

  useEffect(() => {
    setCidade(null);
  }, [estado, setCidade]);

  return (
    <Autocomplete
      options={cidades || []}
      value={cidade}
      defaultValue={defaultValue}
      loading={isLoading}
      getOptionLabel={(option) => option.label}
      noOptionsText={"Nenhuma cidade encontrado"}
      getOptionSelected={(option, value) => option.id === value.id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, value) => {
        setCidade(value);
        setValue("cidade", value ? value : null);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Cidade" variant="outlined" size="small" />
      )}
      inputRef={register}
    />
  );
};

AutocompleteCidade.propTypes = {
  register: any,
  setValue: any,
  estado: object,
  defaultValue: any,
  defaultValueEstado: any,
};

export default AutocompleteCidade;
