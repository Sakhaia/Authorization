import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  link: string;
  linkText?: string;
  className?: string;
  img?: string;
  style?: React.CSSProperties;
  state?: Record<string, unknown>;
};

export const ButtonLink = ({ link, linkText, className, img, style, state }: ButtonLinkProps) => {
  return (
    <>
      <Link to={link} className={`${styles.link} ${className}`} style={style} state={state}>
        {linkText}
        <img src={img} alt="" />
      </Link>
    </>
  );
};

