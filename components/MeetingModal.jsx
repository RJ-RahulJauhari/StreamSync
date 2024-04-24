import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
  

const MeetingModal = ({isOpen,onClose, title, classname,buttonText,handleClick, image, buttonIcon, children}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent classname='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
        <div className='flex flex-col gap-6 text-white text-center'>
            {image && (
                <div className='flex justify-center'>
                    <Image src={image} alt='image' width={72} height={72}></Image>
                </div>
            )}

            <h1 className={cn('text-3xl font-bold leading-[42px]',classname)}>{title}</h1>
            {children}
            <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-white rounded-lg' onClick={handleClick}> 
            {
                buttonIcon &&
                (<Image src={buttonIcon} alt='button Icon' width={13} height={13}></Image>)
            } &nbsp;
            {
                buttonText || 'Schedule Meeting'
            }
            </Button>
        </div>
       
      </DialogContent>
    </Dialog>

  )
}

export default MeetingModal
