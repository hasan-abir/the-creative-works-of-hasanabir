import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-6xl text-center mb-4 sm:mb-8">
          Nah, nothing here
        </h1>
        <Link href="/" className="mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
