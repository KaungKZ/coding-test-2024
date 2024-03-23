import React from "react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import CreateModal from "./CreateModal";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";

export default function AddressForm() {
  const [opened, { open, close }] = useDisclosure(false);
  const { setAddedItems } = useAppContext();

  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    setAddedItems([]);

    open();

    console.log(values);
  }
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full  max-w-[550px] pt-10 pb-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      name: e.target.value,
                    })
                  }
                  required
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6"
                >
                  Street
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="street"
                  name="street"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      street: e.target.value,
                    })
                  }
                  required
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6"
                >
                  City
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      city: e.target.value,
                    })
                  }
                  required
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6"
                >
                  State
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="state"
                  name="state"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      state: e.target.value,
                    })
                  }
                  required
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6"
                >
                  Zip Code
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      zip: e.target.value,
                    })
                  }
                  required
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6"
                >
                  Country
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="country"
                  name="country"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      country: e.target.value,
                    })
                  }
                  required
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6"
                >
                  Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      phone: e.target.value,
                    })
                  }
                  className="block w-full border-2 border-[#e7e7e7] rounded-[7px] border-solid bg-white/5 p-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:border-2 focus:border-[#fff] focus:ring-2 focus:ring-inset focus:ring-[#33a0ff] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                // disabled={!email || !password}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-[#33a0ff] px-3 py-1.5 text-sm text-white font-semibold leading-6  shadow-sm hover:bg-[#33a0ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33a0ff"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <CreateModal
        opened={opened}
        open={open}
        close={close}
        closeOnClickOutside={false}
        title="Address Confirmation"
        withCloseButton={false}
      >
        <div className="cm-wrapper pt-[20px]">
          <p className="cm-wrapper__content text-lg ">
            Your information are saved !
          </p>

          <div className="cm-wrapper__button-wrap">
            <div className="">
              <Button
                type="button"
                onClick={() => router.push("/")}
                cls="cm-wrapper__confirm primary-btn !text-md"
                text="Back to home page"
              />
            </div>
          </div>
        </div>
      </CreateModal>
    </>
  );
}
