# ts-guid
TypeScript library for generating and validating [UUIDv4s](https://www.rfc-editor.org/rfc/rfc9562.html). Makes use of the Node.js native `crpyto` module to generate strong pseudo-random UUIDs.

Originally inspired by C#'s System.Guid struct, this library has been adapted to fit JavaScript's constraints, such as the lack of constructor overloading, resulting in a different class design.