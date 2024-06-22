import styles from "./uploadForm.module.scss";
import PropTypes from "prop-types";

export default function UploadForm({ imageName, setImageName, setFile }) {
  return (
    <form className={styles.formContainer}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
      />
      <label htmlFor="file">File:</label>
      <input
        type="file"
        id="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

UploadForm.propTypes = {
  imageName: PropTypes.string,
  setImageName: PropTypes.func,
  setFile: PropTypes.func,
};
