"use client";
import Image from "next/image";
import React, { useState } from "react";
import CapsuleDialog from "./CapsuleDialog";

const SingleCapsule = ({ capsule }) => {
  //dialog
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="border w-full   p-6 flex-shrink-0 rounded-md shadow-md bg-violet-500 text-gray-50 hover:scale-105 transition-all ease-in-out">
      {open && (
        <CapsuleDialog
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          capsule={capsule}
        />
      )}

      <h3 className="block pb-4 text-xl font-semibold text-primary-yellow tracking-widest uppercase ">
        {capsule?.capsule_serial}
      </h3>

      <Image
        src="/assets/rocket-that-is-starting-launch-with-word-space-it_1340-27101.avif"
        width={1000}
        height={1500}
        className="w-full flex-shrink-0 h-auto rounded-lg"
        alt={capsule?.capsule_serial}
        title={capsule?.capsule_serial}
      />
      <div class="mt-6 mb-2">
        <h4 class="text-xl font-semibold tracking-wide">
          <span>{capsule?.capsule_id}</span>
        </h4>
      </div>
      <p className="text-gray-100 line-clamp-1">
        {capsule?.details ? capsule?.details : "No Details available yet..."}
      </p>
      <div className="flex justify-center item-center">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="hover:scale-105 hover:border border  hover:bg-primary-yellow hover:text-primary-blue hover:border-gray-100 transition-all ease-in-out mt-5 px-8 py-3 text-lg font-semibold rounded bg-primary-blue text-primary-yellow"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default SingleCapsule;
