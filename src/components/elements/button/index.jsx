
function Button({ label, onClick, className, src, alt, classNameImg }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
    <img
      src={src}
      alt={alt}
      className={classNameImg}
    />
      {label}
    </button>
  );
}

export default Button;