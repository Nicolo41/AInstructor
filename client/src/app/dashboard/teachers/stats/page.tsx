import React from "react";
import CubeCourses from "@/components/dashboard/Students/Stats";
import Link from "next/link";
import CubeTeams from "@/components/dashboard/Teachers/Stats";

const teams = [
  {
    id: 1,
    name: "Groupe 1",
    score: 12,
    moy: 50,
    effectif: 12,
  },
  {
    id: 2,
    name: "Groupe 2",
    score: 52,
    moy: 32,
    effectif: 12,
  },
  {
    id: 3,
    name: "Groupe 3",
    score: 69,
    moy: 10,
    effectif: 12,
  },
];

export default function Teams() {
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className={"flex items-center h-16 text-5xl font-black"}>Stats</h1>
      </header>
      <div className="flex flex-col gap-10">
        <h2 className={"text-3xl font-bold"}>My teams</h2>
        <div className="flex gap-8 ">
          {teams.map((teams) => (
            <CubeTeams uuid={teams.id} key={teams.name} name={teams.name} />
          ))}
        </div>

        <Link
          className="rounded-xl w-1/3 h-15 "
          href={`/dashboard/teachers/stats/teams/myteams`}
        >
          <div className="flex flex-col gap-5 p-4 py-3 bg-white rounded-xl font-bold text-accent-500 text-xl text-center border-2 border-dark-50 hover:border-accent-300 transition">
            Accéder à toutes mes stats de team
          </div>
        </Link>
      </div>
    </div>
  );
}
