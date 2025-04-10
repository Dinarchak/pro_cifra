import { useState, useEffect } from "react";
import uniService from "../../../services/uniService";
import University from "../../../models/university";
import CardList from "../../Widgets/CardList/CardList";
import UniCard from "../../Dummies/UniCard/UniCard";


export default function UniList() {

  const [uniList, setUniList] = useState<Array<University>>([]);
  useEffect(() => {
      const loadData = async () => {
          try {
            const uniList_ = await uniService.getAllUniversities();
            setUniList(uniList_);
          } catch (error) {
            console.error("Ошибка при загрузке");
          }
        };      
        loadData();
  });

    return <><CardList<University> list={uniList} Card={UniCard}/></>;
}

