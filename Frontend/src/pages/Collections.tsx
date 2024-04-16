import Header from "@/components/Header";
import { CollectionsHeaderInfo } from "@/constants/labels";

import styles from "@/styles/collection.module.scss";

const Collections = () => {
  return (
    <div className={styles["collection-page-container"]}>
      <Header
        title={CollectionsHeaderInfo.title}
        description={CollectionsHeaderInfo.description}
      />
    </div>
  );
};

export default Collections;
