export interface Integration {
  name: string
  shortName: string
  /** Angle position around the hub (degrees, 0 = top) */
  angle: number
  /** Animation delay for floating effect */
  delay: number
}

export const integrations: Integration[] = [
  { name: 'SAP', shortName: 'SAP', angle: 0, delay: 0 },
  { name: 'SAP Ariba', shortName: 'Ariba', angle: 60, delay: 0.5 },
  { name: 'Coupa', shortName: 'Coupa', angle: 120, delay: 1.0 },
  { name: 'Oracle', shortName: 'Oracle', angle: 180, delay: 1.5 },
  { name: 'Microsoft 365', shortName: 'M365', angle: 240, delay: 2.0 },
  { name: 'Jaggaer', shortName: 'Jaggaer', angle: 300, delay: 2.5 },
]
