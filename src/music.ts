import z from 'zod'

export const musicTrack = z.object({
  format: z.string().describe('Track format (MP3)'),
  url: z.url().describe('Direct track URL'),
  id: z.string().describe('Track ID')
}).describe('Music track')

export type MusicTrack = z.infer<typeof musicTrack>
