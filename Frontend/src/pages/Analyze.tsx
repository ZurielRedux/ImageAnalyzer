import AnalyzeForm from "@/components/AnalyzeForm";
import Header from "@/components/Header";
import { AnalyzeHeaderInfo } from "@/constants/labels";

import styles from "@/styles/analyze.module.scss";

const Analyze = () => {
  return (
    <div className={styles["analyze-page-container"]}>
      <Header
        title={AnalyzeHeaderInfo.title}
        description={AnalyzeHeaderInfo.description}
      />
      <AnalyzeForm />
    </div>
  );
};

export default Analyze;
