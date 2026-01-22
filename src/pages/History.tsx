import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-black text-white p-3 relative flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-400" />
        </button>
        <h1 className="text-lg font-bold">Activity</h1>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Activity history</p>
          <p className="text-gray-600 text-xs">Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default History;
