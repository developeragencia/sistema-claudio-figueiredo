
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Image, Upload, RefreshCw, Trash2 } from 'lucide-react';

interface ImageSettingsProps {
  faviconPreview: string;
  setFaviconPreview: (value: string) => void;
  bannerPreview: string;
  setBannerPreview: (value: string) => void;
}

const ImageSettings: React.FC<ImageSettingsProps> = ({
  faviconPreview,
  setFaviconPreview,
  bannerPreview,
  setBannerPreview,
}) => {
  const { toast } = useToast();

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type and size
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 1 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O favicon deve ter no máximo 1MB.",
        variant: "destructive",
      });
      return;
    }
    
    const url = URL.createObjectURL(file);
    setFaviconPreview(url);
    
    toast({
      title: "Favicon carregado",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type and size
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O banner deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    const url = URL.createObjectURL(file);
    setBannerPreview(url);
    
    toast({
      title: "Banner carregado",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Favicon do Site</Label>
        <div className="border-2 border-dashed border-border rounded-md p-4 space-y-3">
          <div className="flex flex-col items-center justify-center">
            {faviconPreview && (
              <div className="p-2 bg-gray-50 rounded-md mb-2">
                <img src={faviconPreview} alt="Favicon" className="h-16 w-16" />
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex gap-1 items-center"
                onClick={() => document.getElementById('favicon-upload')?.click()}
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
                <input
                  id="favicon-upload"
                  type="file"
                  accept=".ico,.png,.svg"
                  className="hidden"
                  onChange={handleFaviconUpload}
                />
              </Button>
              
              {faviconPreview !== '/favicon.ico' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex gap-1 items-center text-destructive"
                  onClick={() => setFaviconPreview('/favicon.ico')}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restaurar</span>
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            <p>Formatos recomendados: ICO, PNG, SVG</p>
            <p>Tamanho ideal: 32x32 ou 64x64 pixels</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label>Banner Principal</Label>
        <div className="border-2 border-dashed border-border rounded-md p-4 space-y-3">
          <div className="flex flex-col items-center justify-center">
            {bannerPreview ? (
              <div className="w-full bg-gray-50 rounded-md mb-2 overflow-hidden">
                <img src={bannerPreview} alt="Banner" className="max-h-48 w-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                <Image className="w-12 h-12 text-gray-300" />
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex gap-1 items-center"
                onClick={() => document.getElementById('banner-upload')?.click()}
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
                <input
                  id="banner-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={handleBannerUpload}
                />
              </Button>
              
              {bannerPreview && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex gap-1 items-center text-destructive"
                  onClick={() => setBannerPreview('')}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remover</span>
                </Button>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            <p>Formatos suportados: JPG, PNG, WEBP</p>
            <p>Resolução recomendada: 1920x600 pixels</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSettings;
