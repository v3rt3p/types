import z from 'zod'

export const functionArgument = z.object({
  constraints: z.discriminatedUnion('type', [
    z.object({
      argumentType: z.literal('number'),
      max: z.number(),
      min: z.number(),
      type: z.literal('number-min-max')
    }),
    z.object({
      argumentType: z.literal('number'),
      type: z.literal('number-variants'),
      variants: z.array(z.object({
        description: z.string(),
        value: z.number()
      }))
    }),
    z.object({
      argumentType: z.literal('string'),
      type: z.literal('string-not-empty')
    }),
    z.object({
      argumentType: z.literal('string'),
      type: z.literal('string-variants'),
      variants: z.array(z.object({
        description: z.string(),
        value: z.string()
      }))
    })
  ]),
  description: z.string()
})

export type FunctionArgument = z.infer<typeof functionArgument>

export const functionInfo = z.object({
  arguments: z.record(z.string(), functionArgument),
  description: z.string()
})

export type FunctionInfo = z.infer<typeof functionInfo>

export const functions = z.record(z.string(), functionInfo)

export type Functions = z.infer<typeof functions>

export const functionStateServerCallFunctionRequest = z.object({
  arguments: z.record(z.string(), z.union([z.string(), z.number()])),
  metadata: z.object(),
  name: z.string(),
  sessionId: z.string()
})

export type FunctionStateServerCallFunctionRequest = z.infer<typeof functionStateServerCallFunctionRequest>

export const functionStateServerGetIndependentStateRequest = z.object({
  sessionId: z.string()
})

export type FunctionStateServerGetIndependentStateRequest =
  z.infer<typeof functionStateServerGetIndependentStateRequest>

export const functionStateServerGetStateRequest = z.object({
  metadata: z.object(),
  sessionId: z.string()
})

export type FunctionStateServerGetStateRequest =
  z.infer<typeof functionStateServerGetStateRequest>

export const functionStateServerStateResponse = z.record(z.string(), z.object({
  description: z.string(),
  value: z.string()
}))

export type FunctionStateServerStateResponse = z.infer<typeof functionStateServerStateResponse>
