type Course = {
    id: number;
    major: string;
    description: string;
    iduniversity: number;
    requirement: string;
};

export type AddCourse =  {
    major: string;
    description: string;
    university: string;
    requirement: string;
}

export default Course;