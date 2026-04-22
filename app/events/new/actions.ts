"use server"

import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { randomBytes } from "crypto"

export async function createEvent(values: {
  title: string
  description?: string
  location?: string
  eventDate?: string
}) {
  const session = await getSession()
  const userId = session.data?.user.id

  if (!userId) {
    redirect("/auth/sign-in")
  }

  // Create event and invite in a transaction
  await prisma.$transaction(async (tx) => {
    const newEvent = await tx.event.create({
      data: {
        ownerUserId: userId,
        title: values.title,
        description: values.description,
        location: values.location,
        eventDate: values.eventDate ? new Date(values.eventDate) : null,
      },
    })

    const token = randomBytes(16).toString("hex")

    await tx.eventInvite.create({
      data: {
        eventId: newEvent.id,
        token: token,
      },
    })
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}
