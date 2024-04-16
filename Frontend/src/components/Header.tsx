import styles from "@/styles/header.module.scss";

interface IHeader {
  title: string;
  description?: string;
}

const Header = ({ title, description }: IHeader) => {
  return (
    <div className={styles["header-container"]}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Header;
