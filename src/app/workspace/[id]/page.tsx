interface Props {
  params: {
    id: string;
  };
}

const WorkspaceIdPage = ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default WorkspaceIdPage;
