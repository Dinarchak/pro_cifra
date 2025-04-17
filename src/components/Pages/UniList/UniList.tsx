import { useState, useCallback, useMemo, useEffect } from "react";
import uniService from "../../../services/uniService";
import University from "../../../models/university";
import CardList from "../../Widgets/CardList/CardList";
import UniCard from "../../Dummies/UniCard/UniCard";
import FilterInput from "../../Widgets/Filter/FilterInput";
import usePooling from "../../../hooks/usePooling";
import { Pagination } from "react-bootstrap";
import { useLocation } from "react-router";

export default function UniList() {

  const cards_per_page = 4;

  const [uniList, setUniList] = useState<Array<University>>([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [pages, setPages] = useState<Array<number>>([]);

  const fetchData = useCallback(async () => {
    const uniList_ = await uniService.getAllUniversities();
    setUniList(uniList_);
  }, []);

  usePooling(60000, fetchData);

  useEffect(() => {
    setPage(0);
  }, [filter])

  const filteredList = useMemo(() => {
    const res = uniList.filter(uni => uni.university.toLowerCase().includes(filter.toLowerCase()))
    setMaxPage(Math.ceil(res.length / cards_per_page) - 1);

    const arr = [];
    let i = Math.max(0, page - 1);

    while (arr.length < 3 && i <= Math.ceil(res.length / cards_per_page) - 1) {
      arr.push(i);
      i++;
    }

    setPages(arr);

    return res.slice(cards_per_page * page, cards_per_page * page + cards_per_page);
  }, [filter, uniList, page]);


    return <>
        <FilterInput filter={filter} onFilterChange={setFilter}/>
        <CardList<University, any> list={filteredList} Card={UniCard}/>
        <div style={{display:"flex", justifyContent: "center"}}>
        <Pagination size="lg">
          {page > 1 && <Pagination.First onClick={() => setPage(0)}/>}
          {pages.map((i) => 
            <Pagination.Item
            key={i}
            active={i === page}
            onClick={() => setPage(i)}>{i + 1}</Pagination.Item>)}
          {page < maxPage - 1 && <Pagination.Last onClick={() => setPage(maxPage)}/>}
        </Pagination>
        </div>
      </>;
}

