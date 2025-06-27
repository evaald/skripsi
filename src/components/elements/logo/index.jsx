function Logo(props) {
  return (
    <div className={`flex flex-col items-center ${props.className2}`}>
      {/* Logo */}
      <div className="bg-white rounded-full">
        <img
          src={props.src}
          alt={props.alt}
          className={props.className}
        />
      </div>

      {/* Label */}
      {props.label && (
        <div className="mt-2 text-center text-sm font-semibold text-gray-800">
          {props.label}
        </div>
      )}
    </div>
  );
}
export default Logo;
