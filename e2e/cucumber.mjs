export default {
  paths: ['src/features/**/*.feature'],
  import: ['src/definitions/**/*.{ts,js}'],
  requireModule: ['ts-node/register'],
  publishQuiet: true,
};
