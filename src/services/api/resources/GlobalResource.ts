import { Api } from "..";
import { GET_TEXTBOOK_PROGRESS_URL, UPDATE_TEXTBOOK_PROGRESS_URL, UPLOAD_IMAGE_MEDIA_URL } from "../routes";

export default {
    uploadImageMedia : async (imagePayload : FormData) => {
        return await Api.put(UPLOAD_IMAGE_MEDIA_URL(), imagePayload);
    },
    getOrCreateLessonProgress: async (textbook_id: number, lesson_id: number) => {
        return await Api.get(GET_TEXTBOOK_PROGRESS_URL(textbook_id,lesson_id))
    },

    updateLessonProgress: async (payload: any) => {
        return await Api.post(UPDATE_TEXTBOOK_PROGRESS_URL(),payload)
    }
};