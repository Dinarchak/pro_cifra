const userShownFieldNames = {
    email: 'Почта',
    university: 'Университет',
    role: 'Статус',
};

type Roles = {
    mentor: string;
    creator: string;
    [key: string]: string;  // Добавление индексного типа
  }

const roles: Roles = {
    'mentor': 'Куратор',
    'creator': 'Главный куратор'
};

export default userShownFieldNames;
export { roles };