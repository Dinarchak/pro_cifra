import { useState, useEffect, useMemo } from "react";
import uniService from "../../../services/uniService";
import University from "../../../models/university";
import CardList from "../../Widgets/CardList/CardList";
import UniCard from "../../Dummies/UniCard/UniCard";
import FilterInput from "../../Widgets/Filter/FilterInput";


export default function UniList() {

  const [uniList, setUniList] = useState<Array<University>>([]);
  const [filter, setFilter] = useState("");

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

  const filteredList = useMemo(() => {
    const res = uniList.filter(uni => uni.university.toLowerCase().includes(filter.toLowerCase()))
    return res;
  }, [filter, uniList])


    return <>
        <FilterInput filter={filter} onFilterChange={setFilter}/>
        <CardList<University> list={filteredList} Card={UniCard}/>
      </>;
}

