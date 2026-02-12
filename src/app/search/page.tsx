import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResultsFallback() {
    return (
        <div>
            <Skeleton className="h-8 w-1/2 mb-4 bg-muted" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="aspect-video w-full bg-muted" />
                        <Skeleton className="h-5 w-3/4 mx-auto bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchResultsFallback />}>
      <SearchResults />
    </Suspense>
  );
}
