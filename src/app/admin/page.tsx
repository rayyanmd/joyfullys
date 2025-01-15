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
import AddBook from "@/components/add-book";
import AddAssignment from "@/components/add-assignment";

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

  // Timetable
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

  // Book
  async function addBook(prevState: any, formData: FormData) {
    "use server";

    await prisma.subject.update({
      where: {
        id: Number(formData.get("subject")),
      },
      data: {
        book: formData.get("book") as string,
      },
    });

    return true;
  }

  async function deleteBook(id: number) {
    "use server";

    await prisma.subject.update({
      where: {
        id,
      },
      data: {
        book: null,
      },
    });

    return true;
  }

  // Assignment
  async function addAssignment(prevState: boolean, formData: FormData) {
    "use server";

    const dueDateUTC7 = new Date(formData.get('date') as string);
    const dueDateUTC = new Date(dueDateUTC7.getTime() - (7 * 60 * 60 * 1000)); 

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dueDate: dueDateUTC.toISOString(),
      subjectId:
        formData.get("subject") != "break"
          ? Number(formData.get("subject"))
          : null,
    };

    await prisma.assignment.create({
      data,
    });

    return true;
  }

  async function deleteAssignment(id: number) {
    "use server";

    await prisma.assignment.delete({
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
          <Timetable data={timetable} onDelete={deleteTimetable} />
        </Section>
        <Section title="Buku">
          <AddBook action={addBook} subjects={subjects} />
          {subjects.map((subject) => {
            if (subject.book)
              return (
                <Book
                  key={subject.id}
                  subject={subject}
                  onDelete={deleteBook}
                />
              );
          })}
        </Section>
        <Section title="Tugas">
          <AddAssignment action={addAssignment} subjects={subjects} />
          <AssignmentSection
            assignments={assignments}
            onDelete={deleteAssignment}
          />
        </Section>
      </div>
    </div>
  );
}
