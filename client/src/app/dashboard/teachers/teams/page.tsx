
"use client"
import React, { useEffect } from "react";
import SortbyButton from "@/components/button/sortbybutton"
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import TeamCard from "@/components/dashboard/Cards/TeamCard";
import TeamMainInformation from "@/components/dashboard/Teams/MainInformation";


const Teams = () => {
  const {data : session} = useSession()
  console.log(session)

  const id = String(session?.user.user_id)


    const [teams, setTeams] = React.useState([
        {
            "teamUUID": "",
            "name": "",
            "color": "",
        }
    ]);



    useEffect(
      () => {

        const fetchData = async () => {
          console.log('fetch')
            try {
              const response = await fetch("http://localhost:8000/api/group/", {

                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  authorization : `bearer ${session?.user["acces token"]}`
                },

                body: JSON.stringify(
                  {
                    id : id,
                  }
                ),
              });
              
              const responseData = await response.json();
              console.log(responseData);
              setTeams(responseData.teams); 
            } 
      
            catch (error) {
              console.error(error);
            }
          };
          console.log(session?.user["acces token"])
          
          if (session?.user["acces token"]) fetchData();

    }, [session]);

  return (
    <div className={clsx(
        "flex-1 h-full flex flex-col gap-6",
        styles.teams
    )}>

        <h1 className="text-5xl font-black">
          Teams
        </h1>

        <SortbyButton/>

        <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
                {teams.map((team,i) => (
                    <TeamCard key={i} className={"justify-evenly"} team={team} i={i} isAddingTeam={false}/>
                ))}
                <TeamCard className={"justify-center gap-0"} team={{teamUUID: "", name: "", color: ""}} i={0} isAddingTeam={true}/>
        </div>


    </div>
)
  
};

export default Teams;
