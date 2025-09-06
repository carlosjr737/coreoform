import { FormationList } from './FormationList';
import { DancerPanel } from './DancerPanel';

export function Sidebar() {
  return (
    <aside className="w-72 bg-gray-800 border-r border-gray-700 p-4 flex flex-col gap-6">
      <FormationList />
      <DancerPanel />
    </aside>
  );
}