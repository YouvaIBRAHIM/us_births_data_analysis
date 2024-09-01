// src/components/StatisticsView/form/FormExamplesData.ts

import { clearForm } from "@src/components/StatisticsView/form/Form.store";
import { IStatsForm } from "./FormBase.types";

interface IOption {
  label: string;
  value: string;
  form: IStatsForm;
}

export const options: IOption[] = [
  {
    label: 'Personnalisé',
    value: 'custom',
    form: clearForm,
  },
  {
    label: 'Exploration initiale',
    value: 'example-1',
    form: {
      title: 'Exploration initiale',
      chartType: "bar",
      chartOrientation: 'v',
      indexes: ['years'],
      columns: ['gender', "births"],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: null,
        gender: null,
        births: 'sum',
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Agrégation des données',
    value: 'example-2',
    form: {
      title: 'Agrégation des données',
      chartType: "line",
      chartOrientation: 'v',
      indexes: ['years'],
      columns: ['gender'],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: null,
        gender: null,
        births: 'sum',
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Visualisation des naissances',
    value: 'example-3',
    form: {
      title: 'Visualisation des naissances',
      chartType: "line",
      chartOrientation: 'v',
      indexes: ['years'],
      columns: [],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: null,
        gender: null,
        births: 'sum',
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Calcul des proportions',
    value: 'example-4',
    form: {
      title: 'Calcul des proportions',
      chartType: null,
      chartOrientation: 'h',
      indexes: ['names','years'],
      columns: ['gender'],
      years: {
        type: 'period',
        field: 'years',
        value: [2016,2018],
      },
      names: {
        type: 'enum',
        field: 'names',
        value: ["Mary", "John", "Henry"],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: 'proportions',
        gender: 'proportions',
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Extraction des sous-ensembles',
    value: 'example-5',
    form: {
      title: 'Extraction des sous-ensembles',
      chartType: null,
      chartOrientation: 'h',
      indexes: ['names'],
      columns: [],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: null,
        gender: null,
        births: null,
      },
      limit: 1000,
      orderBy: {
        field: "births",
        order: "desc"
      },
    },
  },
  {
    label: 'Étude de tendances',
    value: 'example-6',
    form: {
      title: 'Étude de tendances',
      chartType: 'heat',
      chartOrientation: 'v',
      indexes: ['years'],
      columns: ['names'],
      years: {
        type: 'period',
        field: 'years',
        value: [1895,1906],
      },
      names: {
        type: 'enum',
        field: 'names',
        value: ['John','Harry'],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: null,
        gender: null,
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Mesure de la diversité des prénoms',
    value: 'example-7',
    form: {
      title: 'Mesure de la diversité des prénoms',
      chartType: 'bar',
      chartOrientation: 'v',
      indexes: ['years'],
      columns: ['names'],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: 'count-names-per-year',
        names: null,
        gender: null,
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Analyse par décennie',
    value: 'example-8',
    form: {
      title: 'Analyse par décennie',
      chartType: 'pie',
      chartOrientation: 'v',
      indexes: ['years'],
      columns: [],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: 'decades',
        names: null,
        gender: null,
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Longueur des prénoms',
    value: 'example-9',
    form: {
      title: 'Longueur des prénoms',
      chartType: 'bar',
      chartOrientation: 'v',
      indexes: ['names'],
      columns: [],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: "names-length",
        gender: null,
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Noms composés',
    value: 'example-10',
    form: {
      title: 'Noms composés',
      chartType: null,
      chartOrientation: 'v',
      indexes: ['names'],
      columns: [],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,2018],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: "compounds-names",
        gender: null,
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
  {
    label: 'Tableau pivot par prénom et année',
    value: 'example-11',
    form: {
      title: 'Tableau pivot par prénom et année',
      chartType: "line",
      chartOrientation: 'v',
      indexes: ['years', 'names'],
      columns: [],
      years: {
        type: 'period',
        field: 'years',
        value: [1880,1895],
      },
      names: {
        type: 'all',
        field: 'names',
        value: [],
      },
      gender: {
        type: 'all',
        field: 'gender',
        value: [],
      },
      conditions: [],
      aggregations: {
        years: null,
        names: null,
        gender: null,
        births: null,
      },
      limit: null,
      orderBy: null,
    },
  },
];

