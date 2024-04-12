import AnalyzeForm from "@/components/AnalyzeForm";

import styles from "@/styles/analyze.module.scss";

const Analyze = () => {
  return (
    <div className={styles["analyze-page-container"]}>
      <div className={styles["analyze-header"]}>
        <h2>Analyze Image</h2>
        <p>
          Upload your image to view various visual stats and features like
          categories, colors, objects, and information tags
        </p>
      </div>
      <AnalyzeForm />
    </div>
  );
};

export default Analyze;
