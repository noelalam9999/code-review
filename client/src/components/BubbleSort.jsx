import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Incompleted from "./Incompleted";
import Completed from "./completed";
import {
  updateItems,
  updateTotalItems,
} from "../features/bubbleSort/bubbleSortSlice";
import BubbleSortNode from "./BubbleSortNode";

const BubbleSort = () => {
  const [isTutorialText, setIsTutorialText] = useState(false);
  const [isTutorialVideo, setIsTutorialVideo] = useState(false);

  const items = useSelector((state) => state.bubbleSort.items);
  const totalItems = useSelector((state) => state.bubbleSort.totalItems);

  const userData = useSelector((state) => state.authentication.userData);
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const currentDs = useSelector((state) => state.dsAndAlgo.currentDs);

  const dispatch = useDispatch();

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function createItems(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const itemCount = parseInt(formJson.itemCount, 10);
    const newItems = Array(itemCount).fill(0);
    for (let i = 0; i < itemCount; i++)
      newItems[i] = getRandomArbitrary(1, 100);
    dispatch(updateTotalItems(itemCount));
    dispatch(updateItems(newItems));
  }

  return (
    <div className="bubbleSort">
      <Header />

      {isTutorialText && (
        <div className="tutorialText">
          <button
            className="button skipTutorial"
            onClick={() => setIsTutorialText(false)}
          >
            Skip Tutorial
          </button>
          <div className="tutorialText__text">
            Let the node at which we are starting be called the initial node.
            Let the distance of node Y be the distance from the initial node to
            Y. Dijkstra's algorithm will initially start with infinite distances
            and will try to improve them step by step. <br />
            <br />
            1. Mark all nodes unvisited. Create a set of all the unvisited nodes
            called the unvisited set. <br />
            <br />
            2. Assign to every node a tentative distance value: set it to zero
            for our initial node and to infinity for all other nodes. During the
            run of the algorithm, the tentative distance of a node v is the
            length of the shortest path discovered so far between the node v and
            the starting node. Since initially no path is known to any other
            vertex than the source itself (which is a path of length zero), all
            other tentative distances are initially set to infinity. Set the
            initial node as current. <br />
            <br />
            3. For the current node, consider all of its unvisited neighbors and
            calculate their tentative distances through the current node.
            Compare the newly calculated tentative distance to the one currently
            assigned to the neighbor and assign it the smaller one. For example,
            if the current node A is marked with a distance of 6, and the edge
            connecting it with a neighbor B has length 2, then the distance to B
            through A will be 6 + 2 = 8. If B was previously marked with a
            distance greater than 8 then change it to 8. Otherwise, the current
            value will be kept. <br />
            <br />
            4. When we are done considering all of the unvisited neighbors of
            the current node, mark the current node as visited and remove it
            from the unvisited set. A visited node will never be checked again
            (this is valid and optimal in connection with the behavior in step
            6.: that the next nodes to visit will always be in the order of
            'smallest distance from initial node first' so any visits after
            would have a greater distance). <br />
            <br />
            5. If the destination node has been marked visited (when planning a
            route between two specific nodes) or if the smallest tentative
            distance among the nodes in the unvisited set is infinity (when
            planning a complete traversal; occurs when there is no connection
            between the initial node and remaining unvisited nodes), then stop.
            The algorithm has finished. <br />
            <br />
            6. Otherwise, select the unvisited node that is marked with the
            smallest tentative distance, set it as the new current node, and go
            back to step 3.
          </div>
        </div>
      )}

      {isTutorialVideo && (
        <div className="tutorialVideo">
          {/* <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY">
      </iframe> */}
          <button
            className="button skipTutorial"
            onClick={() => setIsTutorialVideo(false)}
          >
            Skip Tutorial Video
          </button>
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/embed/EFg3u_E6eHU"
            title="How Dijkstra&#39;s Algorithm Works"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
            allowfullscreen
          ></iframe>
        </div>
      )}

      {!isTutorialText && !isTutorialVideo && (
        <div className="visualize">
          <div className="stageAndInfo">
            <div className="info container">
              <h1 className="title">Bubble Sort Algorithm</h1>
              <button
                className="button button-outline"
                onClick={() => setIsTutorialText(true)}
              >
                <div className="button-text">Show Tutorial</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
              <button
                className="button button-outline"
                onClick={() => setIsTutorialVideo(true)}
              >
                <div className="button-text">Play Tutorial Video</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-play-circle icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                </svg>
              </button>
            </div>
            <div className="bubbleSortStage">
              <div className="bubbleNodes">
                {items.map((item, idx) => {
                  return <BubbleSortNode value={item} idx={idx} />;
                })}
              </div>
            </div>
          </div>
          <div className="configurator">
            {/* <button className='button' onClick={() => setIsTutorialText(true)}>Show Tutorial</button>
        <button className='button' onClick={() => setIsTutorialVideo(true)}>Play Tutorial Video</button> */}

            <form className="createBubbleSortForm" onSubmit={createItems}>
              <label className="formlabel">Item Count</label>
              <input
                type="number"
                placeholder="Item Count"
                min="2"
                max="30"
                name="itemCount"
              />

              <button type="submit" className="button">
                Create List
              </button>
            </form>

            {isAuthenticated && currentDs && (
              <div className="completed">
                {userData.completedDSAlgo.includes(currentDs._id) ? (
                  <Incompleted dsId={currentDs._id} />
                ) : (
                  <Completed dsId={currentDs._id} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleSort;
