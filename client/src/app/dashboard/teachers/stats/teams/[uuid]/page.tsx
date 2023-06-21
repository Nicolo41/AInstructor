"use client";
import Header from '@/components/Dashboard/Common/Layout/Header';
import Container from '@/components/Layout/Container';
import ListItem from '@/components/Layout/ListItem';
import { fetchTeam, getCoursesTeam } from '@/requests/team';
import { Course } from '@/types/course';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function CourseList() {
    const { data: session } = useSession();

    const pathname = usePathname();
    const uuid = pathname?.split("/")[5];

    const token = session?.user.accessToken;
    const id = session?.user.id;

    const { data, isLoading, isError } = useQuery<Course[]>(["team", "uuid", "courses"], {
        queryFn: () => getCoursesTeam(String(uuid), String(token)),
        enabled: !!token && !!uuid,
      });

    const { data : team } = useQuery(["team", uuid], {
        queryFn: () => fetchTeam(String(token), String(uuid)),
        enabled: !!token && !!uuid,
    });



      if (isLoading || isError) {
        return <div>loading...</div>;
      }

    return (
        <>
            <Header breadcrumbsReplace={[{current : String(uuid), value : team.name}]} title={"Choose a course"} />

            <Container
                title={"Your courses"}
                description={"Preview, manage, delete your courses"}
            >
        <div className={"flex flex-col gap-2"}>
          {data.length > 0 ? (
            data.map((course) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Team", value: course.team },
              ];

              return (
                <ListItem
                  key={nanoid()}
                  properties={properties}
                  href={`${pathname}/${course.uuid}`}
                >
                  {course.name}
                </ListItem>
              );
            })
          ) : (
            <span>You don&apos;t have any course yet</span>
          )}
        </div>
      </Container>
      </>
    )
}
