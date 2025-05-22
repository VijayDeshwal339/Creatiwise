import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUp, MoreHorizontal, Eye } from 'lucide-react';
import { articlesData } from '@/data/articles-data';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface FilterOptions {
  type: 'generated' | 'published' | 'scheduled' | 'archived';
  search: string;
}

interface ArticlesTableProps {
  filter: FilterOptions;
}

type SortField = 'title' | 'keyword' | 'words' | 'created';
type SortDirection = 'asc' | 'desc';

export function ArticlesTable({ filter }: ArticlesTableProps) {
  const [sortField, setSortField] = useState<SortField>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  // Filter data based on search query and tab
  const filteredData = articlesData.filter((item) => {
    const matchesSearch =
      filter.search === '' ||
      item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.keyword.toLowerCase().includes(filter.search.toLowerCase());
    return matchesSearch;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'title') {
      return sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === 'keyword') {
      return sortDirection === 'asc'
        ? a.keyword.localeCompare(b.keyword)
        : b.keyword.localeCompare(a.keyword);
    } else if (sortField === 'words') {
      return sortDirection === 'asc'
        ? a.words - b.words
        : b.words - a.words;
    } else {
      return sortDirection === 'asc'
        ? a.created.localeCompare(b.created)
        : b.created.localeCompare(a.created);
    }
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Toggle sort direction or set new sort field
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all checkboxes
  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map((item) => item.id));
    }
  };

  // Handle select individual checkbox
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Skeleton className="h-4 w-4" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-32" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-40" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-8 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full max-w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-16 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    paginatedData.length > 0 &&
                    selectedItems.length === paginatedData.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="min-w-[200px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSort('title')}
                >
                  Article Title
                  {renderSortIndicator('title')}
                </div>
              </TableHead>
              <TableHead className="min-w-[180px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSort('keyword')}
                >
                  Keyword [Traffic]
                  {renderSortIndicator('keyword')}
                </div>
              </TableHead>
              <TableHead className="min-w-[100px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSort('words')}
                >
                  Words
                  {renderSortIndicator('words')}
                </div>
              </TableHead>
              <TableHead className="min-w-[120px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSort('created')}
                >
                  Created On
                  {renderSortIndicator('created')}
                </div>
              </TableHead>
              <TableHead className="w-24 text-right">Action</TableHead>
              <TableHead className="w-24 text-right">Publish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(article.id)}
                    onCheckedChange={() => handleSelectItem(article.id)}
                    aria-label={`Select ${article.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.keyword}</TableCell>
                <TableCell>{article.words}</TableCell>
                <TableCell>{article.created}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="icon" className="sm:hidden">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Publish Now</DropdownMenuItem>
                      <DropdownMenuItem>Schedule</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Total {filteredData.length} Article Titles | Show
          <select
            className="mx-2 bg-background border rounded px-2 py-1"
            value={itemsPerPage}
            onChange={() => {}}
          >
            <option value="10">10</option>
          </select>
          entries per page
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Badge variant="outline" className="h-8 px-3">
            {currentPage} / {totalPages}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}