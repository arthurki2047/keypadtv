
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
  { id: '4', name: 'DD Bangla', category: 'Entertainment', imageId: 'tv17' },
  { id: '3', name: 'DD National HD', category: 'Entertainment', imageId: 'tv20' },
  { id: '5', name: 'Enter 10 Bangla', category: 'Entertainment', imageId: 'tv18' },
  { id: '969', name: 'Aakaash Aath', category: 'Entertainment', imageId: 'tv19' },
  { id: '7', name: 'ABP Ananda', category: 'News', imageId: 'tv15' },
  { id: '21', name: 'TV9 Bangla', category: 'News', imageId: 'tv21' },
  { id: '10', name: 'Republic Bangla', category: 'News', imageId: 'tv22' },
  { id: '5001', name: 'News 18 Bangla', category: 'News', imageId: 'tv27' },
  { id: '13', name: 'DD Sports', category: 'Sports', imageId: 'tv2' },
  { id: '12', name: 'B4U Music', category: 'Music', imageId: 'tv12' },
  { id: '1143', name: 'Sangeet Bangla', category: 'Music', imageId: 'tv13' },
  { id: '14', name: 'DD India', category: 'News', imageId: 'tv14' },
  { id: '9001', name: '9X Jalwa', category: 'Music', imageId: 'tv24' },
  { id: '9002', name: '9XM', category: 'Music', imageId: 'tv25' },
  { id: '1459', name: 'Goldmines', category: 'Movies', imageId: 'tv26' },
  { id: '1461', name: 'Goldmines Movies', category: 'Movies', imageId: 'tv18' },
  { id: '559', name: 'Pogo', category: 'Kids', imageId: 'tv28' },
  { id: '30', name: 'Rongeen TV', category: 'Entertainment', imageId: 'tv29' },
  { id: '1473', name: 'Khushboo Bangla', category: 'Entertainment', imageId: 'tv30' },
  { id: '237', name: 'CN News', category: 'News', imageId: 'tv21' },
  { id: 'a01v', name: 'Sun Bangla', category: 'Entertainment', imageId: 'tv31' },
  { id: '1001', name: 'Ananda Barta', category: 'News', imageId: 'tv21' },
];

export const channels: Channel[] = channelData.map(channel => {
  const imageData = PlaceHolderImages.find(img => img.id === channel.imageId);
  const defaultImageData = PlaceHolderImages.find(img => img.id === 'tv_default');
  
  // Base URLs and specific stream logic
  let streamUrlString = '';

  if (channel.id === '3') {
    streamUrlString = 'https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/40492a64c1db4a1385ba1a397d357d3a/index.m3u8';
  } else if (channel.id === '1143') {
    streamUrlString = 'https://cdn-4.pishow.tv/live/1143/master.m3u8';
  } else if (channel.id === '14') {
    streamUrlString = 'https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/ceda14583477426aa162a65392d8ea07/index.m3u8';
  } else if (channel.id === '7') {
    streamUrlString = 'https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/abp-ananda/master.m3u8';
  } else if (channel.id === '4') {
    streamUrlString = 'https://d3eyhgoylams0m.cloudfront.net/v1/manifest/93ce20f0f52760bf38be911ff4c91ed02aa2fd92/ed7bd2c7-8d10-4051-b397-2f6b90f99acb/2e9e32a4-c4f7-49c3-96d6-c4e3660c7e3f/2.m3u8';
  } else if (channel.id === '5') {
    streamUrlString = 'https://live-bangla.akamaized.net/liveabr/playlist.m3u8';
  } else if (channel.id === '969') {
    streamUrlString = 'https://cdn-4.pishow.tv/live/969/master.m3u8';
  } else if (channel.id === '21') {
    streamUrlString = 'https://dyjmyiv3bp2ez.cloudfront.net/pub-iotv9banaen8yq/liveabr/playlist.m3u8';
  } else if (channel.id === '10') {
    streamUrlString = 'https://vg-republictvlive.akamaized.net/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-456368/main.m3u8';
  } else if (channel.id === '13') {
    streamUrlString = 'https://cdn-6.pishow.tv/live/13/master.m3u8';
  } else if (channel.id === '12') {
    streamUrlString = 'https://cdnb4u.wiseplayout.com/B4U_Music/master.m3u8';
  } else if (channel.id === '9001') {
    streamUrlString = 'https://9xjio.wiseplayout.com/9XJALWA/master.m3u8';
  } else if (channel.id === '9002') {
    streamUrlString = 'https://9xjio.wiseplayout.com/9XM/master.m3u8';
  } else if (channel.id === '1459') {
    streamUrlString = 'https://cdn-2.pishow.tv/live/1459/master.m3u8';
  } else if (channel.id === '1461') {
    streamUrlString = 'https://cdn-2.pishow.tv/live/1461/master.m3u8';
  } else if (channel.id === '5001') {
    streamUrlString = 'https://n18syndication.akamaized.net/bpk-tv/News18_Bangla_NW18_MOB/output01/master.m3u8';
  } else if (channel.id === '559') {
    streamUrlString = 'https://mini.allinonereborn.fun/jiotv-inn/app/ts_live_559.m3u8';
  } else if (channel.id === '30') {
    streamUrlString = 'https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/rongeen-tv/63387463-974d-424d-84dd-847307b4de3c/0.m3u8';
  } else if (channel.id === '1473') {
    streamUrlString = 'https://cdn-4.pishow.tv/live/1473/master.m3u8';
  } else if (channel.id === '237') {
    streamUrlString = 'https://cdn-2.pishow.tv/live/237/master.m3u8';
  } else if (channel.id === 'a01v') {
    streamUrlString = 'https://cdn-4.pishow.tv/live/1471/master.m3u8';
  } else if (channel.id === '1001') {
    streamUrlString = 'https://account19.livebox.co.in/Anandabarta2hls/live.m3u8';
  }
   else {
    // Default or other channels
    streamUrlString = `https://mini.allinonereborn.fun/jiotv-inn/app/ts_live_${channel.id}.m3u8`;
  }

  let logoUrl = imageData?.imageUrl || defaultImageData?.imageUrl || '';
  let logoHint = imageData?.imageHint || defaultImageData?.imageHint || '';

  if (channel.id === '1473') {
    logoUrl = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5MCIgZmlsbD0iI2ZmNzA0MyIgc3Ryb2tlPSIjZmY5OTMzIiBzdHJva2Utd2lkdGg9IjEwIiAvPgogIDxwYXRoIGQ9Ik0xMDAsMzUgQzEwMCwzNSAxMTUsNjAgMTM1LDYwIEMxNTUsNjAgMTY1LDQ1IDE2NSwzNSBDMTY1LDI1IDE1NSwxNSAxMzUsMTUgQzExNSwxNSAxMDAsMjUgMTAwLDM1IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0icm90YXRlKDAsIDEwMCwgMTAwKSIgLz4KICA8cGF0aCBkPSJNMTAwLDM1IEMxMDAsMzUgMTE1LDYwIDEzNSw2MCBDMTU1LDYwIDE2NSw0NSAxNjUsMzUgQzE2NSwyNSAxNTUsMTUgMTM1LDE1IEMxMTUsMTUgMTAwLDI1IDEwMCwzNSBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InJvdGF0ZSg3MiwgMTAwLCAxMDApIiAvPgogIDxwYXRoIGQ9Ik0xMDAsMzUgQzEwMCwzNSAxMTUsNjAgMTM1LDYwIEMxNTUsNjAgMTY1LDQ5IDE2NSwzNSBDMTY1LDI1IDE1NSwxNSAxMzUsMTUgQzExNSwxNSAxMDAsMjUgMTAwLDM1IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0icm90YXRlKDE0NCwgMTAwLCAxMDApIiAvPgogIDxwYXRoIGQ9Ik0xMDAsMzUgQzEwMCwzNSAxMTUsNjAgMTM1LDYwIEMxNTUsNjAgMTY1LDQ1IDE2NSwzNSBDMTY1LDI1IDE1NSwxNSAxMzUsMTUgQzExNSwxNSAxMDAsMjUgMTAwLDM1IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0icm90YXRlKDIxNiwgMTAwLCAxMDApIiAvPgogIDxwYXRoIGQ9Ik0xMDAsMzUgQzEwMCwzNSAxMTUsNjAgMTM1LDYwIEMxNTUsNjAgMTY1LDQ1IDE2NSwzNSBDMTY1LDI1IDE1NSwxNSAxMzUsMTUgQzExNSwxNSAxMDAsMjUgMTAwLDM1IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0icm90YXRlKDI4OCwgMTAwLCAxMDApIiAvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMzAiIGZpbGw9IiNmZmYiIC8+Cjwvc3ZnPg==`;
    logoHint = 'flower logo';
  }

  return {
    ...channel,
    logo: logoUrl,
    logoHint: logoHint,
    streamUrl: streamUrlString,
  };
});

// Function to safely escape characters for regex
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function filterChannels(channels: Channel[], searchTerm: string): Channel[] {
  if (!searchTerm) {
    return channels;
  }
  const escapedTerm = escapeRegExp(searchTerm.toLowerCase());
  const regex = new RegExp(escapedTerm, 'i');
  return channels.filter(channel => regex.test(channel.name));
}

    