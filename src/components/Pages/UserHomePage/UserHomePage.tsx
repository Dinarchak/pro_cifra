import {useLoaderData} from "react-router"
import userShownFieldNames from "./constants";
import UserShownInfo from './types'
import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";


export default function UserHomePage() {
    const data = useLoaderData()
    const userShowFieldValues: UserShownInfo = {
      email: data.email,
      major: 'ПМ-ПУ', // тут надо будет взять поле из объекта Major
      university_name: 'СПбГУ', // тут надо будет влять поле из объекта University и ссылочку сделать
    }

    return (
        <>
          <ObjectLabel avatar={data.avatar} label={data.full_name}/>
          <div>
            <ObjectFields dataNames={userShownFieldNames} dataValues={userShowFieldValues}/>
          </div>
        </>
    );
}