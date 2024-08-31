import { useEffect, useRef, useState } from 'react';

interface UseWebSocketReturn {
    sendMessage: (message: string) => void;
    messages: string[];
    connectionStatus: string;
    onSetMessage: (messages: string[]) => void;
    hasFinishedStream: boolean,
    stopStream: () => void
}

export const useWebSocket = (url: string, reconnect: boolean = true): UseWebSocketReturn => {
    const [messages, setMessages] = useState<string[]>([]);
    const [hasFinishedStream, setHasFinishedStream] = useState<boolean>(true);

    const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');
    const ws = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<number | null>(null);

    const connectWebSocket = () => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            setConnectionStatus('Connected');
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
                reconnectTimeout.current = null;
            }
        };

        ws.current.onmessage = (event) => {
            if (hasFinishedStream) {
                setHasFinishedStream(false)
            }
            if (event.data === "END_OF_STREAM" && ws.current) {
                setHasFinishedStream(true)
            } else {
                setMessages((prev) => [...prev, event.data]);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setConnectionStatus('Error');
            setHasFinishedStream(true)
        };

        ws.current.onclose = () => {
            setConnectionStatus('Closed');
            setHasFinishedStream(true)
            if (reconnect && !reconnectTimeout.current) {
                reconnectTimeout.current = window.setTimeout(() => {
                    console.log('Reconnecting WebSocket...');
                    connectWebSocket();
                }, 5000);
            }
        };
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (ws.current && ws.current.readyState === 1) {
                ws.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [url]);

    const stopStream =() =>{
        if (ws.current && ws.current.readyState === 1) {
            ws.current.send("STOP_STREAM");
        }
    }
    
    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.error('WebSocket is not open. ReadyState:', ws.current?.readyState);
        }
    };

    const onSetMessage = (messages: string[]) => {
        setMessages(messages)
    };

    return { 
        sendMessage, 
        messages, 
        connectionStatus, 
        onSetMessage, 
        hasFinishedStream,
        stopStream
    };
};
