import HttpErrorHandling from './HttpErrorHandling';
import { API_URL } from '@env';
import { cookieHelper } from '../helpers/CookieHelper';

async function uploadImages({ images }: { images: File[] }) {
    const access_token = cookieHelper.getCookie('access_token');
    try {
        let formData = new FormData();
        images.forEach((image) => {
            formData.append(`images`, image, 'example.png');
        });
        const response = await fetch(`${API_URL}/images`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${access_token}`,
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
