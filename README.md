# 🤖 WhatsApp Bot - Baileys + TypeScript

Um bot de WhatsApp construído com [Baileys](https://github.com/WhiskeySockets/Baileys) e TypeScript, modular, seguro e organizado por camadas.  
Atualmente suporta comandos como previsão do tempo, mensagens automáticas e muito mais.

---

## 🚀 Tecnologias usadas

- TypeScript
- Baileys (WhatsApp Web API)
- Qrcode-terminal
- CLalk
- Node.js
- dotenv
- axios

---

## 📁 Estrutura do projeto

```
src/
├── commands/        # Comandos do bot (!hoje, !amanha, etc.)
├── services/        # Lógica de negócio (ex: consumo de APIs)
├── utils/           # Funções auxiliares (formatar texto, validação)
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

Crie um arquivo `.env` na raiz com:

```
WEATHER_API_KEY=suachave
```

Criei sua chave no site da API: [weatherapi](https://www.weatherapi.com/)

---

## ▶️ Executando o bot

```bash
npm start
```

Será gerado um QR Code no terminal para conectar no WhatsApp.

---

## 💬 Comandos disponíveis

- `Menu` – Opções disponíveis.
- `!info` – Informações do bot.
- `!hoje` – Previsão do tempo para hoje
- `!amanha` – Previsão para amanhã
- `!depoisdeamanha` – Previsão para o dia depois de amanhã

---

## 🔒 Segurança

- QR gerado apenas localmente em uma pasta chamada `auth`
- Dados sensíveis via `.env` (não subir pro GitHub!)
- Comandos organizados e validados

---

## 📌 Observações

- Evite floodar comandos, pode gerar ban
- Use número de teste, nunca o principal
- Evite grupos públicos

---

## 🧪 Testes

Ainda não implementado. Planejado para futura versão.

---

## 🧑‍💻 Autor

Luiz Antônio dos Santos  
[LinkedIn](https://www.linkedin.com/in/luiz-ant%C3%B4nio-dos-santos-machado-393bb314b/) | [GitHub](https://github.com/luiz01204)

---

## 📄 Licença

MIT