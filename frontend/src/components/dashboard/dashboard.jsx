// React
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  teamsUrl,
  superheroesUrl,
  removeSuperheroUrl,
  addToTeamUrl,
} from "../../configs/apiEndPoints";

// Styles
import "./dashboard.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import Card from "../card/card";
import Modal from "../modal/modal";
import Button from "../button/button";
import Textbox from "../textbox/textbox";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [superheroes, setSuperheroes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [superheroName, setSuperheroName] = useState("");
  const [teamAlignment, setTeamAlignment] = useState("");
  const [superheroesAlignment, setSuperheroesAlignment] = useState("");
  const [showCreateTeamSection, setShowCreateTeamSection] = useState(false);
  const [showCreateSuperheroSection, setShowCreateSuperheroSection] = useState(
    false
  );
  const [showAddSuperheroSection, setShowAddSuperheroSection] = useState(false);
  const [showRemoveSuperheroSection, setShowRemoveSuperheroSection] = useState(
    false
  );
  const [addTeamName, setAddTeamName] = useState("");
  const [removeSuperheroName, setRemoveSuperheroName] = useState("");

  const clearTextFields = () => {
    setTeamName("");
    setSuperheroName("");
    setTeamAlignment("");
    setSuperheroesAlignment("");
    setAddTeamName("");
    setRemoveSuperheroName("");
  };

  const getTeamsData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: teamsUrl,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      setTeams(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getSuperheroData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: superheroesUrl,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      setSuperheroes(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTeamsData();
    getSuperheroData();
  }, []);

  const handleCardClick = async (id, url) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${url}/${id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      setModalData(data);
    } catch (e) {
      console.error(e);
    }
    setModalIsOpen(true);
  };

  const handleTextboxChange = (value, setter) => {
    setter(value);
  };

  const handleSuperheroTeamFunctionality = async (
    superheroName,
    teamName,
    url
  ) => {
    await axios({
      method: "put",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      data: {
        superheroName: superheroName,
        teamName: teamName,
      },
    })
      .then(function (response) {
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getTeamsData();
        getSuperheroData();
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.message) {
            toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (error.response.data.error)
            toast.error(error.response.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
      });
    clearTextFields();
    setShowAddSuperheroSection(false);
    onModalClose();
  };

  const handleCreate = async (name, teamAlignment, superheroAlignment, url) => {
    let apiData;

    if (teamAlignment) {
      apiData = {
        name: name,
        meanAlignment: teamAlignment,
      };
    } else if (superheroAlignment) {
      apiData = {
        name: name,
        alignment: superheroAlignment,
      };
    } else {
      apiData = {
        name: name,
      };
    }

    await axios({
      method: "post",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      data: apiData,
    })
      .then(function (response) {
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getTeamsData();
        getSuperheroData();
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.message) {
            toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (error.response.data.error)
            toast.error(error.response.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
      });
    clearTextFields();
    setShowCreateTeamSection(false);
    setShowCreateSuperheroSection(false);
  };

  const getTeamDetails = () => {
    const data = teams.map((item) => {
      const { id, name, meanAlignment, superheroes } = item;

      const superheroesIds = superheroes.map((ids, index) => {
        if (superheroes.length - 1 === index) {
          return `${ids}`;
        }
        return `${ids},`;
      });

      return (
        <Card
          key={`${id} ${name}`}
          onClick={() => handleCardClick(id, teamsUrl)}
        >
          <span>Team Name: {name}</span>
          <span>Team Alignment: {meanAlignment}</span>
          <span>Superhero in the Team: {superheroesIds}</span>
        </Card>
      );
    });

    return (
      <>
        <div className="libera-project-dashboard-title">
          <h3>Team Details</h3>
          <Button handleClick={() => setShowCreateTeamSection(true)}>
            Create Team
          </Button>
        </div>
        {showCreateTeamSection && (
          <div className="libera-project-dashboard-createteam">
            <p className="team-name">Team Name</p>
            <Textbox
              placeHolder="Please enter the Team Name"
              canClear
              isRequired
              ariaLabel="Team Name"
              handleChange={(e) =>
                handleTextboxChange(e.target.value, setTeamName)
              }
            />

            <p className="team-alignment">Alignment (Good, Bad or Neutral)</p>
            <Textbox
              placeHolder="You can select Good, Bad, Neutral however it will be calculated based on the superheroes"
              canClear
              ariaLabel="Alignment"
              handleChange={(e) =>
                handleTextboxChange(e.target.value, setTeamAlignment)
              }
            />

            <Button
              handleClick={() =>
                handleCreate(teamName, teamAlignment, null, teamsUrl)
              }
            >
              Create!
            </Button>
          </div>
        )}
        <div className="libera-project-dashboard-teams">{data}</div>
      </>
    );
  };

  const getSuperheroDetails = () => {
    const data = superheroes.map((item) => {
      const { id, name, alignment, teams } = item;

      const teamIds = teams.map((ids, index) => {
        if (teams.length - 1 === index) {
          return `${ids}`;
        }
        return `${ids},`;
      });

      return (
        <Card
          key={`${id} ${name}`}
          classname="card-component-background-3"
          onClick={() => handleCardClick(id, superheroesUrl)}
        >
          <span>Superhero Name: {name}</span>
          <span>Superhero Alignment: {alignment}</span>
          <span>Member of Teams: {teamIds}</span>
        </Card>
      );
    });
    return (
      <>
        <div className="libera-project-dashboard-title">
          <h3>Superhero Details</h3>
          <Button handleClick={() => setShowCreateSuperheroSection(true)}>
            Create Superhero
          </Button>
        </div>
        {showCreateSuperheroSection && (
          <div className="libera-project-dashboard-createteam">
            <p className="team-name">Superhero Name</p>
            <Textbox
              placeHolder="Please enter the Superhero Name"
              canClear
              isRequired
              ariaLabel="Superhero Name"
              handleChange={(e) =>
                handleTextboxChange(e.target.value, setSuperheroName)
              }
            />

            <p className="team-alignment">Alignment (Good, Bad or Neutral)</p>
            <Textbox
              placeHolder="Please enter the Alignment"
              isRequired
              ariaLabel="Alignment"
              handleChange={(e) =>
                handleTextboxChange(e.target.value, setSuperheroesAlignment)
              }
            />

            <Button
              handleClick={() =>
                handleCreate(
                  superheroName,
                  null,
                  superheroesAlignment,
                  superheroesUrl
                )
              }
            >
              Create!
            </Button>
          </div>
        )}
        <div className="libera-project-dashboard-superhero">{data}</div>
      </>
    );
  };

  const onModalClose = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id, url) => {
    await axios({
      method: "delete",
      url: `${url}/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
      .then(function (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getTeamsData();
        getSuperheroData();
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    clearTextFields();
    setModalIsOpen(false);
  };

  const details = () => {
    const data = modalData.map((item) => {
      if (item.superheroes) {
        const { id, name, meanAlignment, superheroes } = item;
        const superheroIds = superheroes.map((ids, index) => {
          if (superheroes.length - 1 === index) {
            return `${ids}`;
          }
          return `${ids},`;
        });

        return (
          <>
            <h3>Team Details</h3>
            <ul key={`${id} ${name}`}>
              <li>Team ID: {id}</li>
              <li>Team Name: {name}</li>
              <li>Team Alignment: {meanAlignment}</li>
              <li>Superhero in the Team: {superheroIds}</li>
            </ul>
            {showRemoveSuperheroSection && (
              <div className="add-to-team">
                <p className="team-name">Superhero Name</p>
                <Textbox
                  className="add-team-name"
                  placeHolder="Please enter the Superhero Name"
                  canClear
                  isRequired
                  ariaLabel="Superhero Name"
                  handleChange={(e) =>
                    handleTextboxChange(e.target.value, setRemoveSuperheroName)
                  }
                />
                <Button
                  classname="add-team-name"
                  handleClick={() =>
                    handleSuperheroTeamFunctionality(
                      removeSuperheroName,
                      name,
                      removeSuperheroUrl
                    )
                  }
                >
                  Submit
                </Button>
              </div>
            )}
            <div className="superhero-button-container">
              <Button
                classname="button-red"
                handleClick={() =>
                  setShowRemoveSuperheroSection(!showAddSuperheroSection)
                }
              >
                Delete a Superhero from Team
              </Button>
              <Button
                classname="button-red"
                handleClick={() => handleDelete(id, teamsUrl)}
              >
                Delete Team
              </Button>
            </div>
          </>
        );
      }

      const { id, name, alignment, teams } = item;
      const teamIds = teams.map((ids, index) => {
        if (teams.length - 1 === index) {
          return `${ids}`;
        }
        return `${ids},`;
      });

      return (
        <>
          <h3>Superhero Details</h3>
          <ul key={`${id} ${name}`}>
            <li>Superhero ID: {id}</li>
            <li>Superhero Name: {name}</li>
            <li>Superhero Alignment: {alignment}</li>
            <li>Member of Teams: {teamIds}</li>
          </ul>
          {showAddSuperheroSection && (
            <div className="add-to-team">
              <p className="team-name">Team Name</p>
              <Textbox
                className="add-team-name"
                placeHolder="Please enter the Team Name"
                canClear
                isRequired
                ariaLabel="Team Name"
                handleChange={(e) =>
                  handleTextboxChange(e.target.value, setAddTeamName)
                }
              />
              <Button
                classname="add-team-name"
                handleClick={() =>
                  handleSuperheroTeamFunctionality(
                    name,
                    addTeamName,
                    addToTeamUrl
                  )
                }
              >
                Submit
              </Button>
            </div>
          )}
          <div className="superhero-button-container">
            <Button
              handleClick={() =>
                setShowAddSuperheroSection(!showAddSuperheroSection)
              }
            >
              Add to a Team
            </Button>
            <Button
              classname="button-red"
              handleClick={() => handleDelete(id, superheroesUrl)}
            >
              Delete Superhero
            </Button>
          </div>
        </>
      );
    });
    return data;
  };

  return (
    <>
      <div className="libera-project-dashboard">
        {teams.length ? getTeamDetails() : "No Team Data Found"}
        {superheroes.length ? getSuperheroDetails() : "No Superhero Data Found"}
      </div>
      <Modal showModal={modalIsOpen} onClose={onModalClose} size="small">
        <div className="libera-project-dashboard-modal-body modal-body">
          {details()}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
