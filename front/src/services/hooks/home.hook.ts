import { useFormStore } from '@src/components/StatisticsView/form/Form.store';
import { useDescribeImage } from '@src/services/hooks/describeComponent.hook';
import { useEffect, useState } from 'react';

export default function useHomeHook() {
    const { result, form } = useFormStore()
    const { 
        ref, 
        convertToImageAndDescribe, 
        messages, 
        isSendingImage,
        hasFinishedStream,
        stopStream 
    } = useDescribeImage()
    const [showDescriptionCard, setShowDescriptionCard] = useState(false)

    useEffect(() => {
        if (form.generateReport && result) {            
            convertToImageAndDescribe()
            setShowDescriptionCard(true)
        }
    }, [result, form.generateReport])

    const stopCurrentStreamAndClose = () => {
        if (!hasFinishedStream) {
            stopStream()
        }
        setShowDescriptionCard(false)
    }

    const stopCurrentStream = () => {
        if (!hasFinishedStream) {
            stopStream()
        }
    }

    return {
        ref,
        messages, 
        isSendingImage,
        showDescriptionCard,
        hasFinishedStream,
        stopCurrentStreamAndClose,
        stopCurrentStream,
        convertToImageAndDescribe
    }
}
