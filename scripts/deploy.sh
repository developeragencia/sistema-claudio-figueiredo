
#!/bin/bash

# Script para deploy na Hostinger

# 1. Construir o projeto
echo "Construindo o projeto..."
npm run build

# 2. Compactar a pasta dist para upload
echo "Compactando arquivos para upload..."
cd dist
zip -r ../deploy.zip *
cd ..

echo "Arquivo deploy.zip criado com sucesso!"
echo "Agora você pode fazer o upload deste arquivo para o seu servidor de hospedagem na Hostinger."
echo "Lembre-se de extrair o conteúdo do arquivo zip na pasta raiz do seu domínio no servidor."
