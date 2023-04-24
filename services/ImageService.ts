import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';

async function uploadImages({ images }: { images: File[] }) {
    try {
        let formData = new FormData();
        images.forEach((image) => {
            formData.append(`images`, image, 'example.png');
        });

        const response = await fetch(`${API_URL}/images`, {
            method: 'POST',
            headers: {
                Authorization:
                    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNUJkV2xPM2x6cXh5RXA4ZyIsImV4cCI6MTY4MjM3NzQ4MX0.6APlMn2F8e5iNR_DYUitJ4ajl8QR1LS0p5fAbWGcUW0',
            },
            body: formData,
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const imageService = {
    uploadImages,
};

export default imageService;
