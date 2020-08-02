// Static Local Host
const staticApiEndPoint = "http://localhost:9000";

// End Point to Access the Teams
export const teamsUrl = `${staticApiEndPoint}/routes/teams`;

// End Point to Access the SuperHeroes
export const superheroesUrl = `${staticApiEndPoint}/routes/superheroes`;

// End Point to Remove Superhero from a Team
export const removeSuperheroUrl = `${teamsUrl}/removeSuperhero`;

// End Point to Add Superhero to a Team
export const addToTeamUrl = `${superheroesUrl}/addTeam`