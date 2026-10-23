import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  link: string;
  linkText: string;
  className?: string;
  img?: string;
};

export const ButtonLink = ({ link, linkText, className, img }: ButtonLinkProps) => {
  return (
    <>
      <Link to={link} className={`${styles.link} ${className}`}>
        {linkText}
        <img src={img} alt="" />
      </Link>
    </>
  );
};

