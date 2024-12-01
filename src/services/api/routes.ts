/* -------------------------------------------------------------------------- */
/*                                EDITORIAL USE                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------- QUESTIONS ------------------------------- */
export const GET_TOPICS_URL = (id: number) => `open/subjects/${id}/topics`;
export const UPLOAD_IMAGE_MEDIA_URL = () => `open/media/image/upload`;
export const GET_TEXTBOOK_PROGRESS_URL = (
  textbook_id: number,
  lesson_id: number
) => `library/textbooks/progress/${textbook_id}/${lesson_id}`;

export const UPDATE_TEXTBOOK_PROGRESS_URL = () => `library/textbooks/progress`;

export const GET_EXAM_SET_URL = (set_id: number) => `exam-set/${set_id}`;