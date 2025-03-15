import * as migration_20250315_121424 from './20250315_121424';

export const migrations = [
  {
    up: migration_20250315_121424.up,
    down: migration_20250315_121424.down,
    name: '20250315_121424'
  },
];
