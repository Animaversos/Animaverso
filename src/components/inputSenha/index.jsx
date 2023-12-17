import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

import PropTypes from "prop-types";

const InputSenha = ({ register, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...register}
      type={showPassword ? "text" : "password"}
      label={label ?? "Senha"}
      size="small"
      autoComplete="false"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

InputSenha.propTypes = {
  register: PropTypes.any,
  label: PropTypes.string,
};

export default InputSenha;
