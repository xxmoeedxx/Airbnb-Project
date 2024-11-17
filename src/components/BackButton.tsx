import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center justify-center w-10 h-10 border border-red-500 rounded-full text-red-500 hover:bg-red-100 hover:border-red-600 hover:text-red-600 transition-colors duration-200 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

export default BackButton;
