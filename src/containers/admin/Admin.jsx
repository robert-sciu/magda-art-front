import styles from "./admin.module.scss";
import TextEditor from "../../components/Admin/textEditor/TextEditor";
import PageImagesUpload from "../../components/Admin/pageImagesUpload/PageImagesUpload";
export default function Admin() {
  return (
    <div className={styles.adminContainer}>
      <TextEditor />
      <PageImagesUpload />
    </div>
  );
}
