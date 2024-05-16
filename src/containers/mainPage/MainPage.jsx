import { useEffect } from "react";
import { fetchContent } from "./mainPageContentSlice";
import { fetchPageImages } from "./mainPageImagesSlice";
import { useDispatch } from "react-redux";
import UiContainer from "../uiContainer/UiContainer";

export default function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchPageImages());
  }, [dispatch]);

  return <UiContainer />;
}
