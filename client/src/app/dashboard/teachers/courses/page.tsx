"use client";

import React from "react";

import Header from "@components/dashboard/Layout/Header";
import ListItem from "@components/layout/ListItem";
import { useRouter } from "next/navigation";
import Container from "@components/layout/Container";
import { Button } from "@components/Interactions/Button";
import { nanoid } from "nanoid";
import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCourses } from "@requests/course";

const courses = [
  {
    name: "Homework 1",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "pending",
  },
  {
    name: "Homework 2",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "in-progress",
  },
  {
    name: "Homework 1",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "5g - French",
    status: "done",
  },
  {
    name: "Conjugation - Present perfect",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "Mathematics",
    status: "done",
  },
  {
    name: "Python - Function",
    creationDate: "12/12/2021",
    deliveryDate: "12/12/2023",
    team: "English - 4B",
    status: "done",
  },
] as Course[];

const Courses = () => {
  const pastCourses = courses.filter((course) => course.status === "done");
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;


  const goTo = (path: string) => {
    router.push(path);
  };


  const { data, isLoading, isError } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: () => getCourses(String(token), String(id) ),
    enabled: (token && id )!== undefined,
  });

  if (isLoading || isError) {
    return <div>loading...</div>;
  }


  return (
    <div>
      <Header>Courses</Header>
      <main className={"flex flex-col gap-8"}>
        <Container title={"Create a new course"}>
          <div className={"flex flex-col gap-1"}>
            <Button
              rounded={"full"}
              size={"sm"}
              onClick={() => goTo("/dashboard/teachers/courses/create")}
            >
              Create a new course
            </Button>
          </div>
        </Container>

        <Container title={"Your courses"} description={"Preview, manage, delete your courses"}>
          <div className={"flex flex-col gap-2"}>
            {data.map((course, index) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Team", value: course.team },
              ];

              return (
                <ListItem
                  key={nanoid()}
                  properties={properties}
                  withUserActions
                  onSee={() =>
                    goTo(`/dashboard/teachers/courses/preview/${course.uuid}`)
                  }
                  onEdit={() =>
                    goTo(`/dashboard/teachers/courses/edit/${course.uuid}`)
                  }
                >
                  {course.name}
                </ListItem>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Courses;