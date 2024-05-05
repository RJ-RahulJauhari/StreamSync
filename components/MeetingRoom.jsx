import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useToast } from './ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User, Users } from 'lucide-react';
import EndCallButton from './EndCallButton';

const MeetingRoom = () => {

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout,setLayout] = useState('speaker-left');
  const [showParticipants,setShowParticipants] = useState(false);
  const router = useRouter();
  // const params = useParams();

  const CallLayout = () => {
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout></PaginatedGridLayout>
        break;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left'></SpeakerLayout>;
        break;
      default:
        return <SpeakerLayout participantsBarPosition='right'></SpeakerLayout>;
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          {CallLayout()}
        </div>
        <div className={cn('h-[calc(100vh -86px)] hidden ml-2',{'show-block':showParticipants})}>
          <CallParticipantsList onClose={() => {setShowParticipants(false)}}></CallParticipantsList>
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls></CallControls>
        <DropdownMenu>
          <div>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white'></LayoutList>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border border-dark-1 bg-dark-1 text-white'>
            {['Grid','Speaker-Left','Speaker-Right'].map((item,index) => {
              return (<div key={index}>
                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                  setLayout(item.toLowerCase())
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border border-dark-1" />
              </div>)
            })}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton></CallStatsButton>
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white'></Users>
          </div>
        </button>
        {!isPersonalRoom ? <EndCallButton></EndCallButton>:""}
      </div>
    </section>
  )
}

export default MeetingRoom
