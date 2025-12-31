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
  { id: '3', name: 'Colors Bangla', category: 'Entertainment', imageId: 'tv16' },
  { id: '4', name: 'DD Bangla', category: 'Entertainment', imageId: 'tv17' },
  { id: '5', name: 'Enter 10 Bangla', category: 'Entertainment', imageId: 'tv18' },
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

  if (channel.id === '3') {
    streamUrl = 'http://103.140.254.2:3500/live/756.m3u8';
  } else if (channel.id === '1143') {
    streamUrl = 'https://cdn-4.pishow.tv/live/1143/master.m3u8';
  } else if (channel.id === '14') {
    streamUrl = 'https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/ceda14583477426aa162a65392d8ea07/index.m3u8';
  } else if (channel.id === '7') {
    streamUrl = 'https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/abp-ananda/master.m3u8';
  } else if (channel.id === '4') {
    streamUrl = 'https://d3eyhgoylams0m.cloudfront.net/v1/manifest/93ce20f0f52760bf38be911ff4c91ed02aa2fd92/ed7bd2c7-8d10-4051-b397-2f6b90f99acb/2e9e32a4-c4f7-49c3-96d6-c4e3660c7e3f/2.m3u8';
  } else if (channel.id === '5') {
    streamUrl = 'https://live-bangla.akamaized.net/liveabr/playlist.m3u8';
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
