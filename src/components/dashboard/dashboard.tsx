import { Sidebar } from '@/components/dashboard/sidebar';
import { ArticlesView } from '@/components/dashboard/articles/articles-view';

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <ArticlesView />
        </div>
      </main>
    </div>
  );
}