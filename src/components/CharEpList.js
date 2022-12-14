// Component to display the names of episodes the character appeared in

import React, { useEffect, useState } from 'react';

export const CharEpList = (props) => {
  // State to store the episode names to be displayed in the pop up card
  const [episodes, setEpisodes] = useState([]);
  // State to store the episode data passed from the parent component (API url of each episode)
  const epList = [props.episodes];

  // Function to toggle episode info pop up visibility status
  const handleClose = () => {
    props.setShowEpisodes(false);
    setEpisodes([]);
  };

  // Function to fetch episode name with each episode number passed as prop
  const fetchEpisodeNames = async (temp) => {
    await fetch(`https://rickandmortyapi.com/api/episode/${temp}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisodes((episodes) => [...episodes, data.name]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect to fetch episode name from API url of each episode
  useEffect(() => {
    epList[0].forEach((ep) => {
      // Getting only the episode number from the end of the url
      let temp = ep.split('/')[ep.split('/').length - 1];
      fetchEpisodeNames(temp);
    });
    // eslint-disable-next-line
  }, [props.showEpisodes]);

  return (
    <div
      style={{ zIndex: 60 }}
      className="fixed top-0 left-0 w-screen h-screen flex-col flex items-center justify-center">
      <div
        onClick={handleClose}
        className="fixed w-screen min-h-screen bg-black opacity-60 top-0 left-0"></div>
      <div
        style={{ zIndex: 70 }}
        className="bg-silver md:w-2/5 w-10/12 border-darkTahiti border-2 overflow-auto h-4/5 top-1/5 shadow-2xl rounded-sm">
        <div className="flex flex-col z-50 overflow-hidden items-center text-center">
          <h1 className="relative bg-black flex justify-center items-center w-full flex-none py-2 text-2xl font-bold md:font-semibold text-white">
            Episodes Featured In
          </h1>
          <div className="flex flex-col w-full overflow-auto">
            {episodes.map((ep, index) => {
              return (
                <div key={index} className="flex flex-row justify-start md:pl-4 px-2 w-full">
                  <h1 className="relative flex-none py-2">{ep}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={handleClose}
        style={{ zIndex: 70 }}
        className="px-4 mt-5 h-8 flex justify-center items-center uppercase font-bold md:font-semibold tracking-wider border-2 border-black bg-tahiti hover:bg-white transition-all text-black">
        Close
      </button>
    </div>
  );
};
