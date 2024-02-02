const StoryPage = ({ params }: { params: { slug: string; page: string } }) => {
  return (
    <h1>
      Page {params.page} of {params.slug}
    </h1>
  );
};

export default StoryPage;
