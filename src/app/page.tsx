import Section from "@/components/section";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Book from "@/components/book";
import Timetable from "@/components/timetable";
import {
  Subject,
  Timetable as TimetableType,
  Assignment as AssignmentType,
} from "@prisma/client";
import Assignment from "@/components/assignment";
import AssignmentSection from "@/components/assignmentsection";

export default async function Home() {
  const timetable = (await prisma.timetable.findMany({
    include: {
      subject: true,
    },
  })) as ({ subject: Subject } & TimetableType)[];

  const subjects = await prisma.subject.findMany({
    where: {
      book: {
        not: null,
      },
    },
  });

  const assignments = (await prisma.assignment.findMany({
    where: {
      dueDate: {
        gte: new Date(),
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    include: {
      subject: true,
    },
  })) as ({ subject: Subject } & AssignmentType)[];

  return (
    <div className="container w-[95%] mx-auto mt-6">
      <div className="flex justify-center">
        <Image
          src={"/logo.svg"}
          alt="Joyfullys Logo"
          width={200}
          height={200}
        />
      </div>
      <div className="lg:flex mt-6 lg:space-x-2 space-y-4 lg:space-y-0">
        <Section title="Jadwal Pelajaran">
          <Timetable data={timetable} />
        </Section>
        <Section title="Buku">
          {subjects.map((subject) => (
            <Book key={subject.id} subject={subject} />
          ))}
        </Section>
        <Section title="Tugas">
          <AssignmentSection assignments={assignments} />
        </Section>
      </div>
    </div>
  );
}
