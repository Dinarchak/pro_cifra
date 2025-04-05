import userShownFieldNames from "./constants";

import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";
import Button from "../../UI/Button/Button";

import { useEffect , useState } from "react";
import userService from "../../../services/userService";
import { useAuth } from "../../../provider/authProvider";

import User from "../../../models/user";

export default function UserHomePage() {

    const [data, setData] = useState<User>({email: "", fullname: "", type: null});
    const token = useAuth();

    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await userService.getUser();
          setData(data);
        } catch (error) {
          console.error("Ошибка при загрузке:", error);
        }
      };
    
      loadData();
    }, []);

    return (
        <>
          <ObjectLabel avatar="" label={data.fullname}/>
          <div>
            <ObjectFields dataNames={userShownFieldNames} dataValues={data}/>
          </div>
          <Button callback={(e) => token.setToken(null)}>Выйти</Button>
        </>
    );
}