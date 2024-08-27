const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const generageDecriptionFromImage = async (dataUrl: string) => {
    const response = await fetch(`${BACKEND_BASE_URL}/v1/images/generate-description`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUrl }),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'image');
    }
};
