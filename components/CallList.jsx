"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MeetingCard from './MeetingCard';

const CallList = ({type}) => {

    const {endedCalls, upcomingCalls, recordings, isLoading} = useGetCalls();
    const router = useRouter();
    const [callRecordings,setCallRecordings] = useState([]);

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
                        title={(meeting).state?.custom?.description ||
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
