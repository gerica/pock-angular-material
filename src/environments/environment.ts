// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApp: 'http://localhost:8080',
  urlBase: 'http://localhost:8080/base',
  moduleProjeto: { name: 'Projeto' },
  moduleProjetoConveniado: { name: 'ProjetoConveniado' },
  moduleTipoProjeto: { name: 'TipoProjeto' },
  moduleProjetoDispendio: { name: 'ProjetoDispendio' },
  moduleFormacao: { name: 'Formacao', id: 'CDFormacao' },
  moduleAreaAplicacao: { name: 'AreaAplicacao' },
  moduleInstituicao: { name: 'Instituicao' },
  moduleRecursoHumano: { name: 'DispendioRecursosHumano' },
  moduleEquipamentoSoftware: { name: 'DispendioEquipamentoSoftware' },
  moduleEstrangeiro: { name: 'Estrangeiro' },
  moduleTipoApropriacao: { name: 'TipoApropriacao' },
  moduleTipoDispendio: { name: 'TipoDispendio', id: 'CDTipoDispendio' },
  moduleEscolaridade: { name: 'Escolaridade', id: 'CDEscolaridade' },
  modulePropriedadeIntelectual: { name: 'PropriedadeIntelectual' },
  moduleProjetoPropriedadeIntelectual: { name: 'ProjetoPropriedadeIntelectual' },
  isDevelope: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
