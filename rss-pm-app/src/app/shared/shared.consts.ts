import { IMember } from '../welcome/models/welcome.models';

export const specialSymbols = /[!@#$%^&*()_+\-=<>?{}\[\]|\\/]/;
export const upperCaseSymbols = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
export const lowerCaseSymbols = /[abcdefghijklmnopqrstuvwxyz]/;
export const nums = /[1234567890]/;
// export const urlValidationRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
export const team: IMember[] = [
  {
    name: 'd',
    git: 'https://github.com/DDD-fx',
    description: 'd',
    img: 'dima.png',
  },
  {
    name: 'a',
    git: 'https://github.com/alexsmirnova13',
    description: 'a',
    img: 'sasha.png',
  },
  {
    name: 'i',
    git: 'https://github.com/IrynaKolh',
    description: 'i',
    img: 'ira.png',
  },
].map((member: IMember) => {
  const assetsPath: string = '../../../../assets/img/';
  return {
    ...member,
    img: `${assetsPath}${member.img}`,
    description: `welcome.memberDescription.${member.description}`,
    name: `footer.names.${member.name}`,
  };
});
