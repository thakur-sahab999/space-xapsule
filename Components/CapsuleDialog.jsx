"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const CapsuleDialog = ({ open, setOpen, handleClose, capsule }) => {
  console.log(capsule);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="bg-violet-400 flex w-full justify-between items-center">
          <h3 className="block text-xl font-semibold text-primary-yellow tracking-widest uppercase ">
            {capsule?.capsule_serial}
          </h3>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="bg-violet-400">
          <Image
            src="/assets/rocket-that-is-starting-launch-with-word-space-it_1340-27101.avif"
            width={1000}
            height={1500}
            className="w-full flex-shrink-0 h-auto rounded-lg"
            alt={capsule?.capsule_serial}
            title={capsule?.capsule_serial}
          />
          <div class="mt-6 mb-2 text-gray-100">
            <h4 class="text-xl font-bold tracking-wide">
              <span>{capsule?.capsule_id}</span>
            </h4>
          </div>
          <p className="text-gray-100 ">
            {capsule?.details
              ? capsule?.details
              : "No Details available yet..."}
          </p>
          <p className="mt-4 text-primary-yellow flex justify-between">
            <span className="font-bold ">{"TYPE"}</span>
            <span className="text-white font-semibold">
              {capsule?.type ? capsule?.type : "Unknown"}
            </span>
          </p>
          <p className="text-primary-yellow flex justify-between">
            <span className="font-bold">{"STATUS"}</span>
            <span className="text font-semibold left text-white">
              {capsule?.status ? capsule?.status : "Unknown"}
            </span>
          </p>
          <p className="text-primary-yellow flex justify-between">
            <span className="font-bold">{"LANDINGS"}</span>
            <span className="text font-semibold left text-white">
              {capsule?.landings ? capsule?.landings : "Unknown"}
            </span>
          </p>
          <p className="text-primary-yellow flex justify-between">
            <span className="font-bold">{"REUSE COUNTS"}</span>
            <span className="text font-semibold left text-white">
              {capsule?.reuse_count ? capsule?.reuse_count : "Unknown"}
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CapsuleDialog;
