type Course = {
    id: number;
    major: string;
    description: string;
    university: string;
    requirement: string;
};

export type AddCourse =  {
    major: string;
    description: string;
    university: string;
    requirement: string;
}

export default Course;