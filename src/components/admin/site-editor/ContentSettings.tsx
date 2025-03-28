
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Loader2, Check, CheckCircle, LayoutGrid, 
  Upload, Image as ImageIcon, Trash2, Plus, PlusCircle
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from '@/components/ui/switch';

interface SectionItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  enabled: boolean;
}

const ContentSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [heroTitle, setHeroTitle] = useState('Transforme suas ideias em realidade');
  const [heroSubtitle, setHeroSubtitle] = useState('Desenvolvimento de sistemas personalizados para o seu negócio');
  const [heroImage, setHeroImage] = useState('');
  const [featuresList, setFeaturesList] = useState([
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Sistemas Personalizados',
    'Integrações com APIs',
    'Consultoria em TI',
    'Suporte Técnico'
  ]);
  const [sections, setSections] = useState<SectionItem[]>([
    {
      id: '1',
      title: 'Sobre Nós',
      description: 'Conheça nossa história e missão.',
      enabled: true
    },
    {
      id: '2',
      title: 'Serviços',
      description: 'Conheça os serviços que oferecemos.',
      enabled: true
    },
    {
      id: '3',
      title: 'Portfólio',
      description: 'Veja nossos trabalhos recentes.',
      image: '',
      enabled: false
    }
  ]);

  const handleSaveContent = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conteúdo atualizado",
        description: "O conteúdo do site foi atualizado com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...featuresList];
    newFeatures[index] = value;
    setFeaturesList(newFeatures);
  };

  const addFeature = () => {
    setFeaturesList([...featuresList, 'Nova funcionalidade']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...featuresList];
    newFeatures.splice(index, 1);
    setFeaturesList(newFeatures);
  };
  
  const handleSectionChange = (id: string, field: keyof SectionItem, value: any) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };
  
  const addSection = () => {
    const newId = String(sections.length + 1);
    setSections([...sections, {
      id: newId,
      title: 'Nova Seção',
      description: 'Descrição da nova seção',
      enabled: true
    }]);
  };
  
  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };
  
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    const url = URL.createObjectURL(file);
    setHeroImage(url);
    
    toast({
      title: "Imagem carregada",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração do Site</CardTitle>
        <CardDescription>
          Edite o conteúdo e a estrutura do seu site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible defaultValue="hero">
          <AccordionItem value="hero">
            <AccordionTrigger className="text-base font-medium">Seção Hero</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Título do Hero</Label>
                <Input 
                  id="hero-title" 
                  value={heroTitle} 
                  onChange={(e) => setHeroTitle(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtítulo do Hero</Label>
                <Textarea 
                  id="hero-subtitle" 
                  value={heroSubtitle} 
                  onChange={(e) => setHeroSubtitle(e.target.value)} 
                  rows={2}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Imagem do Hero</Label>
                <div className="border-2 border-dashed border-border rounded-md p-4 space-y-3">
                  <div className="flex flex-col items-center justify-center">
                    {heroImage ? (
                      <div className="w-full bg-gray-50 rounded-md mb-2 overflow-hidden">
                        <img src={heroImage} alt="Hero" className="max-h-40 w-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex gap-1 items-center"
                        onClick={() => document.getElementById('hero-image-upload')?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                        <input
                          id="hero-image-upload"
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          className="hidden"
                          onChange={handleHeroImageUpload}
                        />
                      </Button>
                      
                      {heroImage && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex gap-1 items-center text-destructive"
                          onClick={() => setHeroImage('')}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remover</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="features">
            <AccordionTrigger className="text-base font-medium">Funcionalidades</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Lista de Funcionalidades</Label>
                <Button variant="outline" size="sm" onClick={addFeature}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {featuresList.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input 
                      value={feature} 
                      onChange={(e) => handleFeatureChange(index, e.target.value)} 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFeature(index)}
                      className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="sections">
            <AccordionTrigger className="text-base font-medium">Seções do Site</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-6">
              <div className="flex items-center justify-between">
                <Label>Gerenciar Seções</Label>
                <Button variant="outline" size="sm" onClick={addSection}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Seção
                </Button>
              </div>
              
              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id} className="border rounded-md p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{section.title}</h4>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={section.enabled}
                          onCheckedChange={(checked) => 
                            handleSectionChange(section.id, 'enabled', checked)
                          }
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 h-8 w-8"
                          onClick={() => removeSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`section-title-${section.id}`}>Título</Label>
                        <Input 
                          id={`section-title-${section.id}`}
                          value={section.title}
                          onChange={(e) => 
                            handleSectionChange(section.id, 'title', e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`section-desc-${section.id}`}>Descrição</Label>
                        <Textarea 
                          id={`section-desc-${section.id}`}
                          value={section.description}
                          onChange={(e) => 
                            handleSectionChange(section.id, 'description', e.target.value)
                          }
                          rows={2}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveContent} 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando Configurações...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Salvar Configurações do Site
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentSettings;
