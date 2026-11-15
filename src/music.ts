import { z } from 'zod'

// Music models

export const musicArtist = z.object({
  id: z.string().describe('Artist ID'),
  imageUrl: z.string().optional().describe('Artist image'),
  name: z.string().describe('Artist name')
}).describe('Music artist')

export type MusicArtist = z.infer<typeof musicArtist>

export const musicAlbum = z.object({
  id: z.string().describe('Album ID'),
  imageUrl: z.string().optional().describe('Album image'),
  name: z.string().describe('Album name'),
  year: z.number().int().nonnegative().describe('Album year')
}).describe('Music album')

export type MusicAlbum = z.infer<typeof musicAlbum>

export const musicTrack = z.object({
  albums: z.array(musicAlbum).describe('Track albums'),
  artists: z.array(musicArtist).describe('Track artists'),
  durationMs: z.number().int().nonnegative().describe('Track duration in milliseconds'),
  id: z.string().describe('Track ID'),
  imageUrl: z.string().optional().describe('Track image'),
  title: z.string().describe('Track title')
}).describe('Music track')

export type MusicTrack = z.infer<typeof musicTrack>

export const musicTrackWithUrl = z.intersection(z.object({
  format: z.string().default('Track format (MP3'),
  url: z.url().describe('Direct track URL')
}), musicTrack)

export type MusicTrackWithUrl = z.infer<typeof musicTrackWithUrl>

export const musicWave = z.object({
  id: z.string().describe('Wave ID'),
  imageUrl: z.string().optional().describe('Wave image'),
  name: z.string().describe('Wave name')
}).describe('Music wave')

export type MusicWave = z.infer<typeof musicWave>

export const musicPlaylist = z.object({
  id: z.string().describe('Playlist ID'),
  imageUrl: z.string().optional().describe('Playlist image'),
  name: z.string().describe('Playlist name')
}).describe('Music playlist')

export type MusicPlaylist = z.infer<typeof musicPlaylist>

// GET /music/stock/waves

export const musicServiceGetStockWavesResponse = z.object({
  waves: z.array(musicWave).describe('Stock waves')
})

export type MusicServiceGetStockWavesResponse =
  z.infer<typeof musicServiceGetStockWavesResponse>

// GET /music/stock/playlists

export const musicServiceGetStockPlaylistsResponse = z.object({
  playlists: z.array(musicPlaylist).describe('Stock playlists')
})

export type MusicServiceGetStockPlaylistsResponse =
  z.infer<typeof musicServiceGetStockPlaylistsResponse>

// GET /music/playlist/:playlistId

export const musicServiceGetPlaylistInfoRequestParameters = z.object({
  playlistId: z.string().describe('Playlist ID')
})

export type MusicServiceGetPlaylistInfoRequestParameters =
  z.infer<typeof musicServiceGetPlaylistInfoRequestParameters>

export const musicServiceGetPlaylistInfoResponse = z.object({
  playlist: musicPlaylist.describe('Playlist')
})

export type MusicServiceGetPlaylistInfoResponse =
  z.infer<typeof musicServiceGetPlaylistInfoResponse>

// GET /music/playlist/:playlistId/tracks?page=:page&perPage=:perPage

export const musicServiceGetPlaylistTracksRequestQuery = z.object({
  page: z.coerce.number().int().nonnegative().default(0).describe('Page'),
  perPage: z.coerce.number().int().positive().default(20).describe('Tracks per page')
})

export type MusicServiceGetPlaylistTracksRequestQuery =
  z.infer<typeof musicServiceGetPlaylistTracksRequestQuery>

export const musicServiceGetPlaylistTracksRequestParameters = z.object({
  playlistId: z.string().describe('Playlist ID')
})

export type MusicServiceGetPlaylistTracksRequestParameters =
  z.infer<typeof musicServiceGetPlaylistTracksRequestParameters>

export const musicServiceGetPlaylistTracksResponse = z.object({
  total: z.number().int().nonnegative().describe('Total number of tracks'),
  tracks: z.array(musicTrack).describe('Tracks')
})

export type MusicServiceGetPlaylistTracksResponse =
  z.infer<typeof musicServiceGetPlaylistTracksResponse>

// GET /music/artist/:artistId

export const musicServiceGetArtistInfoRequestParameters = z.object({
  artistId: z.string().describe('Artist ID')
})

export type MusicServiceGetArtistInfoRequestParameters =
  z.infer<typeof musicServiceGetArtistInfoRequestParameters>

export const musicServiceGetArtistInfoResponse = z.object({
  artist: musicArtist.describe('Artist')
})

export type MusicServiceGetArtistInfoResponse =
  z.infer<typeof musicServiceGetArtistInfoResponse>

// GET /music/artist/:artistId/tracks?page=:page&perPage=:perPage

export const musicServiceGetArtistTracksRequestQuery = z.object({
  page: z.coerce.number().int().nonnegative().default(0).describe('Page'),
  perPage: z.coerce.number().int().positive().default(20).describe('Tracks per page')
})

export type MusicServiceGetArtistTracksRequestQuery =
  z.infer<typeof musicServiceGetArtistTracksRequestQuery>

export const musicServiceGetArtistTracksRequestParameters = z.object({
  artistId: z.string().describe('Artist ID')
})

export type MusicServiceGetArtistTracksRequestParameters =
  z.infer<typeof musicServiceGetArtistTracksRequestParameters>

export const musicServiceGetArtistTracksResponse = z.object({
  total: z.number().int().nonnegative().describe('Total number of tracks'),
  tracks: z.array(musicTrack).describe('Tracks')
})

export type MusicServiceGetArtistTracksResponse =
  z.infer<typeof musicServiceGetArtistTracksResponse>

// GET /music/artist/:artistId/albums?page=:page&perPage=:perPage

export const musicServiceGetArtistAlbumsRequestQuery = z.object({
  page: z.coerce.number().int().nonnegative().default(0).describe('Page'),
  perPage: z.coerce.number().int().positive().default(20).describe('Albums per page')
})

export type MusicServiceGetArtistAlbumsRequestQuery =
  z.infer<typeof musicServiceGetArtistAlbumsRequestQuery>

export const musicServiceGetArtistAlbumsRequestParameters = z.object({
  artistId: z.string().describe('Artist ID')
})

export type MusicServiceGetArtistAlbumsRequestParameters =
  z.infer<typeof musicServiceGetArtistAlbumsRequestParameters>

export const musicServiceGetArtistAlbumsResponse = z.object({
  albums: z.array(musicAlbum).describe('Albums'),
  total: z.number().int().nonnegative().describe('Total number of albums')
})

export type MusicServiceGetArtistAlbumsResponse =
  z.infer<typeof musicServiceGetArtistAlbumsResponse>

// GET /music/album/:albumId

export const musicServiceGetAlbumInfoRequestParameters = z.object({
  albumId: z.string().describe('Album ID')
})

export type MusicServiceGetAlbumInfoRequestParameters =
  z.infer<typeof musicServiceGetAlbumInfoRequestParameters>

export const musicServiceGetAlbumInfoResponse = z.object({
  album: musicAlbum.describe('Album')
})

export type MusicServiceGetAlbumInfoResponse =
  z.infer<typeof musicServiceGetAlbumInfoResponse>

// GET /music/album/:albumId/tracks?page=:page&perPage=:perPage

export const musicServiceGetAlbumTracksRequestQuery = z.object({
  page: z.coerce.number().int().nonnegative().default(0).describe('Page'),
  perPage: z.coerce.number().int().positive().default(20).describe('Tracks per page')
})

export type MusicServiceGetAlbumTracksRequestQuery =
  z.infer<typeof musicServiceGetAlbumTracksRequestQuery>

export const musicServiceGetAlbumTracksRequestParameters = z.object({
  albumId: z.string().describe('Album ID')
})

export type MusicServiceGetAlbumTracksRequestParameters =
  z.infer<typeof musicServiceGetAlbumTracksRequestParameters>

export const musicServiceGetAlbumTracksResponse = z.object({
  total: z.number().int().nonnegative().describe('Total number of tracks'),
  tracks: z.array(musicTrack).describe('Tracks')
})

export type MusicServiceGetAlbumTracksResponse =
  z.infer<typeof musicServiceGetAlbumTracksResponse>

// POST /music/search

export const musicItemType = z.enum([
  'artist',
  'track',
  'wave',
  'album',
  'playlist'
])

export type MusicItemType = z.infer<typeof musicItemType>

export const musicServiceSearchRequest = z.object({
  kinds: z.array(musicItemType).describe('Kinds to search for'),
  query: z.string().describe('Search query')
})

export type MusicServiceSearchRequest =
  z.infer<typeof musicServiceSearchRequest>

export const musicServiceSearchResponse = z.object({
  albums: z.array(musicAlbum).optional().describe('Albums'),
  artists: z.array(musicArtist).optional().describe('Artists'),
  playlists: z.array(musicPlaylist).optional().describe('Playlists'),
  tracks: z.array(musicTrack).optional().describe('Tracks'),
  waves: z.array(musicWave).optional().describe('Waves')
})

export type MusicServiceSearchResponse =
  z.infer<typeof musicServiceSearchResponse>
