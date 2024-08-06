"use client";
import { Subject } from "@prisma/client";
import { useState } from "react";

export default function Book({ subject }: { subject: Subject }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-yellow-200 hover:opacity-75 rounded-lg text-center p-2 w-full block transition-all"
      >
        {subject.name}
      </button>
      {open && (
        <div
          className="fixed left-0 top-0 z-50 w-full h-full p-12"
          onClick={() => {
            setOpen(false);
          }}
        >
          <iframe
            src={subject.book!}
            className="w-full lg:w-3/4 mx-auto h-full"
          />
        </div>
      )}
    </>
  );
}
