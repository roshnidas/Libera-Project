// Imports
const Enum = require("enum");
const { v4: uuidv4 } = require("uuid");
const { celebrate } = require("celebrate");
const express = require("express");
const superheroSchema = require("../model/superhero");
const superheroTeamSchema = require("../model/superheroTeam");
const teamSchema = require("../model/team");
let teams = require("../configs/teams").teamData;
let superheroes = require("../configs/superheroes").superheroData;

const router = express.Router();
const alignment = new Enum(["GOOD", "BAD", "NEUTRAL"], { separator: " | " });

/**
 * @async
 * @description method to set team name key value pair for easy retrieval
 * @returns teamNameIDMapping
 */
let teamNameIDMapping;
const setTeamNameIDMapping = () => {
  teamNameIDMapping = Object.fromEntries(
    teams.map((item) => {
      return [item.id, item.name];
    })
  );
};

/**
 * @async
 * @description method to set superhero name key value pair for easy retrieval
 * @returns superheroNameIDMapping
 */
let superheroNameIDMapping;
const setSuperheroNameIDMapping = () => {
  superheroNameIDMapping = Object.fromEntries(
    superheroes.map((item) => {
      return [item.id, item.name];
    })
  );
};

/**
 * @description method to set mean alignment for team
 * @param {object} teamsData
 * @returns none
 */
const setMeanAlignment = (teamsData) => {
  let countForGood = 0;
  let countForBad = 0;
  let countForNeutral = 0;
  teamsData.superheroes.forEach((item) => {
    superheroes.forEach((innerItem) => {
      if (innerItem.id === item) {
        if (innerItem.alignment === alignment.GOOD.key) {
          countForGood++;
        } else if (innerItem.alignment === alignment.BAD.key) {
          countForBad++;
        } else if (innerItem.alignment === alignment.NEUTRAL.key) {
          countForNeutral++;
        }
      }
    });
  });
  if (countForGood > countForBad) {
    teamsData.meanAlignment = alignment.GOOD;
  } else if (countForGood < countForBad) {
    teamsData.meanAlignment = alignment.BAD;
  } else {
    teamsData.meanAlignment = alignment.NEUTRAL;
  }
};

/**
 * @async
 * @description route to get list of superheroes
 * @param {json} request
 * @param {json} response
 * @returns {json} response - superhero list
 */
router.get("/superheroes", async function (request, response) {
  setTeamNameIDMapping();
  const data = await superheroes.map((item) => {
    const teamNames = item.teams.map((innerItem) => {
      return teamNameIDMapping[innerItem];
    });
    return {
      id: item.id,
      name: item.name,
      alignment: item.alignment,
      teams: teamNames,
    };
  });
  response.json(data);
});

/**
 * @async
 * @description route to get list of teams
 * @param {json} request
 * @param {json} response
 * @returns {json} response - teams list
 */
router.get("/teams", async function (request, response) {
  setSuperheroNameIDMapping();
  const data = await teams.map((item) => {
    const superheroNames = item.superheroes.map((innerItem) => {
      return superheroNameIDMapping[innerItem];
    });
    return {
      id: item.id,
      name: item.name,
      meanAlignment: item.meanAlignment,
      superheroes: superheroNames,
    };
  });
  response.json(data);
});

/**
 * @async
 * @description route to get details of a superhero based on id
 * @param {json} request
 * @param {json} response
 * @returns {json} response - superhero details
 */
router.get("/superheroes/:id", async function (request, response) {
  let idFromUrl = request.params.id;
  setTeamNameIDMapping();
  let superheroData = superheroes.filter((el) => el.id === idFromUrl);
  if (superheroData.length) {
    const data = await superheroData.map((item) => {
      const teamNames = item.teams.map((innerItem) => {
        return teamNameIDMapping[innerItem];
      });
      return {
        id: item.id,
        name: item.name,
        alignment: item.alignment,
        teams: teamNames,
      };
    });
    response.send(data);
  } else {
    response.status(404).json({
      message: "Not found",
    });
  }
});

/**
 * @async
 * @description route to get a team based on id
 * @param {json} request
 * @param {json} response
 * @returns {json} response - teams details
 */
router.get("/teams/:id", async function (request, response) {
  const idFromUrl = request.params.id;
  setSuperheroNameIDMapping();
  let teamDetails = teams.filter((el) => el.id === idFromUrl);
  if (teamDetails.length) {
    const data = await teamDetails.map(item => {
      const superheroNames = item.superheroes.map((innerItem) => {
        return superheroNameIDMapping[innerItem];
      });
      return {
        id: item.id,
        name: item.name,
        meanAlignment: item.meanAlignment,
        superheroes: superheroNames,
      };
    });
    response.send(data);
  } else {
    response.status(404).json({
      message: "Not found",
    });
  }
});

/**
 * @async
 * @description route to create a superhero
 * @param {json} superheroSchema
 * @param {json} request
 * @param {json} response
 * @returns {json} response - Success message
 */
router.post(
  "/superheroes",
  celebrate(superheroSchema),
  async (request, response) => {
    let newSuperhero = request.body;
    let duplicates = superheroes.find(
      (item) => item.name === newSuperhero.name
    );
    if (!duplicates) {
      try {
        superheroes = [
          ...superheroes,
          {
            ...newSuperhero,
            id: uuidv4(),
            teams: [],
          },
        ];
      } catch (e) {
        response.json({
          message: e.message,
        });
      }
      response.json({
        message: "Superhero was successfully created!",
      });
    } else {
      response.status(500).json({
        message: "Duplicate values exist",
      });
    }
  }
);

/**
 * @async
 * @description route to create a new team
 * @param {json} teamSchema
 * @param {json} request
 * @param {json} response
 * @returns {json} response - Success message
 */
router.post("/teams", celebrate(teamSchema), async (request, response) => {
  const newTeam = request.body;
  let duplicates = teams.find((item) => item.name === newTeam.name);
  if (!duplicates) {
    teams = [
      ...teams,
      {
        ...newTeam,
        id: uuidv4(),
        superheroes: [],
      },
    ];
    response.json({
      message: "Team was successfully created!",
    });
  } else {
    response.status(500).json({
      message: "Duplicate values exist",
    });
  }
});

/**
 * @async
 * @description route to add team to a superhero
 * @param {json} superheroTeamSchema
 * @param {json} request
 * @param {json} response
 * @returns {json} response - Success message
 */
router.put(
  "/superheroes/addTeam",
  celebrate(superheroTeamSchema),
  async (request, response) => {
    const superheroTeamDetails = request.body;
    try {
      let superheroData = superheroes.find(
        (item) => item.name === superheroTeamDetails.superheroName
      );
      let teamDetails = teams.find(
        (item) => item.name === superheroTeamDetails.teamName
      );
      if (superheroData && teamDetails) {
        let superheroId = teamDetails.superheroes.find(
          (item) => item === superheroData.id
        );
        let teamId = superheroData.teams.find(
          (item) => item === teamDetails.id
        );
        if (superheroId && teamId) {
          response.status(500).json({ message: "Already exists" });
          return;
        } else {
          let teamIndex = teams.findIndex((item) => item.id === teamDetails.id);
          let superheroIndex = superheroes.findIndex(
            (item) => item.id === superheroData.id
          );

          teams[teamIndex].superheroes = [
            ...teams[teamIndex].superheroes,
            superheroData.id,
          ];

          superheroes[superheroIndex].teams = [
            ...superheroes[superheroIndex].teams,
            teamDetails.id,
          ];
          setMeanAlignment(teams[teamIndex]);
          response.json("Success");
        }
      } else {
        response.status(500).json({
          message: "Enter valid data",
        });
      }
    } catch (e) {
      response.status(500).json({
        message: e.message,
      });
    }
  }
);

/**
 * @async
 * @description route to delete a superhero
 * @param {json} request
 * @param {json} response
 * @returns {json} response - Success message
 */
router.delete("/superheroes/:id", async (request, response) => {
  const superheroId = request.params.id;
  try {
    let superheroData = superheroes.filter((item) => item.id === superheroId);
    if (superheroData.length) {
      teams.forEach((item) => {
        item.superheroes.forEach((innerItem, index) => {
          if (innerItem === superheroId) {
            item.superheroes.splice(index, 1);
          }
        });
      });
      let superheroIndex = superheroes.findIndex(
        (item) => item.id === superheroId
      );
      superheroes.splice(superheroIndex, 1);
      response.json({
        message: "Superhero has been deleted!",
      });
    } else {
      response.status(500).json({
        message: "Please enter a valid ID",
      });
    }
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

/**
 * @async
 * @description route to remove superhero from a team
 * @param {json} superheroTeamSchema
 * @param {json} request
 * @param {json} response
 * @returns {json} response - Success message
 */
router.put(
  "/teams/removeSuperhero",
  celebrate(superheroTeamSchema),
  async (request, response) => {
    const superheroTeamDetails = request.body;
    try {
      let superheroData = superheroes.find(
        (item) => item.name === superheroTeamDetails.superheroName
      );
      let teamDetails = teams.find(
        (item) => item.name === superheroTeamDetails.teamName
      );
      if (superheroData && teamDetails) {
        let superheroId = teamDetails.superheroes.find(
          (item) => item === superheroData.id
        );
        let teamId = superheroData.teams.find(
          (item) => item === teamDetails.id
        );
        if (superheroId && teamId) {
          teams.forEach((item) => {
            if (item.id === teamId) {
              item.superheroes.forEach((innerItem, index) => {
                if (innerItem === superheroId) {
                  item.superheroes.splice(index, 1);
                }
              });
            }
          });
          superheroes.forEach((item) => {
            if (item.id === superheroId) {
              item.teams.forEach((innerItem, index) => {
                if (innerItem === teamId) {
                  item.teams.splice(index, 1);
                }
              });
            }
          });
          setMeanAlignment(teamDetails);
          response.json({
            message: "Superhero was deleted from team",
          });
        } else {
          response.status(500).json({
            message: "Deletion Failed, Please check the ID",
          });
        }
      } else {
        response.status(500).json({
          message: "Please enter the valid ID",
        });
      }
    } catch (e) {
      response.status(500).json({
        message: e.message,
      });
    }
  }
);

/**
 * @async
 * @description route to delete a team
 * @param {json} request
 * @param {json} response
 * @returns {json} response - Success message
 */
router.delete("/teams/:id", async (request, response) => {
  const teamId = request.params.id;
  try {
    let teamDetails = teams.filter((item) => item.id === teamId);
    if (teamDetails.length) {
      if (teamDetails[0].superheroes.length) {
        response.status(500).json({
          message:
            "Please delete superheroes from this team before deleting the team",
        });
      } else {
        superheroes.forEach((item) => {
          item.teams.forEach((innerItem, index) => {
            if (innerItem === teamId) {
              item.superheroes.splice(index, 1);
            }
          });
        });
        let teamIndex = teams.findIndex((item) => item.id === teamId);
        teams.splice(teamIndex, 1);
        response.json({
          message: "Team has been deleted Successfully!",
        });
      }
    } else {
      response.status(500).json({
        message: "Please enter a valid id",
      });
    }
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
  }
});

module.exports = router;
