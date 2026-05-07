import axios from "axios";

const CLOUD_NAME = "dlqmtrv9j";
const UPLOAD_PRESET = "sereniva_uploads";

export const uploadImageToCloudinary = async (file, folder = "sereniva", publicId = null) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folder);
    if (publicId) {
        formData.append("public_id", publicId);
    }

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
        );

        return {
            url: response.data.secure_url,
            public_id: response.data.public_id
        };

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};