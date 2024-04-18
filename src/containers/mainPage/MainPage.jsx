import { useEffect } from "react";
import { fetchContent, selectAllContent } from "./mainPageContentSlice";
import { fetchPageImages, selectAllPageImages } from "./mainPageImagesSlice";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../components/MainPage/Hero/Hero";

export default function MainPage() {
  const dispatch = useDispatch();

  const { welcome, bio } = useSelector(selectAllContent);
  console.log(welcome, bio);
  const pageImages = useSelector(selectAllPageImages);
  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchPageImages());
  }, [dispatch]);

  return (
    <>
      <Hero image={pageImages.hero} />
    </>
  );
}
