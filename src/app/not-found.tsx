import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[60vh]">
        <Frown className="w-24 h-24 text-muted-foreground/50 mb-4" />
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="mt-2 text-lg text-muted-foreground">
        It might have been moved or deleted.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
