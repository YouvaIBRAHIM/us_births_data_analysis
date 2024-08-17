import { Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import { Plus, Trash } from '@phosphor-icons/react';
import CustomTextField from '@src/components/Inputs/TextField';
import { Fragment, useState } from 'react';

interface IInputList{
    label: string;
    values: string[],
    onAddValue: (value: string) => void
    onRemoveValue: (index: number) => void
}
export default function InputList({values, onAddValue, onRemoveValue, label}: IInputList) {
    const [ inputValue, setInputValue ] = useState<string>('')

    const onHandleAddValue = () => {
        const value = inputValue.trim()
        if (value !== "") {
            onAddValue(value)
        }

        setInputValue("")
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField
                    label={label}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={onHandleAddValue}
                                    edge="end"
                                >
                                    {<Plus size={24}/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <List>
                    {
                        values.map((val, i) => (
                            <Fragment key={i}>
                                <ListItem
                                    
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => onRemoveValue(i)}>
                                            <Trash />
                                        </IconButton>
                                    }
                                    >
                                    <ListItemText
                                        primary={val}
                                    />
                                </ListItem>
                                <Divider />
                            </Fragment>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    );
    }
