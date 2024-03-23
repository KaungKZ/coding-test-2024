"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ItemCard from "./ItemCard";

export default function HomePage(props) {
  const [data, setData] = useState([]);
  const [seemoreClicked, setSeemoreClicked] = useState([]);

  useEffect(() => {
    const result = props.products.reduce((result, current) => {
      let k = current["category"];
      let entry = result.find((elem) => elem["category"] === k);

      if (entry) {
        let index = result.indexOf(entry);
        result[index].items.push(current);
      } else {
        let obj = {};
        obj["category"] = k;
        obj.items = [current];
        result.push(obj);
      }
      return result;
    }, []);

    setData(result);
  }, [props.products]);

  useEffect(() => {
    if (data.length > 0) {
      setSeemoreClicked(
        data.map((d) => {
          return {
            [d.category]: false,
          };
        })
      );
    }
  }, [data]);

  function handleSeemoreList(d) {
    const newSeemore = [...seemoreClicked];
    const selectedSeemore = data.findIndex((v) => v.category === d.category);
    newSeemore[selectedSeemore][d.category] =
      !newSeemore[selectedSeemore][d.category];

    setSeemoreClicked(newSeemore);
  }

  return (
    <section className="lists-wrapper">
      {data.map((d, i) => {
        return (
          <div
            className={`fixed-width-md ${d.category} list-wrapper`}
            key={d.category}
          >
            <div className={`${d.category}__container`}>
              <div className="title">
                <h2>{d.category}</h2>
              </div>
              <div className="list">
                {seemoreClicked[i]?.[d.category]
                  ? d.items.map((_d, i) => {
                      return (
                        <ItemCard
                          value={_d}
                          category={d.category}
                          data={data}
                          key={i}
                        ></ItemCard>
                      );
                    })
                  : [...d.items].slice(0, 4).map((_d, i) => {
                      return (
                        <ItemCard
                          value={_d}
                          category={d.category}
                          data={data}
                          key={i}
                        ></ItemCard>
                      );
                    })}
              </div>
              {d.items.length > 4 && (
                <div
                  className="seemore-list"
                  onClick={() => handleSeemoreList(d)}
                >
                  <button className="primary-rounded-outline-btn">
                    {seemoreClicked[i]?.[d.category] ? "See Less" : "See All"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
