import { obtenerEstadisticasGenerales } from './juego_db.mjs';

async function test() {
  const result = await obtenerEstadisticasGenerales();
  console.log(JSON.stringify(result.infantes_riesgo, null, 2));
  process.exit(0);
}

test();
