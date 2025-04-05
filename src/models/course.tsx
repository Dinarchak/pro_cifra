type Course = {
    id: number;
    major: string;
    description: string;
    iduniversity: number;
    requirement: string;
};

export type AddCourse =  {
    major: string;
    desription: string;
    university: string;
    requirement: string;
}

export default Course;