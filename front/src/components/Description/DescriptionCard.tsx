import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { ArrowCounterClockwise, Clipboard, ClipboardText, Stop, X } from '@phosphor-icons/react';
import { Skeleton, Stack } from '@mui/material';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState } from 'react';

interface IDescriptionCard{
    title: string,
    onClose: () => void,
    onRetry: () => void,
    onStop: () => void,
    messages: string[],
    isPending: boolean,
    hasFinishedStream: boolean,
}
const DescriptionCard = ({title, messages, onClose, onRetry, onStop, isPending, hasFinishedStream}: IDescriptionCard) => {
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const onCopy = () => {
        navigator.clipboard.writeText((messages && messages?.length) > 0 ? messages.join('') : '');
        setIsCopied(true)

        setTimeout(() => setIsCopied(false), 1500)
    }

    return (
        <Card
            sx={{
                backgroundColor: "primary.light"
            }}
        >
            <CardHeader
                action={
                    <Stack
                        gap={2}
                        flexDirection="row"
                    >
                        {
                            hasFinishedStream &&
                            <>
                                <IconButton aria-label="copy">
                                    {
                                        !isCopied 
                                        ?
                                        <Clipboard size={24} onClick={onCopy} />
                                        :
                                        <ClipboardText size={24} onClick={onCopy} />
                                    }
                                </IconButton>
                                <IconButton aria-label="retry">
                                    <ArrowCounterClockwise size={24} onClick={onRetry} />
                                </IconButton>
                            </>
                        }
                        {
                            (messages && messages?.length) > 0 && !hasFinishedStream &&
                            <IconButton aria-label="retry">
                                <Stop size={24} weight="fill" onClick={onStop} />
                            </IconButton>
                        }
                        
                        <IconButton aria-label="close">
                            <X size={24} onClick={onClose} />
                        </IconButton>
                    </Stack>
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
                        <MarkdownPreview source={messages.join('')} style={{ padding: 16, textAlign: 'left' }} />
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