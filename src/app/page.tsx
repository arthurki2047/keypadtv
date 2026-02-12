import { ChannelGrid } from '@/components/channel-grid';
import { channels, getSortedCategories } from '@/lib/channels';
import { CategoriesDropdown } from '@/components/categories-dropdown';

export default function Home() {
  // Sort all channels alphabetically for the main grid
  const allChannels = [...channels].sort((a, b) => a.name.localeCompare(b.name));
  const sortedCategories = getSortedCategories();

  return (
    <div className="flex flex-col gap-8">
      {/* Section for all channels, always visible */}
      <section id="all-channels">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            All
          </h2>
          <CategoriesDropdown />
        </div>
        <ChannelGrid channels={allChannels} />
      </section>

      {/* Sections for each category */}
      {sortedCategories.map(([category, categoryChannels]) => (
        categoryChannels.length > 0 && (
          <section id={category.toLowerCase()} key={category} className="scroll-mt-24">
             <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {category}
              </h2>
            <ChannelGrid channels={categoryChannels.sort((a, b) => a.name.localeCompare(b.name))} />
          </section>
        )
      ))}
    </div>
  );
}
