import * as migration_20250315_172425 from './20250315_172425';

export const migrations = [
  {
    up: migration_20250315_172425.up,
    down: migration_20250315_172425.down,
    name: '20250315_172425'
  },
];
