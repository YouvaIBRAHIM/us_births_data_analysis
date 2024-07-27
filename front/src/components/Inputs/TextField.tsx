import { TextField, TextFieldProps } from "@mui/material"

const CustomTextField = (props: TextFieldProps) => {
  return <TextField fullWidth margin="normal" {...props} />
}

export default CustomTextField
