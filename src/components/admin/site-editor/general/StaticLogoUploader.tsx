
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

interface StaticLogoUploaderProps {
  logoPreview: string;
  setLogoPreview: (url: string) => void;
}

const StaticLogoUploader = ({ logoPreview, setLogoPreview }: StaticLogoUploaderProps) => {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem (JPG, PNG, SVG).",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é de 2MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    
    toast({
      title: "Logo carregado",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  const handleRemoveLogo = () => {
    setLogoPreview('/favicon.svg');
    
    toast({
      title: "Logo removido",
      description: "O logo foi redefinido para o padrão.",
    });
  };

  return (
    <div className="space-y-3">
      <Label>Logo do Site</Label>
      <div className="border-2 border-dashed border-border rounded-md p-6 space-y-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {logoPreview ? (
            <div className="relative w-48 h-24 flex items-center justify-center">
              <img 
                src={logoPreview} 
                alt="Preview do logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-md bg-primary/10 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-primary/40" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-1 items-center"
              onClick={() => document.getElementById('logo-upload')?.click()}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
              <input
                id="logo-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.svg,.webp,.gif"
                className="hidden"
                onChange={handleFileUpload}
              />
            </Button>
            
            {logoPreview && logoPreview !== '/favicon.svg' && (
              <Button 
                variant="outline" 
                size="sm"
                className="flex gap-1 items-center text-destructive"
                onClick={handleRemoveLogo}
              >
                <Trash2 className="w-4 h-4" />
                <span>Remover</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          <p>Formatos suportados: JPG, PNG, SVG, WEBP, GIF</p>
          <p>Tamanho máximo: 2MB</p>
        </div>
      </div>
    </div>
  );
};

export default StaticLogoUploader;
