import Section from "@/components/section";
import { prisma } from "@/lib/prisma";
import Book from "@/components/book";
import Timetable from "@/components/timetable";
import {
  Subject,
  Timetable as TimetableType,
  Assignment as AssignmentType,
  Day,
} from "@prisma/client";
import AssignmentSection from "@/components/assignmentsection";
import AddTimetable from "@/components/add-timetable";
import { timeToSeconds } from "@/lib/utils";

export default async function Admin() {
  const timetable = (
    await prisma.timetable.findMany({
      include: {
        subject: true,
      },
    })
  ).sort((a, b) => a.time[0] - b.time[0]) as ({
    subject: Subject;
  } & TimetableType)[];

  const subjects = await prisma.subject.findMany();

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

  async function addTimetable(prevState: boolean, formData: FormData) {
    "use server";

    const data = {
      break: formData.get("subject") == "break",
      day: formData.get("day") as Day,
      subjectId:
        formData.get("subject") != "break"
          ? Number(formData.get("subject"))
          : null,
      time: [
        timeToSeconds(formData.get("from") as string),
        timeToSeconds(formData.get("to") as string),
      ],
    };

    await prisma.timetable.create({
      data,
    });

    return true;
  }

  async function deleteTimetable(id: number) {
    "use server";

    await prisma.timetable.delete({
      where: {
        id,
      },
    });

    return true;
  }

  return (
    <div className="container w-[95%] mx-auto mt-6">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">Admin Page</h1>
      </div>
      <div className="lg:flex mt-6 lg:space-x-2 space-y-4 lg:space-y-0">
        <Section title="Jadwal Pelajaran">
          <AddTimetable action={addTimetable} subjects={subjects} />
          <Timetable data={timetable} admin={deleteTimetable} />
        </Section>
        <Section title="Buku">
          {subjects.map((subject) => {
            if (subject.book)
              return <Book key={subject.id} subject={subject} />;
          })}
        </Section>
        <Section title="Tugas">
          <AssignmentSection assignments={assignments} />
        </Section>
      </div>
    </div>
  );
}
