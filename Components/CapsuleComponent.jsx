"use client";
import React, { useEffect, useState } from "react";
import { getAPIData } from "@/api-functions/fetchCapsules";
import SingleCapsule from "./SingleCapsule";
import EmptyCapsule from "./EmptyCapsule";

const Category = () => {

  // Form state
  const initialFormData = {
    status: "all",
    type: "all",
    originalLaunch: "all",
  };
  const [searchFormData, setSearchFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown options state
  const [types, setTypes] = useState([]);
  const [launchDates, setLaunchDates] = useState([]);
  const [status, setStatus] = useState([]);

  // Capsules state and pagination state
  const [capsules, setCapsules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [capsulesPerPage] = useState(8);

  useEffect(() => {
    // Fetch initial data and set dropdown options
    setIsLoading(true);
    getAPIData()
      .then((data) => {
        const { typesArray, launchDatesArray, statusArray } =
          extractAttributes(data);
        setTypes(typesArray);
        setLaunchDates(launchDatesArray);
        setStatus(statusArray);
        setCapsules(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    // Update form state on dropdown selection change
    setSearchFormData({
      ...searchFormData,
      [e.target.name]: e.target.value,
    });
  };

  const createQueryString = () => {
    // Create query string for API based on form state
    const queryParams = [];

    if (searchFormData.status !== "all") {
      queryParams.push(`status=${searchFormData.status.trim()}`);
    }

    if (searchFormData.type !== "all") {
      queryParams.push(`type=${searchFormData.type.trim()}`);
    }

    if (searchFormData.originalLaunch !== "all") {
      queryParams.push(
        `original_launch=${searchFormData.originalLaunch.trim()}`
      );
    }

    return queryParams.join("&");
  };

  const resetForm = () => {
    // Reset form to initial state
    setSearchFormData(initialFormData);
  };

  const getData = () => {
    // Fetch data based on form state and update capsules state
    setIsLoading(true);
    const queryString = createQueryString();
    getAPIData(queryString)
      .then((data) => {
        setCapsules(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        resetForm();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getData();
  };

  // Pagination Logic
  const indexOfLastCapsule = currentPage * capsulesPerPage;
  const indexOfFirstCapsule = indexOfLastCapsule - capsulesPerPage;
  const currentCapsules = capsules.slice(
    indexOfFirstCapsule,
    indexOfLastCapsule
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container  mx-auto ">
     
      {/* Search Form */}
      <section className="p-6 pt-10 pb-10 md:pt-5 lg:pt-0  text-gray-50">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="grid grid-cols-1 border  lg:grid-cols-3 gap-6 p-6 text-primary-blue text-lg font-bold rounded-md shadow-sm bg-violet-500"
        >
          <div className="">
            <label
              className="text-lg font-semibold text-white"
              htmlFor="status"
            >
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={searchFormData.status}
              onChange={handleInputChange}
              className="block  border-primary-yellow outline-primary-yellow w-full p-2 mt-1  border-2 rounded-md"
            >
              <option value="all">All</option>
              {status?.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label className=" text-lg font-semibold text-white" htmlFor="type">
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={searchFormData.type}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1 border-primary-yellow outline-primary-yellow border-2 rounded-md"
            >
              <option value="all">All</option>
              {types?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label
              className=" text-lg font-semibold text-white"
              htmlFor="originalLaunch"
            >
              Launch Date:
            </label>
            <select
              id="originalLaunch"
              name="originalLaunch"
              value={searchFormData.originalLaunch}
              onChange={handleInputChange}
              className="block w-full p-2 mt-1  border-2 border-primary-yellow outline-primary-yellow rounded-md"
            >
              <option value="all">All</option>
              {launchDates?.map((launchDate) => (
                <option key={launchDate} value={launchDate}>
                  {launchDate}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 col-span border-primary-blue hover:border-primary-yellow  text-violet-600 font-bold text-lg bg-primary-yellow border rounded-md cursor-pointer hover:bg-primary-blue hover:text-primary-yellow"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-white bg-violet-800 border rounded-md cursor-pointer hover:bg-gray-600"
          >
            Reset Form
          </button>
        </form>
      </section>

      {/* Capsules Display */}
      {isLoading ? (
        <h1 className="text-white w-full text-center text-3xl">
          Wait Loading results....
        </h1>
      ) : (
        <section className="grid w-full grid-cols-1 justify-content-center place-items-center p-4 md:grid-cols-3 lg:grid-cols-4 gap-[30px] lg:gap-[50px] mt-[30px]">
          {currentCapsules.length > 0 ? (
            <>
              {currentCapsules.map((capsule, id) => (
                <SingleCapsule capsule={capsule} key={id} />
              ))}
            </>
          ) : (
            <EmptyCapsule />
          )}
        </section>
      )}

      {/* Pagination */}
      <div className="flex gap-4 p-4 justify-center ">
        {Array.from({
          length: Math.ceil(capsules.length / capsulesPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 border  rounded-md cursor-pointer hover:text-primary-blue hover:bg-primary-yellow ${
              currentPage === index + 1
                ? " bg-primary-yellow text-violet-700 "
                : "bg-violet-700 border-primary-purple text-primary-yellow"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;

function extractAttributes(capsuleData) {
  // Extract unique types, launch dates, and statuses from capsule data
  const typesSet = new Set();
  const launchDatesSet = new Set();
  const statusSet = new Set();

  for (const capsule of capsuleData) {
    if (
      capsule.type &&
      capsule.original_launch &&
      capsule.status &&
      capsule.status !== "unknown"
    ) {
      typesSet.add(capsule.type);
      launchDatesSet.add(capsule.original_launch);
      statusSet.add(capsule.status);
    }
  }

  // Convert sets to arrays
  const typesArray = Array.from(typesSet);
  const launchDatesArray = Array.from(launchDatesSet);
  const statusArray = Array.from(statusSet);

  return { typesArray, launchDatesArray, statusArray };
}
