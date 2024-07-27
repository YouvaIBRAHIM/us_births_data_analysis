import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material"
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

const PasswordTextField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return <TextField
    fullWidth 
    margin="normal" {...props}
    type={showPassword ? 'text' : 'password'}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </IconButton>
        </InputAdornment>
      )
    }}
  />
}

export default PasswordTextField
