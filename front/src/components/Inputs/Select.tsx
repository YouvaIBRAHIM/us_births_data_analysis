import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface CustomSelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    disabledOption?: string;
}

const CustomSelect = ({ id, label, value, onChange, options, disabledOption }: CustomSelectProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl 
            size="small"
            sx={{
                flexBasis: {
                    xs: "100%",
                    sm: "20%",
                },
                width: {
                    xs: "100%",
                },
                flexGrow: 1
            }}
        >
            <InputLabel id={id}>{label}</InputLabel>
            <Select
            fullWidth
            labelId={id}
            id={id}
            label={label}
            value={value}
            onChange={handleChange}
            >
            {
                options.filter(opt => opt.value !== disabledOption).map((opt, i) => (
                <MenuItem key={i} value={opt.value}>{opt.label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
        );
};

export default CustomSelect;