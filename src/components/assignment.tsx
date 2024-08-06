"use client";
import { dueDate } from "@/lib/utils";
import { Assignment as AssignmentType, Subject } from "@prisma/client";
import { useState } from "react";

export default function Assignment({
  assignment,
}: {
  assignment: { subject: Subject } & AssignmentType;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-green-300 hover:opacity-75 rounded-lg p-2 text-left w-full block transition-all"
      >
        <p className="font-bold text-xl">{assignment.title}</p>
        <p>{assignment.subject.name}</p>
      </button>

      <div
        className="fixed left-0 top-0 w-full h-full p-12"
        style={{
          visibility: open ? "visible" : "hidden",
        }}
        onClick={() => {
          setOpen(false);
        }}
      >
        <div
          className="w-full lg:w-1/2 h-1/2 mx-auto bg-white rounded-lg shadow-lg transition-all duration-200 p-4"
          style={{
            opacity: open ? 1 : 0,
          }}
        >
          <div className="flex">
            <div className="w-full">
              <h2 className="text-xl font-bold">{assignment.subject.name}</h2>
              <h2 className="text-lg mb-2">{assignment.subject.teacher}</h2>
            </div>
            <div className="w-full flex flex-col justify-end">
              <p className="mb-1">{dueDate(assignment.dueDate)}</p>
              <button className="bg-slate-600 text-white px-4 py-2 mb-2 rounded-md hover:opacity-75">
                Tandai Sudah
              </button>
            </div>
          </div>
          <hr className="mb-2" />
          <p>{assignment.description}</p>
        </div>
      </div>
    </>
  );
}
