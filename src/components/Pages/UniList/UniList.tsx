import { useState, useEffect } from "react";
import uniSerivce from "../../../services/uniService";
import University from "../../../models/university";


export default function UniList() {

    const [uniList, setUniList] = useState<Array<University>>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
              const uniList_ = await uniSerivce.getAllUniversities();
              setUniList(uniList);
            } catch (error) {
              console.error("Ошибка при загрузке");
            }
          };
        
          loadData();
    });

    return <></>;
}