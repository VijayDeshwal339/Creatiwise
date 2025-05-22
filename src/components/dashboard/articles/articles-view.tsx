import { useState } from 'react';
import { ArticlesTable } from '@/components/dashboard/articles/articles-table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

export function ArticlesView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('generated');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Articles</h1>
      </div>

      <Tabs defaultValue="generated" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger
              value="generated"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Generated Articles
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Published Articles
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Scheduled Articles
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Archived Articles
            </TabsTrigger>
          </TabsList>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for Title & Keywords..."
              className="w-full pl-8 bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="generated" className="mt-6">
          <ArticlesTable filter={{ type: 'generated', search: searchQuery }} />
        </TabsContent>
        <TabsContent value="published" className="mt-6">
          <ArticlesTable filter={{ type: 'published', search: searchQuery }} />
        </TabsContent>
        <TabsContent value="scheduled" className="mt-6">
          <ArticlesTable filter={{ type: 'scheduled', search: searchQuery }} />
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <ArticlesTable filter={{ type: 'archived', search: searchQuery }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}