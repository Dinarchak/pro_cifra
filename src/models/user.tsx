import Major from "./major"
import University from "./university";

export default interface User {
    id: number;
    login: string;
    email: string;
    type: string;
    // avatar: ImageDTO;
    major: Major;
    university: University;
};