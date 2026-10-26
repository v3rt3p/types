import z from 'zod'

export const processorDirectiveInfo = z.object({
  arguments: z.any().describe('Arguments JSON schema'), // json schema yadayada
  description: z.string().describe('Human-readable description')
}).describe('Available directive info')

export type ProcessorDirectiveInfo = z.infer<typeof processorDirectiveInfo>

export const processorDirectiveFunctions = z.record(z.string(), processorDirectiveInfo).describe('Available directive functions')

export type ProcessorDirectiveFunctions = z.infer<typeof processorDirectiveFunctions>

export const processorPrepareWebSocketMessage = z.object({
  data: z.object({
    directiveFunctions: processorDirectiveFunctions
  }),
  type: z.literal('prepare')
})

export type ProcessorPrepareWebSocketMessage = z.infer<typeof processorPrepareWebSocketMessage>

export const processorProcessMetadata = z.object({
  internal: z.record(z.string().describe('Key'), z.any().describe('Value')).describe('Internal metadata (for function-state-servers and so on)'),
  readyToUse: z.record(z.string(), z.object({
    description: z.string().describe('Human-readable description'),
    value: z.any().describe('Human-readable value')
  })).describe('LLM\'s ready-to-use state data')
})

export type ProcessorProcessMetadata = z.infer<typeof processorProcessMetadata>

export const processorProcessWebSocketMessage = z.object({
  data: z.object({
    metadata: processorProcessMetadata.describe('Process call metadata'),
    text: z.string().describe('Request text')
  }),
  type: z.literal('process')
})

export type ProcessorProcessWebSocketMessage = z.infer<typeof processorProcessWebSocketMessage>

export const processorPartialResponseWebSocketMessage = z.object({
  data: z.intersection(z.object({
    directives: z.array(z.object({
      arguments: z.any().describe('Arguments value'),
      name: z.string().describe('Directive function name')
    })).describe('Directives that were called by LLM'),
    text: z.string().describe('Response text')
  }), z.union([z.object({
    finished: z.literal(false).describe('LLM task-processing not finished, more will come')
  }), z.object({
    finished: z.literal(true).describe('LLM task-processing finished, request is finished'),
    shouldListen: z.boolean().describe('Should input dialog be continued?')
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
