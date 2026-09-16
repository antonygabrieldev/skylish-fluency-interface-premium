# Checklist antes de publicar

Esta cópia foi preparada para um repositório público.

## Alterações feitas
- `firebase/firebase-config.js`: identificadores do projeto foram substituídos por placeholders.
- `js/cloudinary-config.js`: cloud name e unsigned upload preset foram substituídos por placeholders.
- `.gitignore`: adicionadas proteções básicas contra arquivos locais e credenciais privadas.
- `README.md`: criada apresentação profissional do projeto.

## Atenção
A configuração Web do Firebase é normalmente usada no cliente e, por si só, não funciona como um segredo de servidor. A segurança real depende das regras de Firestore/Storage/Auth.

O upload preset unsigned do Cloudinary pode ser usado por clientes sem autenticação. Antes de manter um preset público em produção, restrinja tipos/tamanho de arquivo e demais opções no Cloudinary. Se um preset foi exposto sem as restrições desejadas, considere substituí-lo.

Nunca publique:
- Firebase Admin service-account JSON
- chaves privadas
- API Secret do Cloudinary
- senhas
- tokens privados
- arquivos `.env` com segredos
