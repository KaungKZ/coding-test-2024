import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Link from "next/link";
import { useAppContext } from "@/context";
import { useDisclosure } from "@mantine/hooks";
import Button from "@/components/Button";
import CreateModal from "./CreateModal";
import NumberInput from "./NumberInput";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";

export default function CartPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { addedItems, setAddedItems } = useAppContext();

  const [isChecked, setIsChecked] = useState({});
  const [isCheckout, setIsCheckout] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);

  function handleRemoveItems() {
    // get truthy values in checked array
    const _toRemoveCheckedArray = Object.fromEntries(
      Object.entries(isChecked).filter(([_, value]) => value === true)
    );

    if (Object.keys(_toRemoveCheckedArray).length !== 0) {
      open();
    }
  }

  function handleCheckout() {
    if (user) {
      router.push("/checkout");
      setIsChecked({});
      setIsCheckout(true);
    } else {
      router.push("/signin");
    }
  }

  function handleDeleteItems() {
    if (isChecked["all"]) {
      setAddedItems([]);
      setIsChecked({});
    } else {
      // get truthy values in checked array
      const _toRemoveCheckedArray = Object.fromEntries(
        Object.entries(isChecked).filter(([_, value]) => value === true)
      );
      // delete selected items
      const _filteredItems = addedItems.filter((item) => {
        return (
          Object.keys(_toRemoveCheckedArray)
            .map((v) => parseInt(v))
            .indexOf(item.id) === -1
        );
      });
      setAddedItems(_filteredItems);
      // delete selected items (checks) from checked array as well
      setIsChecked(
        Object.fromEntries(
          Object.entries(isChecked).filter(([_, value]) => !value)
        )
      );
    }

    close();
  }

  function calculateTotal() {
    return addedItems
      .reduce((acc, cur) => {
        return Number(cur.price) * (cur.qty ? cur.qty : 1) + acc;
      }, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  }

  return (
    <>
      <div className="cart-wrapper fixed-width-md">
        <div className="cart">
          <div className="cart__title">
            <h1>Shopping bag</h1>
          </div>
          {addedItems.length > 0 ? (
            <div className="cart__body">
              <div className="cart__table">
                <div className="cart__table-header">
                  <div className="cell">
                    <div className="checkbox-container">
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => {
                            setIsChecked(() => {
                              const fullObj = {};
                              addedItems.forEach((item, i) => {
                                fullObj[item.id] = isChecked["all"]
                                  ? false
                                  : true;
                              });
                              return {
                                all: !isChecked["all"],
                                ...fullObj,
                              };
                            });
                          }}
                        />
                        <svg
                          className={`checkbox ${
                            isChecked["all"] ? "checkbox--active" : ""
                          }`}
                          aria-hidden="true"
                          viewBox="0 0 15 11"
                          fill="none"
                        >
                          <path
                            d="M1 4.5L5 9L14 1"
                            strokeWidth="2"
                            stroke={isChecked["all"] ? "#40BFFF" : "none"}
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="cell">Items</div>
                  <div className="cell">Amount</div>
                  <div className="cell">Price</div>
                </div>
                <div className="cart__table-body">
                  {addedItems.map((item, i) => {
                    return (
                      <div className="row" key={item.id}>
                        <div className="cell">
                          <div className="checkbox-container">
                            <label>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  setIsChecked({
                                    ...isChecked,
                                    ...{ [item.id]: !isChecked[item.id] },
                                  });
                                }}
                              />
                              <svg
                                className={`checkbox ${
                                  isChecked[item.id] ? "checkbox--active" : ""
                                }`}
                                aria-hidden="true"
                                viewBox="0 0 15 11"
                                fill="none"
                              >
                                <path
                                  d="M1 4.5L5 9L14 1"
                                  strokeWidth="2"
                                  stroke={
                                    isChecked[item.id] ? "#40BFFF" : "none"
                                  }
                                />
                              </svg>
                            </label>
                          </div>
                        </div>
                        <div className="cell">
                          <div className="cell-container">
                            <div className="item-details">
                              <div className="item-name">
                                {item.title.length > 20
                                  ? item.title.substring(0, 20).concat(" ...")
                                  : item.title}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cell">
                          <NumberInput
                            item={item}
                            addedItems={addedItems}
                            setAddedItems={setAddedItems}
                          ></NumberInput>
                        </div>
                        <div className="cell">
                          <div className="item-price">${item.price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="cart__options">
                <div className="top-options">
                  <div className="cart__remove">
                    <button onClick={handleRemoveItems}>Delete item</button>
                  </div>
                  <div className="cart__total">
                    <span>
                      Total:{" "}
                      <span className="total-price">{calculateTotal()}</span>
                    </span>
                  </div>
                </div>

                <div className="bottom-options">
                  <div className="cart__checkout ">
                    <button onClick={handleCheckout} className="primary-btn">
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : !isCheckout ? (
            <div className="empty-cart">
              <span className="text">
                Your cart is empty, please{" "}
                <Link href="/" className="link">
                  add some items
                </Link>{" "}
                to see your cart.
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <CreateModal
        opened={opened}
        open={open}
        close={close}
        title="Authentication"
      >
        <div className="cm-wrapper">
          <p className="cm-wrapper__content">
            Are you sure you want to delete these items ?
          </p>
          <div className="cm-wrapper__button-wrap">
            <div className="">
              <Button
                type="button"
                onClick={close}
                cls="cm-wrapper__back primary-btn"
                text="Back"
              />
            </div>
            <div className="">
              <Button
                type="button"
                onClick={handleDeleteItems}
                cls="cm-wrapper__confirm primary-btn"
                text="Confirm"
              />
            </div>
          </div>
        </div>
      </CreateModal>
    </>
  );
}
