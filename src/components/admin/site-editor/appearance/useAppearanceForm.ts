
import { useState } from 'react';

export const useAppearanceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Colors state
  const [primaryColor, setPrimaryColor] = useState('#1EAEDB');
  const [secondaryColor, setSecondaryColor] = useState('#0A95C0');
  const [accentColor, setAccentColor] = useState('#FFB800');
  const [headerBgColor, setHeaderBgColor] = useState('#FFFFFF');
  const [footerBgColor, setFooterBgColor] = useState('#F8FAFC');
  
  // Images state
  const [logoUrl, setLogoUrl] = useState('/favicon.svg');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');
  const [faviconPreview, setFaviconPreview] = useState('/favicon.ico');
  const [bannerPreview, setBannerPreview] = useState('');
  
  // Layout state
  const [useAnimatedLogo, setUseAnimatedLogo] = useState(true);

  return {
    isLoading,
    setIsLoading,
    
    // Colors
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    accentColor,
    setAccentColor,
    headerBgColor,
    setHeaderBgColor,
    footerBgColor,
    setFooterBgColor,
    
    // Images
    logoUrl,
    setLogoUrl,
    faviconUrl,
    setFaviconUrl,
    faviconPreview,
    setFaviconPreview,
    bannerPreview,
    setBannerPreview,
    
    // Layout
    useAnimatedLogo,
    setUseAnimatedLogo,
  };
};
