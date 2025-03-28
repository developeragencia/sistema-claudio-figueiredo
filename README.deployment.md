
# Guia de Deployment para Hostinger

## Pré-requisitos
- Conta na Hostinger
- Node.js e npm instalados localmente
- Acesso FTP ou ao File Manager da Hostinger

## Passo a passo para deployment

### 1. Preparar o projeto para produção

```bash
# Instalar dependências
npm install

# Construir o projeto para produção
npm run build
```

### 2. Upload dos arquivos para a Hostinger

Existem três opções para o upload:

#### Opção 1: Upload manual via File Manager da Hostinger
1. Faça login no painel de controle da Hostinger
2. Navegue até "Hospedagem de Sites" > Seu domínio > "Gerenciador de Arquivos"
3. Navegue até a pasta raiz do seu domínio (geralmente public_html)
4. Faça o upload de todo o conteúdo da pasta `dist` para esta pasta
   - Você pode fazer upload de arquivos individualmente ou
   - Comprimir a pasta `dist` em um arquivo zip, fazer upload e depois extrair no servidor

#### Opção 2: Upload manual via FTP
1. Use um cliente FTP (como FileZilla, CyberDuck ou WinSCP)
2. Conecte-se ao seu servidor usando as credenciais FTP fornecidas pela Hostinger
   - Host: geralmente ftp.seudominio.com
   - Nome de usuário e senha: fornecidos pela Hostinger
   - Porta: 21 (padrão)
3. Navegue até a pasta raiz do seu domínio (geralmente public_html)
4. Faça o upload de todo o conteúdo da pasta `dist` para esta pasta

#### Opção 3: Usando o script de deploy
1. Execute o script de deploy incluído no projeto:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```
2. Isso criará um arquivo `deploy.zip`
3. Faça upload deste arquivo zip para o servidor usando o File Manager
4. Extraia o conteúdo na pasta raiz do seu domínio (public_html)

### 3. Configuração do servidor

Para que a aplicação React funcione corretamente com rotas no lado do cliente (client-side routing), você precisa configurar o servidor:

#### Configuração para Apache (padrão na Hostinger)

O arquivo `.htaccess` já está incluído no projeto e deve ser carregado automaticamente durante o upload. Este arquivo contém as seguintes regras:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Caso o arquivo `.htaccess` não esteja funcionando corretamente:
1. Verifique se o mod_rewrite está ativado (geralmente está na Hostinger)
2. Verifique se o arquivo `.htaccess` foi carregado corretamente
3. Contate o suporte da Hostinger se persistirem os problemas

### 4. Configuração de SSL/HTTPS (Opcional, mas recomendado)

1. No painel de controle da Hostinger, vá para "Hospedagem de Sites" > Seu domínio > "SSL"
2. Ative o SSL gratuito Let's Encrypt
3. Configure o redirecionamento HTTPS para garantir que todos os usuários utilizem a versão segura do site

### 5. Teste a aplicação

Após o upload, visite o seu domínio para verificar se a aplicação está funcionando corretamente:
- Verifique se todas as páginas carregam sem erros
- Teste a navegação entre diferentes rotas
- Verifique se os recursos estáticos (imagens, CSS, JavaScript) estão carregando

### 6. Solução de problemas comuns

- **Erro 404 nas rotas**: Verifique se o arquivo `.htaccess` está corretamente configurado.
- **Página em branco**: Abra o console do navegador (F12) para verificar se há erros de JavaScript.
- **Recursos não carregando**: Confirme que as referências aos recursos estão usando caminhos relativos corretos.
- **Erro na API**: Verifique se as URLs da API estão configuradas corretamente e se apontam para o ambiente de produção.

### 7. Atualizações futuras

Para atualizar seu site após modificações:

1. Reconstrua o projeto:
   ```bash
   npm run build
   ```
2. Repita o processo de upload apenas dos arquivos modificados ou de todo o conteúdo da pasta `dist`
3. Limpe o cache do navegador para ver as atualizações

## Configurações adicionais na Hostinger

### Cache e Desempenho
- Ative o cache via Hostinger LiteSpeed Cache no painel de controle para melhorar o desempenho
- Configure a compressão Gzip/Brotli nas configurações avançadas do seu domínio

### Configuração de Email (Opcional)
Se seu aplicativo envia emails:
1. Configure as contas de email na seção "Email" do painel da Hostinger
2. Atualize as configurações SMTP no seu aplicativo

### Backup do Site
É recomendável configurar backups regulares:
1. Utilize a funcionalidade de backups automáticos da Hostinger
2. Mantenha backups locais do seu código-fonte e banco de dados

## Notas importantes

- Para suporte específico da Hostinger, utilize o chat ao vivo ou tickets de suporte no painel de controle
- Certifique-se de que seu plano de hospedagem comporta o tamanho e tráfego esperados para seu aplicativo
- Monitore regularmente o desempenho e o uso de recursos do seu site no painel da Hostinger

## Dicas de otimização

- Habilite a compressão de arquivos
- Configure cabeçalhos de cache adequados
- Otimize imagens e assets antes do deploy
- Considere usar uma CDN para conteúdo estático
