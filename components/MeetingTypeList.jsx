"use client";
import React from "react";
import Image from "next/image";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState();

  const [values,setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })

  const [callDetails,setCallDetails] = useState();

  const router = useRouter();
  const {toast} = useToast();
  
  const {user} = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if(!client || !user) return;
    try {

      if(!values.dateTime){ 
        toast({title:"Please select a date and a time..."});
        return 
      }

      const id = crypto.randomUUID();
      const call = client.call('default',id);
      if(!call) throw new Error("Failed to create call")
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

    await call.getOrCreate({
      data:{
        starts_at: startsAt,
        custom:{
          description
        }
      }
    })

    setCallDetails(call)

    if(!values.description){
      router.push(`/meeting/${call.id}`)
      toast({title:"Meeting created..."})
    }

    } catch (error) {
      console.log(error);
      toast({title:"Failed to create meeting..."})
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        color="bg-orange-1"
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an Instant Meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      ></HomeCard>
      <HomeCard
        color="bg-yellow-1"
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your Meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      ></HomeCard>
      <HomeCard
        color="bg-purple-1"
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your Recordings"
        handleClick={() => router.push("/recordings")}
      ></HomeCard>
      <HomeCard
        color="bg-blue-1"
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via Invitation Link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      ></HomeCard>
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => createMeeting()}
      ></MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
