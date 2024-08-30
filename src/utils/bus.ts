import {generateUniqueString} from "@/utils/index.js"

export const getBusUniqueKey = () => {
    return generateUniqueString(16);
}