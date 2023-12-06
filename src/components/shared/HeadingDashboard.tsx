const HeadingDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-2xl font-bold mb-10 relative inline-block">
      <div className="w-10 h-2 bg-secondary bg-opacity-50 absolute bottom-1 z-[-1] left-0"></div>
      {children}
    </h1>
  );
};

export default HeadingDashboard;
