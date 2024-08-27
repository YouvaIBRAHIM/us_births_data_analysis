import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { X } from '@phosphor-icons/react';
import { Skeleton, Stack } from '@mui/material';

interface IDescriptionCard{
    title: string,
    onClose: () => void,
    messages: string[],
    isPending: boolean
}
const DescriptionCard = ({title, messages, onClose, isPending}: IDescriptionCard) => {

    return (
        <Card>
            <CardHeader
                action={
                <IconButton aria-label="close">
                    <X size={24} onClick={onClose} />
                </IconButton>
                }
                title={title}
            />
            <CardContent
                sx={{
                    maxHeight: 300,
                    paddingBottom: 2,
                    overflow: 'auto'
                }}
            >
                {
                    !isPending && messages && messages.length > 0 ?
                    <Typography variant="body2" align='left'>
                        {...messages}
                    </Typography>
                    :
                    <Stack 
                        flexDirection="column"
                        gap={1}
                    >
                        <Skeleton animation="wave" height={32} width="50%" />
                        <Skeleton animation="wave" height={32} width="65%" />
                        <Skeleton animation="wave" height={32} width="80%" />
                        <Skeleton animation="wave" height={32} width="40%" />
                    </Stack>
                }
            </CardContent>
        </Card>
    );
}

export default DescriptionCard