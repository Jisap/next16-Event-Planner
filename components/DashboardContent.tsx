import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
import { Calendar, MapPin, Link as LinkIcon, Users, Plus } from 'lucide-react'

export const DashboardContent = async ({ userId }: { userId: string }) => {
  const events = await prisma.event.findMany({
    where: { ownerUserId: userId },
    include: {
      invite: true,
      _count: {
        select: {
          rsvps: true 
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className='flex flex-1 flex-col gap-8'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Your Events</h1>
          <p className='text-muted-foreground'>Manage your events and track attendee responses.</p>
        </div>

        <Button asChild className="shadow-lg shadow-primary/20">
          <Link href={"/events/new"}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center bg-surface/30">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>No events yet</CardTitle>
          <CardDescription className="max-w-xs mx-auto mt-2">
            You haven't created any events. Create your first event to start inviting people!
          </CardDescription>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/events/new">Create Your First Event</Link>
          </Button>
        </Card>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.map((event) => (
            <Card key={event.id} className="group hover:border-primary/50 transition-all duration-300 bg-surface/50 backdrop-blur shadow-sm hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                </div>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {event.description || "No description provided."}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "TBD"}
                </div>
                {event.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <LinkIcon className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-mono text-xs truncate">...{event.invite?.token.slice(-8)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <span>{event._count.rsvps} Responses</span>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button asChild variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={`/events/${event.id}`}>
                    Manage Event
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardContent