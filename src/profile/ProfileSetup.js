import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import myInitObject from "../ApiUrl/url";
import UserContext from "../Context/ContextApi";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  let nav = useNavigate();
  const context = useContext(UserContext);
  const [profileDetails, setProfileDetails] = useState([]);
  const [actionAttribute, setActionAttribute] = useState({
    Attribute: "",
    id: null,
  });
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState();
  const [sendFile, setSendFile] = useState({ file: null });
  const [deleteitem, setDeleteitem] = useState(false);

  const projectName = useRef("");
  const projectDetails = useRef("");
  const aboutSummary = useRef("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(myInitObject.homeURL + `/myprofile`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("TOKEN")
            )}`,
          },
        });

        if (res.status === 200) {
          let data = await res.data;
          aboutSummary.current.value = data.about;
          setLinks({ links: [...data.socialLinks] });
          setSkills({ skills: [...data.skills] });
          setProjects({ projects: [...data.projects] });
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const [skills, setSkills] = useState({
    skills: [],
  });

  const [links, setLinks] = useState({
    links: [],
  });

  const [projects, setProjects] = useState({
    projects: [],
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if( sendFile.file.size >100000 ){
      setMessage("Size of file should be less then 1MB")
      return
    }
    if (skills.skills.length === 0 || !skills.skills) {
      setMessage("Put atleast One skill");
      return;
    }
    if (links.links.length === 0 || !links.links) {
      setMessage("Put atleast one link");
      return;
    }
    if (projects.projects.length === 0 || !projects.projects) {
      setMessage("Put atleast One poject");
      return;
    }
    if (
      aboutSummary.current.value.trim().length === 0 ||
      !aboutSummary.current.value
    ) {
      setMessage("Profile summary is neccessary");
      return;
    }

    let data = new FormData();

    data.append("skills", skills.skills);
    data.append("projects", projects.projects);
    data.append("socialLinks", links.links);
    data.append("file", sendFile.file);
    data.append("about", aboutSummary.current.value.trim());

    try {
      let res = await axios.put(
        myInitObject.homeURL + "/create/" + `${context.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("TOKEN")
            )}`,
          },
        }
      );
      nav("/myprofile");
      return;
    } catch (error) {}
  };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };
  const dataHandler = async (data, id) => {
    if (data === "skills") {
      let arr = skills.skills;
      arr.splice(id, 1);
      setSkills({ skills: [...arr] });
    }
    if (data === "projects") {
      let arr = projects.projects;
      arr.splice(id, 1);
      setProjects({ projects: [...arr] });
    }
    if (data === "links") {
      let arr = links.links;
      arr.splice(id, 1);
      setLinks({ links: [...arr] });
    }
    return;
  };

  const openModel = (attribute, id) => {
    setActionAttribute({ Attribute: attribute, id: id });
    setDeleteitem(true);
  };

  const performDeleteOrNot = (action) => {
    setDeleteitem(false);
    if (action) {
      dataHandler(actionAttribute.Attribute, actionAttribute.id);
      setActionAttribute({ Attribute: "", id: null });
    }
    return;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const saveProject = () => {
    let name = projectName.current.value;
    let details = projectDetails.current.value;

    if (
      name === null ||
      details.trim().length === 0 ||
      details === null ||
      name.trim().length === 0
    ) {
      setMessage("Project name and project details can't be empty");
    } else if (name.length > 50) {
      setMessage("Project name should not exceed the length 50");
    } else if (details.length > 300) {
      setMessage("Project details should not exceed the length 300");
    } else {
      projectDetails.current.value = "";
      projectName.current.value = "";
      setProjects({ projects: [...projects.projects, name + "/*/" + details] });
    }
    return;
  };

  const handleChange = (e) => {
    let image = e.target.files[0];
    if (image === null) return;
    if (image.type === "image/jpeg" || image.type === "image/png") {
      setSendFile({ file: image });
      setFile(URL.createObjectURL(image));
    } else {
      setMessage("Upload only Jpeg / png only");
      e.target.value = null;
    }
    return;
  };

  return (
    <form className="m-8 ">
      {message != null && (
        <div
          id="toast-warning"
          className="flex  fixed mb-3 place-items-center  items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-warning"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm  text-gray-900 dark:text-gray-300 font-black"
        >
          Profile Summmary
        </label>
        <input
          type="text"
          ref={aboutSummary}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Hi, i'm a  ....."
          required
        />
      </div>
      <div className="flex flex-wrap">
        {skills.skills?.map((skill, id) => {
          return (
            <div
              key={id}
              id="toast-default"
              className="flex items-center m-2 w-auto break-all p-4 text-gray-300 bg-gray-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="ml-3 pr-1  text-black font-black font-weight">
                {skill}
              </div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text- rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={() => {
                  dataHandler("skills", id);
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm  text-gray-900 dark:text-gray-300 font-black"
        >
          Skills
        </label>
        <input
          type="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Java Enter c++ enter so on"
          onKeyPress={(e) => {
            if (e.target.value.length > 20) {
              setMessage("skill length should be less then 20");
              return;
            }
            if (e.key === "Enter") {
              if (e.target.value.trim().length === 0) {
                setMessage("skill can't be empty");
                return;
              }
              setSkills({
                skills: [...skills.skills, e.target.value],
              });
              e.target.value = null;
            }
          }}
          required
        />
      </div>

      <div>
        <div className="flex flex-wrap">
          {projects.projects?.map((perproject, id) => {
            let x = perproject.split("/*/");
            return (
              <div
                key={id}
                id="toast-default"
                className="flex items-center m-2 w-auto break-words p-4 text-gray-300 bg-gray-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div className="ml-3 pr-1  text-black font-black font-weight">
                  Project Name
                  <hr />
                  {x[0]}
                  <hr />
                  Project details
                  <hr />
                  {x[1]}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      projectName.current.value != "" ||
                      projectDetails.current.value != ""
                    ) {
                      if (
                        !window.confirm(
                          "We recommend to first submit current project and then edit clicking ok will delete the ongoing project"
                        )
                      )
                        return;
                    }
                    projectName.current.value = x[0];
                    projectDetails.current.value = x[1];
                    dataHandler("projects", id);
                  }}
                  className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-gray-400 rounded-full focus:shadow-outline hover:bg-gray-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text- rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-default"
                  aria-label="Close"
                  onClick={() => {
                    openModel("projects", id);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <label
            htmlFor="project name"
            className="block mb-2 text-sm  text-gray-900 dark:text-gray-300 font-black"
          >
            Projects
          </label>
        </div>
        <input
          type="text"
          ref={projectName}
          id="projects"
          placeholder="Project Name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
        <textarea
          id="message"
          ref={projectDetails}
          rows="6"
          className="block mt-2 p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Project Detail..."
        ></textarea>
      </div>
      <button
        type="button"
        onClick={saveProject}
        className="bg-white mt-1 hover:bg-gray-100 text-gray-800 mb-10 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Add
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>

      <div className="flex flex-wrap">
        {links.links?.map((link, id) => {
          return (
            <div
              key={id}
              id="toast-default"
              className="flex items-center m-2 w-auto break-words p-4 text-gray-300 bg-gray-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="ml-3 pr-1  text-black font-black font-weight">
                {link}
              </div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text- rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
                onClick={() => {
                  openModel("links", id);
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <div className="mb-6">
        <label
          htmlFor="links"
          className="block mb-2 text-sm font-black text-gray-900 dark:text-gray-300"
        >
          Social Links
        </label>
        <input
          //   value={profiledata.links}
          type="url"
          id="links"
          placeholder="first link then enter then second link"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onKeyPress={(e) => {
            if (e.target.value.length > 100) {
              setMessage("skill length should be less then 60");
              return;
            }
            if (e.key === "Enter") {
              if (!isValidUrl(e.target.value)) {
                setMessage("Enter a valid URL");
                return;
              }
              setLinks({
                links: [...links.links, e.target.value],
              });
              e.target.value = null;
            }
          }}
        />
      </div>
      <div className="mb-6">
        <div className="mb-3 w-96 flex">
          <label
            htmlFor="formFile"
            className="form-label  block mb-2 text-sm font-black text-gray-900 dark:text-gray-300"
          >
            Profile photo
          </label>
          <input
            className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
            onChange={handleChange}
          />
          {file != null && (
            <div className="mb-4">
              <img
                src={file}
                className="max-w-full h-auto rounded-lg ml-2"
                alt="your photo"
              />
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={submitHandler}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update Profile
      </button>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={
          (deleteitem ? "none " : "invisible ") +
          "self-center overflow-y-auto overflow-x-hidden  fixed  m-20 top-0 right-0 left-0  md:inset-0 h-modal md:h-full"
        }
      >
        {/* {console.log(deleteitem)}
        {deleteitem  && */}
        <div className="relative p-8 m-auto w-full max-w-md h-full md:h-auto">
          <div className="relative bg-zinc-600 rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={() => {
                performDeleteOrNot(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
                Are you sure you want to delete this ?
              </h3>
              <button
                onClick={() => {
                  performDeleteOrNot(true);
                }}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => {
                  performDeleteOrNot(false);
                }}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
        {/* } */}
      </div>
    </form>
  );
};

export default ProfileSetup;
