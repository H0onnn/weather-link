const LoadingFallback = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-4 w-4 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-4 w-4 bg-primary/70 rounded-full animate-bounce" />
    </div>
  );
};

export default LoadingFallback;
