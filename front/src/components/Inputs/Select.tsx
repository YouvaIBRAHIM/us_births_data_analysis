import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface CustomSelectProps {
    id: string;
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    options: { value: string | null; label: string }[];
    disabledOption?: string;
    disabled?: boolean;
    error?: boolean
}

const CustomSelect = ({ id, label, value, onChange, options, disabledOption, disabled, error }: CustomSelectProps) => {
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
                flexGrow: 1,
                minWidth: 150
            }}
        >
            <InputLabel id={id}>{label}</InputLabel>
            <Select
            fullWidth
            labelId={id}
            id={id}
            label={label}
            value={value as string | undefined}
            onChange={handleChange}
            error={error}
            disabled={disabled}
            >
            {
                options.filter(opt => opt.value !== disabledOption).map((opt, i) => (
                <MenuItem key={i} value={opt.value as string | undefined}>{opt.label}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
        );
};

export default CustomSelect;