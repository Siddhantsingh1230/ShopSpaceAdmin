const ContextMenu = ({ location, children }) => {
  return (
    <>
      <div
        className={`bg-white rounded-md \ transition-all h-auto p-2 w-auto min-w-32 fixed z-40 flex flex-col`}
        style={{ top: `${location.y}px`, left: `${location.x}px` }}
      >
        {children}
      </div>
    </>
  );
};

export default ContextMenu;
