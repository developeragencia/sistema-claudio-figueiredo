
import { useState, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const useFileUpload = () => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFormatClick = (format: string) => {
    setSelectedFormat(format);
    setIsModalOpen(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    // In a real application, you would upload the file to your server here
    // For demo purposes, we'll simulate the upload with a timeout
    toast({
      title: "Iniciando importação",
      description: `Importando arquivo: ${file.name}`,
    });

    setTimeout(() => {
      // Simulate successful upload after 2 seconds
      toast({
        title: "Arquivo importado com sucesso",
        description: `O arquivo ${file.name} foi importado com sucesso.`,
        variant: "success"
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFormat(null);
  };

  const handleModalUpload = (file: File) => {
    handleFileUpload(file);
    closeModal();
  };

  return {
    selectedFormat,
    isModalOpen,
    fileInputRef,
    handleFormatClick,
    handleUploadClick,
    handleFileChange,
    closeModal,
    handleModalUpload
  };
};
