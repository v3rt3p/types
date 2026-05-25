import z from 'zod'

export const soundSetLevelDirective = z.object({
  level: z.number(),
  type: z.literal('soundSetLevel')
})

export type SoundSetLevelDirective = z.infer<typeof soundSetLevelDirective>

export const soundQuieterDirective = z.object({
  type: z.literal('soundQuieter')
})

export type SoundQuieterDirective = z.infer<typeof soundQuieterDirective>

export const soundLouderDirective = z.object({
  type: z.literal('soundLouder')
})

export type SoundLouderDirective = z.infer<typeof soundLouderDirective>

export const bluetoothEnableDirective = z.object({
  type: z.literal('bluetoothEnable')
})

export type BluetoothEnableDirective = z.infer<typeof bluetoothEnableDirective>

export const bluetoothDisableDirective = z.object({
  type: z.literal('bluetoothDisable')
})

export type BluetoothDisableDirective = z.infer<typeof bluetoothDisableDirective>

export const customQuasarDirective = z.object({
  data: z.unknown(),
  type: z.literal('customQuasar')
})

export type CustomQuasarDirective = z.infer<typeof customQuasarDirective>

export const customMarusyaDirective = z.object({
  data: z.unknown(),
  type: z.literal('customMarusya')
})

export type CustomMarusyaDirective = z.infer<typeof customMarusyaDirective>

export const directive = z.union([
  soundSetLevelDirective,
  soundLouderDirective,
  soundQuieterDirective,
  bluetoothEnableDirective,
  bluetoothDisableDirective,
  customQuasarDirective,
  customMarusyaDirective
])

export type Directive = z.infer<typeof directive>
