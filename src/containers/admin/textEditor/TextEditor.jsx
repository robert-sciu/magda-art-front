import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  selectBio,
  selectFooterDesign,
  selectFooterOwner,
  selectName,
  selectWelcome,
  selectVisualizationsTexts,
  fetchContent,
  updateContent,
  selectContentLoadingStatus,
  selectContentRefetchNeeded,
} from "../../../store/mainPageContentSlice";

import styles from "./textEditor.module.scss";
import TextEditor from "../../../components/Admin/textInputArea/TextInputArea";

export default function PageTextsManager() {
  const [name, setName] = useState("");
  const [welcome, setWelcome] = useState("");
  const [bio, setBio] = useState("");
  const [footerDesign, setFooterDesign] = useState("");
  const [footerOwner, setFooterOwner] = useState("");
  const [visualization1, setVisualization1] = useState("");
  const [visualization2, setVisualization2] = useState("");
  const [visualization3, setVisualization3] = useState("");

  const dispatch = useDispatch();

  const nameData = useSelector(selectName);
  const welcomeData = useSelector(selectWelcome);
  const bioData = useSelector(selectBio);
  const footerDesignData = useSelector(selectFooterDesign);
  const footerOwnerData = useSelector(selectFooterOwner);
  const visualizations = useSelector(selectVisualizationsTexts);

  const isLoading = useSelector(selectContentLoadingStatus);
  const refetchNeeded = useSelector(selectContentRefetchNeeded);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (!refetchNeeded || isLoading) return;
    dispatch(fetchContent());
  }, [dispatch, refetchNeeded, isLoading]);

  useEffect(() => {
    const visualization1Data = visualizations?.visualization1?.content;
    const visualization2Data = visualizations?.visualization2?.content;
    const visualization3Data = visualizations?.visualization3?.content;
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
    visualizations,
  ]);

  async function handleSubmit(
    e,
    heading,
    inputData,
    setInput,
    originalContent
  ) {
    e.preventDefault();
    if (inputData.trim() === "") {
      setInput("");
      return;
    }

    if (inputData === originalContent) {
      return;
    }

    const data = { heading: heading, content: inputData };

    dispatch(updateContent(data));
  }

  return (
    <div className={styles.editorContainer}>
      <form>
        <TextEditor
          heading={"name"}
          inputData={name}
          onChange={setName}
          large={false}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"welcome"}
          inputData={welcome}
          onChange={setWelcome}
          large={true}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"bio"}
          inputData={bio}
          onChange={setBio}
          large={true}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"developer name"}
          inputData={footerDesign}
          onChange={setFooterDesign}
          large={false}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"site owner"}
          inputData={footerOwner}
          onChange={setFooterOwner}
          large={false}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"visualization1"}
          inputData={visualization1}
          onChange={setVisualization1}
          large={true}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"visualization2"}
          inputData={visualization2}
          onChange={setVisualization2}
          large={true}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />

        <TextEditor
          heading={"visualization3"}
          inputData={visualization3}
          onChange={setVisualization3}
          large={true}
          submit={handleSubmit}
          isLoading={isLoading && !refetchNeeded}
        />
      </form>
    </div>
  );
}
