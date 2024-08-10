"use client";
import { dueDate } from "@/lib/utils";
import { Assignment as AssignmentType, Subject } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";

export default function Assignment({
  assignment,
  setAssignmentsDone,
  done,
}: {
  assignment: { subject: Subject } & AssignmentType;
  setAssignmentsDone: Dispatch<SetStateAction<number[]>>;
  done: boolean;
}) {
  const [open, setOpen] = useState(false);

  const markDone = () => {
    const storage = localStorage.getItem("assignments-done");
    const storageArray: number[] = storage ? JSON.parse(storage) : [];

    if (done) storageArray.splice(storageArray.indexOf(assignment.id), 1);
    else storageArray.push(assignment.id);

    localStorage.setItem("assignments-done", JSON.stringify(storageArray));
    setAssignmentsDone(storageArray);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className={`${
          done ? "bg-green-300" : "bg-slate-500 text-white"
        } hover:opacity-75 rounded-lg p-2 text-left w-full block transition-all`}
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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex">
            <div className="w-full">
              <h2 className="text-xl font-bold">{assignment.subject.name}</h2>
              <h2 className="text-lg mb-2">{assignment.subject.teacher}</h2>
            </div>
            <div className="w-full flex flex-col justify-end">
              <p className="mb-1">{dueDate(assignment.dueDate)}</p>
              <button
                className="bg-slate-500 text-white px-4 py-2 mb-2 rounded-md hover:opacity-75"
                onClick={markDone}
              >
                {done ? "Tandai Belum Mengerjakan" : "Tandai Sudah"}
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
