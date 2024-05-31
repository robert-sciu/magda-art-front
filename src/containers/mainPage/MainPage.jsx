// import { useEffect } from "react";
// import { fetchContent } from "./mainPageContentSlice";
// import { fetchPageImages } from "./mainPageImagesSlice";
// import { useDispatch, useSelector } from "react-redux";
import MainPageUi from "../mainPageUi/MainPageUi";
// import { filesLoaded } from "../../store/loadingStateSlice";

export default function MainPage() {
  // const dispatch = useDispatch();
  // const loadState = useSelector(filesLoaded);
  // useEffect(() => {
  //   if (!loadState) return;
  //   dispatch(fetchContent());
  //   dispatch(fetchPageImages());
  // }, [dispatch, loadState]);

  return <MainPageUi />;
}
