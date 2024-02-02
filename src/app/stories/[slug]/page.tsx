const Story = ({ params }: { params: { slug: string } }) => {
  return <h1>The story: {params.slug}</h1>;
};

export default Story;
