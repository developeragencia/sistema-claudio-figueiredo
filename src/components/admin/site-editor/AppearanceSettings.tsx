
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Check } from 'lucide-react';

// Import the custom components
import ColorSettings from './appearance/ColorSettings';
import ImageSettings from './appearance/ImageSettings';
import LayoutSettings from './appearance/LayoutSettings';
import { useAppearanceForm } from './appearance/useAppearanceForm';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const formState = useAppearanceForm();
  
  const {
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
    faviconPreview,
    setFaviconPreview,
    bannerPreview,
    setBannerPreview,
    
    // Layout
    useAnimatedLogo,
    setUseAnimatedLogo,
  } = formState;

  const handleSaveAppearance = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Aparência atualizada",
        description: "As configurações de aparência foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aparência</CardTitle>
        <CardDescription>
          Personalize a aparência do seu site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            <ColorSettings 
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              secondaryColor={secondaryColor}
              setSecondaryColor={setSecondaryColor}
              accentColor={accentColor}
              setAccentColor={setAccentColor}
              headerBgColor={headerBgColor}
              setHeaderBgColor={setHeaderBgColor}
              footerBgColor={footerBgColor}
              setFooterBgColor={setFooterBgColor}
            />
          </TabsContent>
          
          <TabsContent value="images" className="space-y-6">
            <ImageSettings 
              faviconPreview={faviconPreview}
              setFaviconPreview={setFaviconPreview}
              bannerPreview={bannerPreview}
              setBannerPreview={setBannerPreview}
            />
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-4">
            <LayoutSettings 
              useAnimatedLogo={useAnimatedLogo}
              setUseAnimatedLogo={setUseAnimatedLogo}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveAppearance} 
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
              Salvar Aparência
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceSettings;
