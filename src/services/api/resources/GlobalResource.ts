import { Api } from "..";
import { UPLOAD_IMAGE_MEDIA_URL } from "../routes";

export default {
    uploadImageMedia : async (imagePayload : FormData) => {
        return await Api.put(UPLOAD_IMAGE_MEDIA_URL(), imagePayload);
    }
};