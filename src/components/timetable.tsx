"use client";
import { currentDay, currentTime, secondsToTime } from "@/lib/utils";
import { Day, Subject, Timetable as TimetableType } from "@prisma/client";
import { ReactNode, useState } from "react";

function Button({
  selected,
  children,
  onClick,
}: {
  selected?: Boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-4 py-2 w-full text-sm ${
        selected ? "bg-blue-200" : "bg-blue-300"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function Timetable({
  data,
  onDelete,
}: {
  data: ({ subject: Subject } & TimetableType)[];
  onDelete?: any;
}) {
  const { day, weekend } = currentDay();
  const [selected, setSelected] = useState<string>(day);

  return (
    <>
      <div className="flex overflow-auto">
        {Object.keys(Day).map((day, index) => (
          <Button
            key={index}
            selected={selected == day}
            onClick={() => {
              setSelected(day);
            }}
          >
            {day}
          </Button>
        ))}
      </div>
      {data.map((timetable) => {
        if (timetable.day == selected)
          return (
            <div
              className={`flex space-x-2 ${
                currentTime() >= timetable.time[0] &&
                currentTime() <= timetable.time[1] &&
                selected == day &&
                !weekend
                  ? "bg-slate-200"
                  : ""
              }`}
              key={timetable.id}
            >
              <div className="w-1/2 text-right">
                {secondsToTime(timetable.time[0])} -{" "}
                {secondsToTime(timetable.time[1])}
              </div>
              <div className="w-full">
                {timetable.break ? "Istirahat" : timetable.subject?.name}
              </div>
              {onDelete && (
                <button
                  className="bg-red-500 text-white rounded-md px-2 hover:opacity-75"
                  onClick={async () => {
                    await onDelete(timetable.id);
                    alert("Berhasil terhapus");
                    location.reload();
                  }}
                >
                  Hapus
                </button>
              )}
            </div>
          );
      })}
    </>
  );
}
