"use client";
import { Assignment as AssignmentType, Subject } from "@prisma/client";
import Assignment from "./assignment";
import { useEffect, useState } from "react";

export default function AssignmentSection({
  assignments,
  onDelete,
}: {
  assignments: ({ subject: Subject } & AssignmentType)[];
  onDelete?: any;
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
              onDelete={onDelete}
            />
          );
        }
      })}
      {assignmentsDone.length > 0 && (
        <p className="p-2 font-bold">Sudah Dikerjakan</p>
      )}
      {assignmentsDone.map((assignmentId) => {
        const assignment = assignments.find((a) => a.id == assignmentId);
        if (assignment)
          return (
            <Assignment
              key={assignmentId}
              assignment={assignment}
              setAssignmentsDone={setAssignmentsDone}
              done={true}
            />
          );
      })}
    </>
  );
}
