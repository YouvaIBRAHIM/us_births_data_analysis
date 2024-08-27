import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { useWebSocket } from '@services/hooks/websocket.hook';
import { useSnackBarStore } from '@src/stores/snackbar.store';
import { generageDecriptionFromImage } from '@services/apis/describeImage.api';
import { useMutation } from '@tanstack/react-query';

const IMAGE_DESC_WEBSOCKET_URL = import.meta.env.VITE_IMAGE_DESC_WEBSOCKET_URL

interface UseDescribeImage{
    ref: React.RefObject<HTMLDivElement>;
    convertToImageAndDescribe: () => Promise<void>;
    isSendingImage: boolean,
    messages: string[]
};

export const useDescribeImage = (): UseDescribeImage => {
    const ref = useRef<HTMLDivElement>(null);
    const { messages, onSetMessage } = useWebSocket(IMAGE_DESC_WEBSOCKET_URL);
    const { showSnackBar } = useSnackBarStore()

    const {mutate: sendImage, isPending: isSendingImage} = useMutation({
        mutationFn: (dataUrl: string) => generageDecriptionFromImage(dataUrl),
        onError: (error) => {
            showSnackBar(error.message, "error")
        },
    })

    const convertComponentToImage = async () => {
        if (ref.current === null) return;

        try {
            const dataUrl = await toPng(ref.current);

            return dataUrl
        } catch (err) {
            showSnackBar('Erreur lors de la conversion en image', "error");
            return null
        }
    };

    const convertToImageAndDescribe = async () => {
        const dataUrl = await convertComponentToImage();
        if (dataUrl) {
            await sendImage(dataUrl);
            onSetMessage([])
        }
    };

    return { ref, convertToImageAndDescribe, isSendingImage, messages };
};
