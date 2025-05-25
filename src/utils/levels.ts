// src/utils/levels.ts

/**
 * Divide una lista de países en 5 niveles según su población.
 * Nivel 1: países con mayor población.
 * Nivel 5: países con menor población.
 *
 * @param countries - Lista de países con la propiedad 'population'.
 * @returns Arreglo de 5 subarreglos, cada uno representando un nivel.
 */

export interface Country {
  name: string;
  population: number;
  [key: string]: any; // permite propiedades adicionales como capital, bandera, etc.
}

export function dividirEnNiveles(countries: Country[]): Country[][] {
  const sortedCountries = [...countries].sort(
    (a, b) => b.population - a.population
  );

  const total = sortedCountries.length;
  const size = Math.ceil(total / 5);
  const levels: Country[][] = [];

  for (let i = 0; i < 5; i++) {
    const start = i * size;
    const end = start + size;
    levels.push(sortedCountries.slice(start, end));
  }

  return levels;
}
