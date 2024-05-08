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
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input"


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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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
      {
        !callDetails ? (
          <MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Create meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-sky-2 text-left">Add a decription</label>
              <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({...values,description:e.target.value})
              }}>
              </Textarea>
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="leading-[22px] text-sky-2 text-left">Select Date and Time</label>
              <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({...values, dateTime:date})}
              showTimeSelect
              timeFormat="HH:mm"
              timeCaption="time"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"></ReactDatePicker>
            </div>
          </MeetingModal>
        ):
        (
          <MeetingModal
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Meeting created"
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({title:'Link copied'});
            }
          }
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copy Meeting Link'
          ></MeetingModal>
        )
      }
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => createMeeting()}
      ></MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input onChange={(e) => setValues({...values,link:e.target.value})} className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' placeholder="Meeting Link" />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
