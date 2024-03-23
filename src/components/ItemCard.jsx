import React from "react";

import Link from "next/link";
import Image from "next/image";
import Addtocart from "./Addtocart";

export default function ItemCard(props) {
  const { value } = props;

  return (
    <div className="itemcard">
      <div className="itemcard__banner h-[135px] w-full relative">
        {/* <img src={value.img} alt="item" /> */}
        <Image
          src={value.image}
          alt="Picture of the author"
          style={{ objectFit: "contain" }}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto p-2"
        />
      </div>
      <div className="itemcard__content">
        <div className="itemcard__title">
          <h2>{value.product}</h2>
        </div>
        <div className="itemcard__description">
          <p>
            {value.description.length > 90 ? (
              <>{value.description.slice(0, 90).concat("...")}</>
            ) : (
              value.description
            )}

            {/* <Link href={`/item/${value.id}`} className="itemcard__seemore">
              See More
            </Link> */}
          </p>
        </div>
        <div className="itemcard__options">
          <div className="itemcard__price">
            <span>${value.price}</span>
          </div>
          <Addtocart value={value}></Addtocart>
        </div>
      </div>
    </div>
  );
}
