import { IMember } from '../welcome/models/welcome.models';

export const specialSymbols = /[!@#$%^&*()_+\-=<>?{}\[\]|\\/]/;
export const upperCaseSymbols = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
export const lowerCaseSymbols = /[abcdefghijklmnopqrstuvwxyz]/;
export const nums = /[1234567890]/;
// export const urlValidationRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
export const team: IMember[] = [
  {
    name: 'Dmitry Khoroshkin',
    git: 'https://github.com/DDD-fx',
    discription: 'Team lead, front-end web developer',
    img: '../../../../assets/img/dima.png',
  },
  {
    name: 'Smirnova Aleksandra',
    git: 'https://github.com/alexsmirnova13',
    discription: 'Team member, front-end web developer',
    img: '../../../../assets/img/sasha.png',
  },
  {
    name: 'Iryna Kolhanova',
    git: 'https://github.com/IrynaKolh',
    discription: 'Team member, front-end web developer',
    img: '../../../../assets/img/ira.png',
  },
];
