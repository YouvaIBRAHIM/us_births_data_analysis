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
      description: 'Calcul du nombre de naissances par sexe pour une année donnée et concaténation des données de toutes les années pour créer un ensemble complet.',
      generateReport: false,
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
      description: 'Création de tableaux pivots pour représenter les naissances par année et par sexe.',
      generateReport: false,
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
      description: 'Représentation graphique du nombre de naissances par année.',
      generateReport: false,
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
      description: 'Ajout d\'une colonne pour la proportion des naissances par prénom, sexe et année, et vérification de la somme des proportions pour chaque groupe.',
      generateReport: false,
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
      description: 'Extraction de sous-ensembles de 1000 prénoms les plus populaires par groupe avec une fonction spécifique.',
      generateReport: false,
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
      description: 'Analyse et représentation graphique des tendances de prénoms spécifiques comme "John" et "Harry".',
      generateReport: false,
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
      description: 'Évaluation de la diversité des prénoms au fil du temps.',
      generateReport: false,
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
      description: 'Regroupement et analyse des tendances des prénoms par décennie.',
      generateReport: false,
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
      description: 'Analyse des tendances liées à la longueur des prénoms.',
      generateReport: false,
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
      description: 'Étude de l\'évolution de l\'utilisation des noms composés.',
      generateReport: false,
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
      description: 'Création d\'une table pivot des naissances par prénom et par année.',
      generateReport: false,
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

