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
  { id: '3', name: 'Movie Mania', category: 'Movies', imageId: 'tv3' },
  { id: '4', name: 'Cartoon World', category: 'Kids', imageId: 'tv4' },
  { id: '5', name: 'Discovery Earth', category: 'Documentary', imageId: 'tv5' },
  { id: '6', name: 'Music Hits', category: 'Music', imageId: 'tv6' },
  { id: '7', name: 'ABP Ananda', category: 'News', imageId: 'tv15' },
  { id: '8', name: 'Action Movies', category: 'Movies', imageId: 'tv8' },
  { id: '9', name: 'Pro Football', category: 'Sports', imageId: 'tv9' },
  { id: '10', name: 'Kids Fun', category: 'Kids', imageId: 'tv10' },
  { id: '11', name: 'Wild Life', category: 'Documentary', imageId: 'tv11' },
  { id: '12', name: 'Classic Rock', category: 'Music', imageId: 'tv12' },
  { id: '1143', name: 'Sangeet Bangla', category: 'Music', imageId: 'tv13' },
  { id: '14', name: 'DD India', category: 'News', imageId: 'tv14' },
];

export const channels: Channel[] = channelData.map(channel => {
  const imageData = PlaceHolderImages.find(img => img.id === channel.imageId);
  let streamUrl = '';

  if (channel.id === '1143') {
    streamUrl = 'https://cdn-4.pishow.tv/live/1143/master.m3u8';
  } else if (channel.id === '14') {
    streamUrl = 'https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/ceda14583477426aa162a65392d8ea07/index.m3u8';
  } else if (channel.id === '7') {
    streamUrl = 'https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/abp-ananda/master.m3u8';
  } else {
    const streamId = channel.id === '54161' ? '54161' : channel.id;
    streamUrl = `https://allinonereborn.xyz/amit/host.php?id=${streamId}`;
  }

  return {
    ...channel,
    logo: imageData?.imageUrl || '',
    logoHint: imageData?.imageHint || '',
    streamUrl: streamUrl,
  }
});
