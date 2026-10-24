import z from 'zod'

export const musicTrack = z.object({
  format: z.string(),
  url: z.url()
})

export type MusicTrack = z.infer<typeof musicTrack>
