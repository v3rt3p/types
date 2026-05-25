import z from 'zod'

import { directive } from './directives'

export const processorPrepareWebSocketMessage = z.object({
  data: z.object({}),
  type: z.literal('prepare')
})

export type ProcessorPrepareWebSocketMessage = z.infer<typeof processorPrepareWebSocketMessage>

export const processorProcessWebSocketMessage = z.object({
  data: z.object({
    isExternalEvent: z.boolean().optional(),
    metadata: z.record(z.string(), z.any()),
    text: z.string()
  }),
  type: z.literal('process')
})

export type ProcessorProcessWebSocketMessage = z.infer<typeof processorProcessWebSocketMessage>

export const processorPartialResponseWebSocketMessage = z.object({
  data: z.intersection(z.object({
    directives: z.array(directive),
    text: z.string()
  }), z.union([z.object({
    finished: z.literal(false)
  }), z.object({
    finished: z.literal(true),
    shouldListen: z.boolean()
  })])),
  type: z.literal('partialResponse')
})

export type ProcessorPartialResponseWebSocketMessage = z.infer<typeof processorPartialResponseWebSocketMessage>

export const processorClientWebSocketMessage = z.union([
  processorPrepareWebSocketMessage,
  processorProcessWebSocketMessage
])

export type ProcessorClientWebSocketMessage = z.infer<typeof processorClientWebSocketMessage>

export const processorServerWebSocketMessage = z.union([
  processorPartialResponseWebSocketMessage
])

export type ProcessorServerWebSocketMessage = z.infer<typeof processorServerWebSocketMessage>

export const processorWebSocketMessage = z.union([
  processorServerWebSocketMessage,
  processorClientWebSocketMessage
])

export type ProcessorWebSocketMessage = z.infer<typeof processorWebSocketMessage>

export const PROCESSOR_METADATA_SERVER_TYPE_KEY = 'serverType'

export enum ProcessorMetadataServerType {
  MARUSYA = 'marusya',
  QUASAR = 'quasar'
}
