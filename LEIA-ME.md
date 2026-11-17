# Site Nexus — mentoria e sistema de encapsulados

**Feito em 16/11/2026.** Site de uma página (+ privacidade) para a mentoria/método de encapsulados, com a identidade NEXUS (fundo #010e21, cobalto #2b66f6, papel claro, mascotes e símbolo oficiais).

## Como abrir
Abra `index.html` no navegador (funciona direto do arquivo).

## O que falta para publicar (decisões do David)
1. **WhatsApp:** em `config.js`, preencher `whatsapp` (DDI+DDD+número, só dígitos). Sem isso o formulário avisa "contato não configurado".
2. **Fatos a confirmar:** formato, duração e valor da mentoria (hoje o site diz que o valor é combinado na conversa); se a Nexus Company é o nome jurídico do rodapé; se quer link de Instagram no rodapé.
3. **Publicar:** criar o repositório público `dlmidiasmkt/nexus-encapsulados`, ligar o Pages e rodar `PUBLICAR NO GITHUB.bat` (a criação de site público fica com o David).

## Honestidade do conteúdo (não mudar sem conferir)
- O Nexus CRM Pro é **versão de teste** (dados de exemplo); o site diz isso na legenda das telas, no rodapé e no FAQ.
- Nenhum depoimento, número de alunos, nota ou resultado financeiro. A calculadora usa valores de exemplo e avisa que não é promessa de ganho.
- Nenhuma promessa de saúde; o FAQ manda seguir Anvisa e regras das plataformas.
- Nenhuma conta de WhatsApp ou preço de produto de terceiros.

## Estrutura
`index.html` · `styles.css` · `app.js` · `config.js` · `privacidade.html` · `assets/` (mascotes 320 px, símbolo, 3 prints do protótipo em 2880×1800).
Direção: "A frase é o layout" (taste skill), ideia: *conversa vira pedido, pedido vira entrega*; coisa viva: a calculadora do mês e os cartões do herói.

## Qualidade
`inspect.mjs` (taste): 0 FAIL em 1440, 768 e 390. Avisos defendidos: sem vídeo (não há clipe honesto do negócio), título "Tudo no mesmo painel" fixo por ~1,7 telas sobre a moldura (texto fica acima e abaixo da imagem, sem cobrir), tamanhos de fonte fluidos no celular.
Movimento sempre ligado (o Windows do David desliga animações); nada fica escondido sem script.
