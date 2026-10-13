/* Opciones del configurador de guitarra a medida */
export const WOODS = [
  { id: 'alder', name: 'Aliso', color: 0xc49a6c, description: 'Equilibrada, versátil' },
  { id: 'mahogany', name: 'Caoba', color: 0x7a3b1f, description: 'Cálida, sustain largo' },
  { id: 'ash', name: 'Fresno', color: 0xd4b896, description: 'Brillante, definida' },
  { id: 'maple', name: 'Arce', color: 0xe8d5b0, description: 'Brillante, ataque rápido' },
]

export const FINISHES = [
  { id: 'gloss', name: 'Brillante', roughness: 0.15, description: 'Laca espejo' },
  { id: 'satin', name: 'Satinado', roughness: 0.4, description: 'Suave al tacto' },
  { id: 'matte', name: 'Mate', roughness: 0.7, description: 'Sin brillo' },
]

export const PICKUP_COLORS = [
  { id: 'black', name: 'Negro', color: 0x14100e },
  { id: 'white', name: 'Blanco', color: 0xf1ecd9 },
  { id: 'cream', name: 'Crema', color: 0xe2dcc8 },
  { id: 'gold', name: 'Dorado', color: 0xc9a45c },
]

export const FRET_TYPES = [
  { id: 'standard', name: 'Estándar', description: 'Trastes medianos, versátiles' },
  { id: 'jumbo', name: 'Jumbo', description: 'Trastes grandes, fácil bending' },
  { id: 'scalloped', name: 'Escallado', description: 'Diapasón esculpido, para virtuosos' },
]

export const DEFAULT_CONFIG = {
  wood: 'alder',
  finish: 'gloss',
  pickupColor: 'black',
  fretType: 'standard',
}
