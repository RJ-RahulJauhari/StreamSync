"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import { useToast } from "@/components/ui/use-toast"

const CallList = ({type}) => {

    // const {endedCalls, upcomingCalls, recording, isLoading} = useGetCalls();
    const router = useRouter();
    // const [callRecordings,setCallRecordings] = useState([]);
    const {toast} = useToast();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
    const [recordings, setRecordings] = useState([]);

    const getCalls = () => {
        switch(type){
            case 'ended':
                return endedCalls;
            case 'recordings':
                return callRecordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch(type){
            case 'ended':
                return "No Previous Calls";
            case 'recordings':
                return "No Recordings";
            case 'upcoming':
                return "No Upcoming Calls";
            default:
                return "";
        }
    }
    
    useEffect(() => {
        const fetchRecordings = async () => {
          const callData = await Promise.all(
            callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
          );
    
          const recordings = callData
            .filter((call) => call.recordings.length > 0)
            .flatMap((call) => call.recordings);
    
          setRecordings(recordings);
        };
    
        if (type === 'recordings') {
          fetchRecordings();
        }
      }, [type, callRecordings]);


    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage()

  return (
    <div className='grid grid-cols-1 gap-5 xl: grid-cols-2'>
        {
            calls && calls.length > 0 ?
            (
                calls.map((meeting) => {
                    return (<MeetingCard 
                        key={meeting?.id} 
                        icon={ 
                        type === 'ended'
                        ? '/icons/previous.svg'
                        : type === 'upcoming'
                          ? '/icons/upcoming.svg'
                          : '/icons/recordings.svg'} 
                          date={
                            (meeting).state?.startsAt?.toLocaleString() ||
                            (meeting).start_time?.toLocaleString()
                          }
                          isPreviousMeeting={type === 'ended'}
                          link={
                            type === 'recordings'
                              ? (meeting).url
                              : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting).id}`
                          }
                          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                          buttonText={type === 'recordings' ? 'Play' : 'Start'}
                          handleClick={
                            type === 'recordings'
                              ? () => router.push(`${(meeting).url}`)
                              : () => router.push(`/meeting/${(meeting).id}`)
                          }
                        title={(meeting).state?.custom?.description?.substring(0,26) ||
                            (meeting).filename?.substring(0, 20) ||
                            'No Description'}>
        
                        </MeetingCard>)
                })
            )
            :
            (
                <h1>{noCallsMessage}</h1>
            )
        }
    </div>
    )  
  
}

export default CallList;
