import { Assignment as AssignmentType, Subject } from "@prisma/client";
import Assignment from "./assignment";

export default function AssignmentSection({
  assignments,
}: {
  assignments: ({ subject: Subject } & AssignmentType)[];
}) {
  return (
    <>
      {assignments.map((assignment) => (
        <Assignment key={assignment.id} assignment={assignment} />
      ))}
    </>
  );
}
