import { useSelector } from "react-redux";
import {
  selectAllContent,
  selectBio,
  selectFooterDesign,
  selectFooterOwner,
  selectName,
  selectWelcome,
  selectVisualizationsTexts,
} from "../../../containers/mainPage/mainPageContentSlice";
import { useEffect, useState } from "react";
import styles from "./textEditor.module.scss";
import api from "../../../api/api";
import TextInputArea from "../textInputArea/TextInputArea";
const api_url = import.meta.env.VITE_API_BASE_URL;

export default function TextEditor() {
  const nameData = useSelector(selectName);
  const welcomeData = useSelector(selectWelcome);
  const bioData = useSelector(selectBio);
  const footerDesignData = useSelector(selectFooterDesign);
  const footerOwnerData = useSelector(selectFooterOwner);

  const visualizations = useSelector(selectVisualizationsTexts);
  const visualization1Data = visualizations?.visualization1?.content;
  const visualization2Data = visualizations?.visualization2?.content;
  const visualization3Data = visualizations?.visualization3?.content;

  const [name, setName] = useState("");
  const [welcome, setWelcome] = useState("");
  const [bio, setBio] = useState("");
  const [footerDesign, setFooterDesign] = useState("");
  const [footerOwner, setFooterOwner] = useState("");
  const [visualization1, setVisualization1] = useState("");
  const [visualization2, setVisualization2] = useState("");
  const [visualization3, setVisualization3] = useState("");

  useEffect(() => {
    setName(nameData || "");
    setWelcome(welcomeData || "");
    setBio(bioData || "");
    setFooterDesign(footerDesignData || "");
    setFooterOwner(footerOwnerData || "");
    setVisualization1(visualization1Data || "");
    setVisualization2(visualization2Data || "");
    setVisualization3(visualization3Data || "");
  }, [
    nameData,
    welcomeData,
    bioData,
    footerDesignData,
    footerOwnerData,
    visualization1Data,
    visualization2Data,
    visualization3Data,
  ]);

  function handleSubmit(e, heading, inputData) {
    e.preventDefault();

    const data = { heading: heading, content: inputData };
    api
      .post(`${api_url}/contents`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  return (
    <div className={styles.editorContainer}>
      <form>
        <TextInputArea
          heading={"name"}
          inputData={name}
          onChange={setName}
          large={false}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"welcome"}
          inputData={welcome}
          onChange={setWelcome}
          large={true}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"bio"}
          inputData={bio}
          onChange={setBio}
          large={true}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"footerDesign"}
          inputData={footerDesign}
          onChange={setFooterDesign}
          large={false}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"footerOwner"}
          inputData={footerOwner}
          onChange={setFooterOwner}
          large={false}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"visualization1"}
          inputData={visualization1}
          onChange={setVisualization1}
          large={true}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"visualization2"}
          inputData={visualization2}
          onChange={setVisualization2}
          large={true}
          submit={handleSubmit}
        />

        <TextInputArea
          heading={"visualization3"}
          inputData={visualization3}
          onChange={setVisualization3}
          large={true}
          submit={handleSubmit}
        />
      </form>
    </div>
  );
}
