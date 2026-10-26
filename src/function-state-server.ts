import z from 'zod'

export const functionInfo = z.object({
  arguments: z.any().describe('Arguments JSON schema'), // yadayada JSON schema
  description: z.string().describe('Human-readable description'),
  hasResponse: z.boolean().describe('Does function has any response?')
})

export type FunctionInfo = z.infer<typeof functionInfo>

export const functions = z.record(z.string(), functionInfo).describe('Available functions')

export type Functions = z.infer<typeof functions>

// function server

export const functionStateServerGetDependantFunctionsRequest = z.object({
  metadata: z.object().describe('Internal metadata for use'),
  sessionId: z.string().describe('Unique processor session ID')
})

export type FunctionStateServerGetDependantFunctionsRequest =
  z.infer<typeof functionStateServerGetDependantFunctionsRequest>

export const functionStateServerCallFunctionRequest = z.object({
  arguments: z.any().describe('Call arguments'),
  metadata: z.object().describe('Internal metadata for use'),
  name: z.string().describe('Function name'),
  sessionId: z.string().describe('Unique processor session ID')
})

export type FunctionStateServerCallFunctionRequest = z.infer<typeof functionStateServerCallFunctionRequest>

export const functionStateServerCallFunctionResponse = z.object({
  response: z.any().optional().describe('Response data (if function has response)')
})

export type FunctionStateServerCallFunctionResponse = z.infer<typeof functionStateServerCallFunctionResponse>

// state server

export const functionStateServerGetDependantStateRequest = z.object({
  metadata: z.object().describe('Internal metadata for use'),
  sessionId: z.string().describe('Unique processor session ID')
})

export type FunctionStateServerGetDependantStateRequest =
  z.infer<typeof functionStateServerGetDependantStateRequest>

export const functionStateServerStateResponse = z.record(z.string(), z.object({
  description: z.string().describe('Human-readable description'),
  value: z.string().describe('Human-readable value')
}))

export type FunctionStateServerStateResponse = z.infer<typeof functionStateServerStateResponse>
