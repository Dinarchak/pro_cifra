type Course = {
    id: number,
    major: string,
    minscore: number,
    description: string,
    university: string,
    requirement: string,
    coursecode: string
};

export type AddCourse =  {
    major: string,
    description: string,
    university: string,
    minscore: number,
    requirement: string,
    coursecode: string
};

export default Course;