import Major from "./major"
import University from "./university";

export default interface User {
    id: number;
    full_name: string;
    email: string;
    type: string;
    avatar?: string;
    major?: Major;
    university?: University;
    
};