import { Link } from "react-router-dom";

function Logo(props) {
  return (
    <div className={`flex flex-col items-center ${props.className2}`}>
      {/* Logo */}
      <div className="bg-white rounded-full">
        <Link to="/">
        <img
          src={props.src}
          alt={props.alt}
          className={props.className}
        />
        </Link>
      </div>

      {/* Label */}
      {props.label && (
        <div className={props.classNameLabel}>
          {props.label}
        </div>
      )}
    </div>
  );
}
export default Logo;
