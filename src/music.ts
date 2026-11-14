import z from 'zod'

export const musicArtist = z.object({
  id: z.string().describe('Artist ID'),
  imageUrl: z.string().optional().describe('Artist image'),
  name: z.string().describe('Artist name')
}).describe('Music artist')

export type MusicAlbum = z.infer<typeof musicAlbum>

export const musicAlbum = z.object({
  id: z.string().describe('Album ID'),
  imageUrl: z.string().optional().describe('Album image'),
  name: z.string().describe('Album name'),
  year: z.number().describe('Album year')
}).describe('Music album')

export type MusicArtist = z.infer<typeof musicArtist>

export const musicTrack = z.object({
  albums: z.array(musicAlbum).describe('Track albums'),
  artists: z.array(musicArtist).describe('Track arists'),
  format: z.string().describe('Track format (MP3)'),
  id: z.string().describe('Track ID'),
  imageUrl: z.string().optional().describe('Track image'),
  title: z.string().describe('Track title'),
  url: z.url().describe('Direct track URL')
}).describe('Music track')

export type MusicTrack = z.infer<typeof musicTrack>
