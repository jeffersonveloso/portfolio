import type { Portfolio } from "@/domain/portfolio/portfolio";

// The portfolio's content in Brazilian Portuguese, for recruiters in Brazil.
// It tells the same facts as en.ts (a content-contract test holds the two
// together), so a change to one belongs in both. Job titles stay in English,
// as the Brazilian tech market writes them.
export const ptBR: Portfolio = {
  profile: {
    name: "Jefferson Veloso",
    role: "Full Stack Software Engineer & Tech Lead",
    description:
      "Full Stack Software Engineer e Tech Lead com mais de 9 anos criando produtos SaaS e integrações ERP/CRM em TypeScript, Node.js, NestJS, Angular e Next.js. Disponível para vagas remotas.",
    summary:
      "Mais de 9 anos conectando sistemas de negócio com TypeScript, Node.js e NestJS. Trabalho do Brasil (UTC−3) e estou disponível para vagas remotas de Full Stack e Software Engineer.",
    tagline: "Software que conecta os sistemas que a empresa já usa.",
    bio: "Sou Full Stack Software Engineer e Tech Lead, com mais de 9 anos de experiência. Hoje trabalho como Full Stack Software Engineer na Valueva, um SaaS de valuation e gestão baseada em valor com um agente de IA embarcado, e entrego projetos de integração e automação para empresas como PJ.",
    availability: "Disponível para vagas remotas de Full Stack e Software Engineer.",
    facts: { experience: "9+ anos", basedIn: "Brasil · UTC−3", english: "B2 · curso em Londres" },
    location: { region: "Minas Gerais", country: "Brasil", countryCode: "BR", timezone: "UTC−3" },
    languages: [
      { name: "Inglês", level: "B2", code: "en" },
      { name: "Português", level: "nativo", code: "pt-BR" },
    ],
    photo: { src: "/images/jefferson-veloso-portrait.jpg", width: 880, height: 1100 },
    // The CV is in English; point this at a Portuguese PDF in public/ once
    // there is one.
    cv: "/Jefferson_Veloso_CV.pdf",
    contact: {
      email: "jeffersonveloso_6@hotmail.com",
      emailSubject: "Vaga remota — vamos conversar",
      linkedin: "https://www.linkedin.com/in/jefferson-veloso-462195b1",
      github: "https://github.com/jeffersonveloso",
      whatsapp: {
        display: "+55 31 99381-8360",
        digits: "5531993818360",
        greeting: "Olá, Jefferson! Vi seu portfólio e gostaria de conversar sobre uma vaga.",
      },
    },
  },

  // Single words without accents, so they can be typed on any keyboard.
  sections: [
    { id: "skills", label: "Habilidades" },
    { id: "work", label: "Projetos" },
    { id: "process", label: "Processo" },
    { id: "experience", label: "Carreira" },
    { id: "contact", label: "Contato" },
  ],

  topSkills: [
    "TypeScript",
    "Node.js",
    "NestJS",
    "Angular",
    "Next.js",
    "Python",
    "APIs REST",
    "Docker",
    "Agentes de IA",
    "RAG / integração com LLM",
    "Clean Architecture",
    "Omie ERP",
    "Zoho CRM",
    "Code review",
    "Comunicação",
  ],

  skills: [
    { group: "Programação", items: ["TypeScript", "JavaScript", "Python"] },
    { group: "Back-end", items: ["Node.js", "NestJS", "Flask", "APIs REST", "Webhooks"] },
    { group: "Front-end e mobile", items: ["Next.js", "React", "Angular", "Ionic", "PWA", "Tailwind CSS"] },
    { group: "IA", items: ["Agentes de IA", "RAG", "Integração com LLM", "Code review com IA (CodeRabbit)"] },
    { group: "Dados e infraestrutura", items: ["SQLite", "Docker", "Keycloak"] },
    { group: "Integrações", items: ["Omie ERP", "Zoho CRM", "NF-e"] },
    { group: "Testes", items: ["Vitest", "Playwright"] },
    {
      group: "Práticas",
      items: [
        "Clean Architecture",
        "Desenvolvimento orientado a especificação",
        "Code review",
        "Liderança técnica",
        "Mentoria",
      ],
    },
  ],

  capabilities: [
    {
      title: "Integração de sistemas",
      body: "Conecto ERPs, CRMs e ferramentas internas para que os dados circulem sozinhos. A maior parte das minhas integrações liga o Omie ERP ao Zoho CRM, com as regras de negócio em código legível e testado.",
      tools: ["APIs REST", "Webhooks", "Omie ERP", "Zoho CRM"],
    },
    {
      title: "Produtos full stack",
      body: "Construo produtos SaaS e MVPs de ponta a ponta em TypeScript, do modelo de dados e da API até a interface que as pessoas usam todos os dias.",
      tools: ["Node.js", "NestJS", "Angular", "Next.js", "Python"],
    },
    {
      title: "Liderança técnica",
      body: "Tomo decisões de arquitetura, divido o trabalho em tarefas claras, reviso código e oriento outros desenvolvedores para que o time entregue com confiança.",
      tools: ["Arquitetura", "Code review", "Mentoria"],
    },
    {
      title: "Entrega assistida por IA",
      body: "Trabalho com desenvolvimento orientado a especificação e IA em cada etapa, e levo IA para dentro dos produtos: a Valueva tem um assistente agêntico fundamentado em RAG.",
      tools: ["Agentes de IA", "RAG", "Integração com LLM", "CodeRabbit"],
    },
  ],

  projects: [
    {
      slug: "valueva",
      name: "Valueva",
      summary:
        "SaaS de valuation e gestão baseada em valor, com um agente de IA embarcado, para pequenas e médias empresas.",
      body: "Como Full Stack Software Engineer, construo a plataforma: valuation de empresas, acompanhamento mensal do valor, metas e planos de ação para PMEs, BPOs financeiros e consultorias. Ela traz a Eva, uma IA agêntica embarcada e fundamentada por RAG nos dados de cada empresa: a Eva responde com evidências citadas, propõe planos de ação que só rodam depois que o usuário aprova e envia relatórios proativos e agendados.",
      role: "Engenharia de software full stack",
      stack: ["Next.js", "NestJS", "Agente de IA", "RAG"],
      period: { from: 2025 },
      stage: "Demo com usuários reais",
      link: { href: "https://app.valueva.com.br", label: "Acessar Valueva" },
      highlights: ["EVA", "RAG", "KPI", "Agente IA", "Valor"],
      accent: "green",
    },
    {
      slug: "conciliador",
      name: "Conciliador",
      summary:
        "Conciliação bancária para escritórios de contabilidade: do extrato ao lançamento contábil, sem planilha no meio do caminho.",
      body: "Importa extratos OFX, CSV e PDF (com OCR), aplica regras reutilizáveis para classificar cada transação no plano de contas e envia os lançamentos revisados ao sistema contábil. A revisão acontece em uma fila única, onde cada decisão fica rastreável.",
      role: "Criação e engenharia full stack",
      stack: ["Next.js", "NestJS", "Keycloak", "OCR"],
      stage: "MVP no ar",
      link: { href: "https://app.jfvsofthouse.com", label: "Acessar Conciliador" },
      highlights: ["OFX", "CSV", "PDF", "OCR", "Regras"],
      accent: "purple",
    },
    {
      slug: "english-in-class",
      name: "English in Class",
      summary: "Um curso de inglês pronto para professores, com um app para os alunos que funciona offline.",
      body: "Professores recebem um livro digital, PDFs para imprimir, áudios com transcrição, exercícios e correção por rubrica. Alunos entram com o código da turma, sem precisar de e-mail, e estudam no celular mesmo sem conexão. O site está disponível em inglês, português e espanhol.",
      role: "Criação e engenharia full stack",
      stack: ["Next.js", "NestJS", "PWA", "i18n"],
      stage: "MVP no ar",
      link: { href: "https://english.jfvsofthouse.com/pt-BR", label: "Acessar English in Class" },
      highlights: ["EN", "PT", "ES", "PWA", "Offline"],
      accent: "yellow",
    },
  ],

  // From the owner's own account of the project (docs/), with the client's
  // permission. The screenshots have customer and waiter names blurred.
  caseStudy: {
    slug: "bistro",
    name: "Bistrô Orders Manager",
    summary: "Fim do papel, e refeições prontas em cerca de 40% menos tempo.",
    problem:
      "O Bistrô Vó Ziluca, um café diurno, tinha acabado de abrir, com duas cozinhas preparando pratos diferentes. O sistema dos garçons imprimia cada pedido em um único papel, e no horário de pico era difícil fixar os pedidos em um quadro e ainda riscar os itens que não eram daquela cozinha. O papel molhava, ficava difícil de ler ou se perdia, e a produção das duas cozinhas sofria.",
    solution:
      "Um gerenciador de pedidos que recebe os pedidos do sistema dos garçons por webhook, mapeia cada item do cardápio para a cozinha responsável e divide cada pedido em uma comanda por cozinha. As comandas mostram quem registrou o pedido, há quanto tempo ele espera e as observações em destaque. Cada cozinha acompanha todos os pratos do pedido, os seus e os da outra cozinha, para que a mesa seja servida de uma vez, e a gerência acompanha todas as cozinhas em um único quadro.",
    result:
      "O tempo de produção das refeições caiu cerca de 40%, e os pedidos não são mais impressos. Os pratos chegam juntos à mesa, os transtornos com clientes diminuíram consideravelmente e a operação ficou mais tranquila para toda a equipe.",
    role: "Criação e engenharia full stack",
    client: "Bistrô Vó Ziluca",
    stack: ["Next.js", "NestJS", "SQLite", "Webhooks"],
    stage: "Em produção",
    highlights: [
      ["Webhook", "Dividir", "Cozinha 1"],
      ["Kanban", "Obs.", "Cozinha 2"],
    ],
    accent: "orange",
    screenshots: [
      {
        src: "/images/bistro/sync-board.png",
        width: 1339,
        height: 1150,
        title: "Sync board",
        alt: "O sync board: Cozinha 1 e Cozinha 2 lado a lado, cada uma com as colunas Em preparo e Pronto cheias de comandas. Cada comanda mostra o número do pedido, o garçom, os minutos desde a chegada e o andamento da outra cozinha no mesmo pedido.",
      },
      {
        src: "/images/bistro/order-detail.png",
        width: 1273,
        height: 602,
        title: "Detalhe do pedido",
        alt: "O detalhe de um pedido na Cozinha 1: o item dela, ainda em preparo, com o botão Marcar pronto, ao lado do item que a Cozinha 2 já terminou para o mesmo pedido.",
      },
    ],
    screenshotsCaption: "O sync board e o detalhe de um pedido. Os nomes de clientes e garçons estão borrados.",
  },

  engagements: [
    {
      name: "Cryobras",
      body: "Construí toda a integração entre o Zoho CRM e o Omie ERP: os pedidos de venda vão do Zoho para o Omie, e os registros de baixa e as NF-e voltam para cada pedido no Zoho. Também construí o painel administrativo que adiciona as empresas do grupo à integração, atualiza os mapeamentos dos módulos e consulta os registros de cada módulo integrado.",
      role: "Desenvolvimento da integração",
    },
    {
      name: "VMI Security",
      body: "Gerador de propostas com configuração de máquinas, integrado ao Zoho CRM, que substituiu um processo feito em planilhas. Também revisei as alterações dos outros desenvolvedores.",
      role: "Liderança técnica e desenvolvimento full stack",
    },
    {
      name: "Replicação de lançamentos no Omie",
      body: "Produto próprio, usado por várias empresas, que replica lançamentos financeiros entre contas do Omie.",
      role: "Criação do produto",
    },
  ],

  workflow: [
    {
      label: "PRD",
      title: "Definir",
      body: "Escrever os requisitos do produto: o problema, os usuários e o que significa estar pronto.",
    },
    {
      label: "Spec",
      title: "Projetar",
      body: "Transformar o PRD em uma especificação técnica: modelo de dados, APIs, casos de borda e riscos.",
    },
    {
      label: "Tarefas",
      title: "Planejar",
      body: "Dividir a especificação em tarefas pequenas, que podem ser construídas e revisadas uma a uma.",
    },
    {
      label: "Código",
      title: "Implementar",
      body: "Implementar cada tarefa com assistência de IA, seguindo a Clean Architecture.",
    },
    {
      label: "Revisão",
      title: "Revisar",
      body: "Code review com IA em cada pull request usando o CodeRabbit, além da revisão das alterações de outros desenvolvedores.",
    },
    {
      label: "Entrega",
      title: "Entregar",
      body: "Lançar para usuários reais e levar o que aprendemos para o próximo PRD.",
    },
  ],

  experience: [
    {
      company: "Valueva",
      role: "Full Stack Software Engineer",
      period: { from: 2025 },
      points: [
        "Transformo requisitos de negócio em decisões de arquitetura e implementação.",
        "Construo e evoluo as funcionalidades de valuation, KPIs, metas e planos de ação.",
        "Desenvolvo a Eva, a IA agêntica embarcada da plataforma, fundamentada por RAG nos dados de cada empresa.",
        "Conduzo o desenvolvimento orientado a especificação com IA no planejamento, na implementação e no code review.",
      ],
    },
    {
      company: "JFV Softhouse",
      role: "Integration Developer & Tech Lead (PJ)",
      period: { from: 2022 },
      points: [
        "Integrações de sistemas com foco em Omie ERP e Zoho CRM, além de automações financeiras e operacionais.",
        "Aplicações web sob medida, produtos SaaS e MVPs para clientes.",
        "Liderança técnica, gestão de projetos e consultoria em IA para automação.",
      ],
    },
    {
      company: "Agruppa Soluções em BackOffice",
      role: "Full Stack Developer",
      period: { from: 2017, to: 2022 },
      points: [
        "Construí e evoluí o app de pedidos de compra e cotações, com fluxo de aprovação do gestor, como app mobile e PWA em Ionic 5.",
        "Mantive e evoluí a API REST do projeto em NestJS, integrada ao Omie ERP.",
        "Mantive por dois anos uma API em Python construída com Flask.",
      ],
    },
  ],

  education: [
    { title: "Tecnologia em Sistemas de Computação", place: "Centro Universitário Una" },
    { title: "Clean Code, Clean Architecture e IA para Devs", place: "Branas.io" },
    { title: "General English Intensive, out. 2024 — jan. 2025", place: "Stafford House International, Londres" },
  ],
};
