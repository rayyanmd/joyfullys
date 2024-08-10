"use client";
import { Day, Subject } from "@prisma/client";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function AddBook({
  action,
  subjects,
}: {
  action: any;
  subjects: Subject[];
}) {
  const [state, formAction] = useFormState(action, false);
  const [open, setOpen] = useState(false);

  if (state) {
    location.reload();
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-teal-400 hover:opacity-75 rounded-lg text-center p-2 w-full block transition-all"
      >
        Tambah Buku
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
          <form action={formAction}>
            <label htmlFor="subject">Mata Pelajaran:</label>
            <select id="subject" className="px-4 py-2" name="subject">
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="book">Url Pdf</label>
            <input
              type="text"
              id="book"
              name="book"
              className="ml-2 border-2"
            />
            <br />
            <button
              type="submit"
              className="bg-teal-400 hover:opacity-75 rounded-lg text-center p-2 w-full block transition-all disabled:bg-black"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
