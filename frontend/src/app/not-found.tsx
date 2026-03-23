import CTABtn from "@/components/CTABtn";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl sm:text-6xl text-center mb-4 sm:mb-8">
          Nah, nothing here
        </h1>
        <CTABtn href="/">Back to Home</CTABtn>
      </div>
    </div>
  );
};

export default NotFoundPage;
