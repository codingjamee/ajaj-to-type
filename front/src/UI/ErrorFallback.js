const ErrorFallback = ({ err }) => {
  console.log(err);
  return <div>{err}</div>;
};

export default ErrorFallback;
