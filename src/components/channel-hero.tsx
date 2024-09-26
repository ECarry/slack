import { format } from "date-fns";

interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

const ChannelHero: React.FC<ChannelHeroProps> = ({ name, creationTime }) => {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <p className="text-2xl font-bold flex items-center mb-2"># {name}</p>
      <p className="font-normal text-slate-800 mb-4">
        Created on {format(creationTime, "MMMM do, yyyy")}
      </p>
    </div>
  );
};

export default ChannelHero;
