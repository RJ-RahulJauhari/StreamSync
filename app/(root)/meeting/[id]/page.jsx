"use client"
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';

const Meeting = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const client = useStreamVideoClient(); // Assuming useStreamVideoClient is imported somewhere

  useEffect(() => {
    if (!client) return;

    // Your additional logic using client goes here

  }, [client]);

  if (!isLoaded || isCallLoading) return <Loader></Loader>;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete}></MeetingSetup>
            ) : (
              <MeetingRoom></MeetingRoom>
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
