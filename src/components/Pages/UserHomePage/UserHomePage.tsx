import {useLoaderData} from "react-router"

export default function UserHomePage() {
    const data = useLoaderData();

    return (<h1>Страница пользователя c id {params.user_id}</h1>)
}