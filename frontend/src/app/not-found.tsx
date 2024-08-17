import CTALink from "@/components/CTALink";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl sm:text-6xl text-center mb-4 sm:mb-8">
          Page not found (neither its meaning)
        </h1>
        <CTALink href="/" text="Back to Home" />
      </div>
    </div>
  );
};

export default NotFoundPage;
