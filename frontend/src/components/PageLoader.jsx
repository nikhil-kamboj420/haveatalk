const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[100vh] min-w-[100vw]">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover -z-10"
      >
        <source src="/bg-loading.mp4" type="video/mp4" />
      </video>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-e-white border-opacity-75"></div>
    </div>
  );
};

export default PageLoader;
