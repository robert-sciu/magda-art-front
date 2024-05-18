import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSocialsIcons } from "../../../containers/mainPage/mainPageImagesSlice";

export default function SocialIcons() {
  const socials = useSelector(selectSocialsIcons);
  return (
    <>
      <NavLink to="https://instagram.com" target="blank">
        <img src={socials.instagram?.url} alt="instagram icon" />
      </NavLink>
      <NavLink to="https://facebook.com" target="blank">
        <img src={socials.facebook?.url} alt="facebook icon" />
      </NavLink>
    </>
  );
}
