import { PlaceHolderImages } from './placeholder-images';

export interface Channel {
  id: string;
  name: string;
  logo: string;
  logoHint: string;
  streamUrl: string;
  category: string;
}

const channelData = [
  { id: '54161', name: 'News Today', category: 'News', imageId: 'tv1' },
  { id: '2', name: 'Sports Arena', category: 'Sports', imageId: 'tv2' },
  { id: '3', name: 'Movie Mania', category: 'Movies', imageId: 'tv3' },
  { id: '4', name: 'Cartoon World', category: 'Kids', imageId: 'tv4' },
  { id: '5', name: 'Discovery Earth', category: 'Documentary', imageId: 'tv5' },
  { id: '6', name: 'Music Hits', category: 'Music', imageId: 'tv6' },
  { id: '7', name: 'Global News', category: 'News', imageId: 'tv7' },
  { id: '8', name: 'Action Movies', category: 'Movies', imageId: 'tv8' },
  { id: '9', name: 'Pro Football', category: 'Sports', imageId: 'tv9' },
  { id: '10', name: 'Kids Fun', category: 'Kids', imageId: 'tv10' },
  { id: '11', name: 'Wild Life', category: 'Documentary', imageId: 'tv11' },
  { id: '12', name: 'Classic Rock', category: 'Music', imageId: 'tv12' },
];

export const channels: Channel[] = channelData.map(channel => {
  const imageData = PlaceHolderImages.find(img => img.id === channel.imageId);
  const streamId = channel.id === '54161' ? '54161' : channel.id;
  return {
    ...channel,
    logo: imageData?.imageUrl || '',
    logoHint: imageData?.imageHint || '',
    streamUrl: `https://allinonereborn.xyz/amit/host.php?id=${streamId}`,
  }
});
