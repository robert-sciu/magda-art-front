import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchImages, selectAllImages } from "./galleryPageSlice";

export default function GalleryPage() {
  const dispatch = useDispatch();

  const { data: paintings } = useSelector(selectAllImages);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div>
      {paintings
        ? paintings.map((painting) => {
            return (
              <div key={painting.id}>
                <h2>{painting.title}</h2>
                <p>{painting.description}</p>
                <img src={painting.url} alt={painting.description} />
              </div>
            );
          })
        : "loading"}
    </div>
  );
}
