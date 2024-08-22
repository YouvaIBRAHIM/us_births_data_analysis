import { Button, Grid, Stack, Divider, IconButton, Typography } from '@mui/material';
import { ICondition, IConditionBuilder, IOption } from './Conditions.types';
import { Trash } from '@phosphor-icons/react';
import CustomSelect from '../Inputs/Select';
import CustomTextField from '../Inputs/TextField';

const conditionOptions: IOption[] = [
    { value: '=', label: 'Égal (=)' },
    { value: '>', label: 'Supérieur (>)' },
    { value: '>=', label: 'Supérieur ou égal (>=)' },
    { value: '<', label: 'Inférieur(<)' },
    { value: '<=', label: 'Inférieur ou égal (<=)' },
    { value: 'LIKE', label: 'Like' },
    { value: 'IN', label: 'Dans (IN)' },
    { value: 'REGEX', label: 'Expression régulière (REGEX)' },
];

const ConditionBuilder = ({fieldOptions, conditions, onSetConditions}: IConditionBuilder) => {

    const handleAddCondition = () => {
        onSetConditions([...conditions, { field: fieldOptions[0].value, condition: conditionOptions[0].value, value: '' }]);
    };

    const handleConditionChange = (index: number, key: keyof ICondition, value: string) => {
        const newConditions = conditions.map((condition, i) =>
        i === index ? { ...condition, [key]: value } : condition
        );
        onSetConditions(newConditions);
    };

    const handleConditionDelete = (index: number) => {
        const newConditions = conditions.filter((_, i) => i !== index);
        onSetConditions(newConditions);
    };

    return (
        <Stack
            gap={2}
            flexDirection="column"
        >
            <Divider>Conditions</Divider>
            <Stack
                gap={1}
                flexDirection="column"
            >
                {
                    conditions.length === 0 &&
                    <Typography variant="body2" gutterBottom>Aucune condition</Typography>
                }
                {conditions.map((condition, index) => (
                    <Grid container spacing={1} key={index} alignItems="center">
                        <Grid item xs={4}>
                            <CustomSelect
                                id='field'
                                label='Champ'
                                value={condition.field}
                                onChange={(value) => handleConditionChange(index, 'field', value as string)}
                                options={fieldOptions}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <CustomSelect
                                id='condition'
                                label='Condition'
                                value={condition.condition}
                                onChange={(value) => handleConditionChange(index, 'condition', value as string)}
                                options={conditionOptions}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                                size="small"
                                fullWidth
                                value={condition.value}
                                onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                                placeholder="Valeur"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton sx={{padding: 0}} edge="end" aria-label="delete" onClick={() => handleConditionDelete(index)}>
                                <Trash />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Stack>
            <Button variant="contained" onClick={handleAddCondition}>
                Ajouter une Condition
            </Button>
        </Stack>
    );
};

export default ConditionBuilder;
