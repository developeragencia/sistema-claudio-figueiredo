
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';

// Import custom components
import SiteInfoSettings from './general/SiteInfoSettings';
import LogoTypeSelector from './general/LogoTypeSelector';
import StaticLogoUploader from './general/StaticLogoUploader';
import AnimatedLogoSettings from './general/AnimatedLogoSettings';
import SiteFeaturesToggle from './general/SiteFeaturesToggle';

// Import custom hook
import { useGeneralSettings } from './general/useGeneralSettings';

const GeneralSettings = () => {
  const {
    siteName,
    setSiteName,
    siteDescription,
    setSiteDescription,
    logoType,
    setLogoType,
    logoPreview,
    setLogoPreview,
    logoAnimation,
    setLogoAnimation,
    isLoading,
    handleSaveGeneral,
  } = useGeneralSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
        <CardDescription>
          Gerencie as configurações gerais do seu site
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Site Info Section */}
        <SiteInfoSettings
          siteName={siteName}
          setSiteName={setSiteName}
          siteDescription={siteDescription}
          setSiteDescription={setSiteDescription}
        />
        
        {/* Logo Type Selector */}
        <LogoTypeSelector 
          logoType={logoType} 
          setLogoType={setLogoType} 
        />
        
        {/* Show either Static Logo Uploader or Animated Logo Settings */}
        {logoType === 'static' ? (
          <StaticLogoUploader
            logoPreview={logoPreview}
            setLogoPreview={setLogoPreview}
          />
        ) : (
          <AnimatedLogoSettings
            logoAnimation={logoAnimation}
            setLogoAnimation={setLogoAnimation}
          />
        )}
        
        {/* Site Features Toggle */}
        <SiteFeaturesToggle />
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSaveGeneral} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralSettings;
