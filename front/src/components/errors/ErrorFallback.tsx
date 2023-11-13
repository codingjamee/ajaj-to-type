interface ErrorProps {
  err: string;
}

const ErrorFallback: React.FC<ErrorProps> = ({ err }) => {
  console.log(err);
  return <div>{err}</div>;
};

export default ErrorFallback;
