"use client";
import { Assignment as AssignmentType, Subject } from "@prisma/client";
import Assignment from "./assignment";
import { useEffect, useState } from "react";

export default function AssignmentSection({
  assignments,
}: {
  assignments: ({ subject: Subject } & AssignmentType)[];
}) {
  const [assignmentsDone, setAssignmentsDone] = useState<number[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem("assignments-done");
    setAssignmentsDone(storage ? JSON.parse(storage) : []);
  }, []);

  return (
    <>
      {assignments.map((assignment) => {
        if (!assignmentsDone.includes(assignment.id)) {
          return (
            <Assignment
              key={assignment.id}
              assignment={assignment}
              setAssignmentsDone={setAssignmentsDone}
              done={false}
            />
          );
        }
      })}
      {assignmentsDone.length > 0 && (
        <p className="p-2 font-bold">Sudah Dikerjakan</p>
      )}
      {assignmentsDone.map((assignmentId) => (
        <Assignment
          key={assignmentId}
          assignment={assignments.find((a) => a.id == assignmentId)!!}
          setAssignmentsDone={setAssignmentsDone}
          done={true}
        />
      ))}
    </>
  );
}
