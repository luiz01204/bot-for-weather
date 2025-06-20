# 🤖 WhatsApp Bot - Baileys + TypeScript

Um bot de WhatsApp construído com [Baileys](https://github.com/WhiskeySockets/Baileys) e TypeScript, modular, seguro e organizado por camadas.  
Atualmente suporta comandos como previsão do tempo.

---

## 🚀 Tecnologias usadas

- TypeScript  
- Baileys (WhatsApp Web API)  
- Qrcode-terminal  
- Chalk  
- Node.js  
- dotenv  
- axios  

---

## 📁 Estrutura do projeto

```
src/
├── commands/        # Comandos do bot (!hoje, !amanha, etc.)
├── services/        # Lógica de negócio (ex: consumo de APIs)
├── utils/           # Funções auxiliares (ex: delay, logger)
└── index.ts         # Ponto de entrada
```

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/whatsapp-bot.git
cd whatsapp-bot
npm install
```

---

## 🛠️ Configuração

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```
HG_API_KEY=sua_chave_aqui
```

Você pode obter sua chave gratuita de API em:  
🌐 [https://hgbrasil.com/status/weather](https://hgbrasil.com/status/weather)

---

## ▶️ Executando o bot

```bash
npm start
```

Será exibido um QR Code no terminal para conectar o bot ao seu WhatsApp.

---

## 💬 Comandos disponíveis

- `Menu` – Mostra as opções disponíveis.  
- `!info` – Informações do bot.  
- `!hoje <cidade>` – Previsão do tempo para hoje.  
- `!amanha <cidade>` – Previsão para amanhã.  
- `!depoisdeamanha <cidade>` – Previsão para depois de amanhã.

> ✅ *As cidades devem ser escritas com o nome completo e, de preferência, com acentos (ex: Balneário Camboriú).*

---

## 🔒 Segurança

- QR gerado apenas localmente na pasta `auth`.  
- Credenciais e chaves em `.env` (não suba pro GitHub!).  
- Estrutura modular, segura e fácil de manter.

---

## 📌 Observações

- Evite mandar muitos comandos seguidos (anti-flood).  
- Use número de teste, nunca sua conta principal.  
- Evite grupos públicos.

---

## 🧪 Testes

Ainda não implementado. Planejado para versões futuras.

---

## 🧑‍💻 Autor

Luiz Antônio dos Santos  
[LinkedIn](https://www.linkedin.com/in/luiz-ant%C3%B4nio-dos-santos-machado-393bb314b/) • [GitHub](https://github.com/luiz01204)

---

## 📄 Licença

MIT