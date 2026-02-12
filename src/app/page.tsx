import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChannelGrid } from '@/components/channel-grid';
import { channels, type Channel } from '@/lib/channels';

export default function Home() {
  // Sort all channels alphabetically for the main grid
  const allChannels = [...channels].sort((a, b) => a.name.localeCompare(b.name));

  // Group channels by category
  const categories = allChannels.reduce((acc, channel) => {
    if (!acc[channel.category]) {
      acc[channel.category] = [];
    }
    acc[channel.category].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  // Define a preferred order for categories
  const categoryOrder = ['News', 'Entertainment', 'Music', 'Movies', 'Sports', 'Cartoon'];
  
  // Sort categories based on the preferred order, then alphabetically
  const sortedCategories = Object.entries(categories).sort(([a], [b]) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      
      if (indexA !== -1 && indexB === -1) return -1;
      if (indexA === -1 && indexB !== -1) return 1;
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      
      return a.localeCompare(b);
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Section for all channels, always visible */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          All Channels
        </h2>
        <ChannelGrid channels={allChannels} />
      </section>

      {/* Collapsible sections for each category */}
      <Accordion type="multiple" className="w-full">
        {sortedCategories.map(([category, categoryChannels]) => (
          categoryChannels.length > 0 && (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="text-2xl md:text-3xl font-bold text-primary hover:no-underline">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <ChannelGrid channels={categoryChannels} />
              </AccordionContent>
            </AccordionItem>
          )
        ))}
      </Accordion>
    </div>
  );
}
