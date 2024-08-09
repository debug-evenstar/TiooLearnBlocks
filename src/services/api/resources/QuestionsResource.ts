import { Api } from "..";
import { GET_TOPICS_URL} from "../routes";

export default {
    getTopics : async (subjectId : number) => {
        return await Api.get(GET_TOPICS_URL(subjectId));
    }
};