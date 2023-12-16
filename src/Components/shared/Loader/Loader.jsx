const Loader = ({ text }) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
      <p className="uppercase text-center">{text}</p>
    </div>
  );
};

export default Loader;
