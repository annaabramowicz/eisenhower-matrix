type MatrixSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const MatrixSection = ({ children, className = "" }: MatrixSectionProps) => {
  return (
    <div
      className={`flex items-center justify-center alert rounded-md ${className}`}
    >
      {children}
    </div>
  );
};
export default MatrixSection;
