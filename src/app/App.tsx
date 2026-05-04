import { motion } from "motion/react";
import imgEquipamentos from "../imports/Body/equipamentos-rack-forgee.png";
import imgAtletaTreinando from "../imports/Body/135a87646d57110c12fda8b9764de32faaccddce.png";
import imgAtletaTreinando1 from "../imports/Body/atleta-costas-forgee.png";
import imgEstruturaInterna from "../imports/Body/65e913fa297303b4fcc8d5d22393893e6b956e92.png";
import imgRodrigoFarias from "../imports/Body/978baaaf70f56ca33ac1fb607419361a243bff2a.png";
import imgAnaLuisa from "../imports/Body/7917b0410322b5b75914d197712fffc242d55c79.png";
import imgBrunoT from "../imports/Body/f374078a3311f864e69180b2fc8568b20d9f2c9e.png";
import imgCamilaD from "../imports/Body/d4a62d52a819ef7d4b7d881577dd8428fdc62a95.png";
import imgHero from "../imports/image.png";
import { useState, useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const espacoTresEixos = [
    {
      step: "01",
      title: "INTENSIDADE",
      body: "O ambiente foi calibrado para elevar. Iluminação, acústica, temperatura — tudo serve ao treino."
    },
    {
      step: "02",
      title: "PRECISÃO",
      body: "Protocolo individualizado desde o dia um. Nenhuma planilha genérica sai daqui."
    },
    {
      step: "03",
      title: "CONTROLE",
      body: "Você define o objetivo. Nós fornecemos o caminho, o espaço e o suporte."
    }
  ] as const;

  const equipmentTopics = [
    "01 · CARDIO & CONDITIONING",
    "02 · FORÇA LIVRE",
    "03 · MÁQUINAS",
    "04 · FUNCIONAL & MOBILITY",
    "05 · INFRAESTRUTURA"
  ];

  const programs = [
    {
      number: "01",
      title: "FORGEE STRENGTH",
      description: "Musculação por periodização. Para quem quer construir massa e entender o próprio corpo. Disponível como treino livre com planilha ou acompanhado com coach.",
      forWho: "Iniciantes a avançados em hipertrofia e força.",
      frequency: "3–5× por semana."
    },
    {
      number: "02",
      title: "FORGEE CONDITIONING",
      badge: "DESTAQUE",
      description: "Sessões de 45 min com circuito de alta intensidade — remo, assault bike, força funcional e potência. Início e fim marcados. Sem improvisar.",
      forWho: "Condicionamento, perda de gordura.",
      schedule: "06H · 07H · 12H · 18H · 19H30"
    },
    {
      number: "03",
      title: "FORGEE MOBILITY",
      description: "Protocolo de mobilidade, postura e cadeia posterior. Não é yoga. É trabalho de corpo para quem treina pesado e não quer se machucar."
    },
    {
      number: "04",
      title: "PERSONAL TRAINING",
      description: "Sessões 1:1 com avaliação completa, protocolo personalizado e revisão a cada 4 semanas. Individual ou em dupla."
    }
  ];

  const plans = [
    {
      name: "LIVRE",
      price: "149",
      features: [
        "Acesso ilimitado 05H–23H",
        "Avaliação física de entrada",
        "Planilha de treino inicial",
        "App FORGEE"
      ]
    },
    {
      name: "PLUS",
      price: "229",
      features: [
        "Tudo do Livre +",
        "2 sessões de Personal/mês",
        "1 aula Conditioning/semana",
        "Revisão de planilha a cada 4 semanas",
        "Acesso ao Mobility"
      ]
    },
    {
      name: "ELITE",
      price: "389",
      badge: "MAIS ESCOLHIDO",
      features: [
        "Tudo do Plus +",
        "4 sessões de Personal/mês",
        "Acesso ilimitado às classes",
        "Bioimpedância mensal",
        "WhatsApp com coach dedicado"
      ]
    }
  ];

  const coaches = [
    {
      name: "Mariana C.",
      specialty: "Personal Trainer",
      cref: "CREF 078342-G/SP",
      image: imgAnaLuisa
    },
    {
      name: "Fernanda R.",
      specialty: "Personal Trainer",
      cref: "CREF 045821-G/SP",
      image: imgRodrigoFarias
    },
    {
      name: "Beatriz N.",
      specialty: "Personal Trainer",
      cref: "CREF 091205-G/SP",
      image: imgBrunoT
    },
    {
      name: "Bruno T.",
      specialty: "Personal Trainer",
      cref: "CREF 063417-G/SP",
      image: imgCamilaD
    }
  ];

  const testimonials = [
    {
      text: "Treinei em academias em São Paulo por anos. A FORGEE é a única que me fez não sentir falta de nenhuma delas.",
      name: "Rafael M.",
      role: "Engenheiro",
      time: "Aluno há 3 anos"
    },
    {
      text: "Entrei querendo perder peso. Fiquei pela comunidade e pela sensação de que alguém realmente acompanha.",
      name: "Juliana T.",
      role: "Professora",
      time: "Aluna há 2 anos"
    },
    {
      text: "A estrutura impressiona. Mas o que me mantém são os profissionais. Nunca fui tão bem orientado.",
      name: "Lucas O.",
      role: "Empresário",
      time: "Aluno há 4 anos"
    }
  ];

  const faqs = [
    {
      question: "Preciso ter experiência?",
      answer: "Não. Todos passam pela avaliação inicial — do iniciante ao atleta. O ponto de partida é individual."
    },
    {
      question: "Posso treinar sozinho?",
      answer: "Sim. A maioria dos alunos treina de forma autônoma com planilha. Coaches estão disponíveis para dúvidas pontuais — não ficam em cima."
    },
    {
      question: "Como funciona o cancelamento?",
      answer: "Avise com 30 dias. Plano encerrado no próximo ciclo. Sem multa, sem justificativa obrigatória."
    },
    {
      question: "Posso visitar antes de assinar?",
      answer: "Sim — e incentivamos. Agende pelo site. Você conhece o espaço, conversa com um coach e faz uma aula experimental gratuita."
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] w-full">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#111111]/90 backdrop-blur-lg shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="font-['Oswald'] font-bold text-2xl text-[#fcfcfc] tracking-tight">
              FORGEE
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#espaco" className="text-[#c2c2c2] hover:text-[#ffd700] transition-colors text-xs font-['Inter'] font-light uppercase tracking-wide">
                Espaço
              </a>
              <a href="#programas" className="text-[#c2c2c2] hover:text-[#ffd700] transition-colors text-xs font-['Inter'] font-light uppercase tracking-wide">
                Programas
              </a>
              <a href="#equipe" className="text-[#c2c2c2] hover:text-[#ffd700] transition-colors text-xs font-['Inter'] font-light uppercase tracking-wide">
                Equipe
              </a>
              <a href="#planos" className="text-[#c2c2c2] hover:text-[#ffd700] transition-colors text-xs font-['Inter'] font-light uppercase tracking-wide">
                Planos
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-[#c2c2c2] px-4 py-2 text-xs font-['Inter'] font-normal uppercase tracking-wide hover:text-[#ffd700] transition-all">
                SOU MEMBRO
              </button>
              <button className="bg-[#ffd700] text-black px-4 py-2 text-xs font-['Inter'] font-semibold uppercase tracking-wide hover:bg-[#d4a800] transition-all">
                AGENDAR VISITA
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-[120px]"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <img
            src={imgHero}
            alt="Atleta treinando"
            className="w-full h-full object-cover object-[80%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60" />
          <div className="absolute top-0 right-0 bottom-0 left-[1px] bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          {/* Fade para a cor da próxima seção (#espaco) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(42vh,420px)] bg-gradient-to-b from-transparent via-[#0a0a0a]/55 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto md:mx-0 w-full text-center md:text-left">
            <motion.div variants={fadeInUp} className="mb-8 md:mb-12">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="h-px w-6 bg-[#ffd700]" />
                <p className="text-white text-[9px] md:text-[10px] font-['Inter'] font-normal tracking-[0.2em] uppercase">
                  TREINOS PROGRESSIVOS E ACOMPANHAMENTO REAL
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="font-['Oswald'] font-bold tracking-[-0.03em] uppercase leading-[0.95] mb-6 md:mb-8">
                <div className="text-white text-4xl md:text-6xl lg:text-[90px] lg:leading-[85px]">SEM MÁGICA</div>
                <div className="text-white text-4xl md:text-6xl lg:text-[90px] lg:leading-[85px]">SEM ATALHOS</div>
                <div className="text-[#ffd700] text-4xl md:text-6xl lg:text-[90px] lg:leading-[85px]">SEM DESCULPAS</div>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[#b0b0b0] text-sm max-w-[497px] mx-auto md:mx-0 font-['Inter'] font-thin leading-relaxed mb-8"
            >
              Um espaço desenhado para quem treina com intenção. Sem distrações. Sem promessas vazias. Só você, o equipamento e o trabalho.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12 items-center sm:items-stretch">
              <button className="bg-[#ffd700] text-black px-8 md:px-12 py-3 md:py-4 font-['Inter'] font-semibold tracking-wide uppercase hover:bg-[#d4a800] transition-all duration-300 text-sm md:text-base shadow-lg shadow-[#ffd700]/20">
                COMEÇAR AGORA
              </button>
              <button className="text-[#c2c2c2] px-8 md:px-12 py-3 md:py-4 font-['Inter'] font-normal tracking-wide uppercase hover:text-white transition-all duration-300 text-sm md:text-base">
                CONHECER O ESPAÇO
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 pt-8 border-t border-[#2a2a2a]">
              {[
                { label: "HORÁRIO", value: "05H–23H" },
                { label: "DIAS", value: "7 DIAS" },
                { label: "ÁREA", value: "1.800M²" },
                { label: "ALUNOS", value: "+1.200" },
                { label: "DESDE", value: "2018" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <div className="text-[#ffd700] font-['Oswald'] font-bold text-xl md:text-2xl mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#6b6b6b] text-xs uppercase tracking-wider font-['Inter']">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quem Somos Section — imagem alinhada ao topo do bloco, ao lado do título (desktop) */}
      <section id="espaco" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:items-start">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-[#ffd700]" />
                <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                  Quem somos
                </span>
              </div>

              <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase text-white mb-6 md:mb-8 lg:mb-8 leading-tight">
                <div>FORJADOS</div>
                <div>PELA</div>
                <div className="text-[#ffd700]">DISCIPLINA.</div>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#b0b0b0] font-['Inter'] leading-relaxed mb-5 text-base md:text-lg">
                A FORGEE nasce dessa certeza: ambiente mediano, resultado mediano. Cada detalhe foi
                pensado para o espaço sumir — ficam treino, foco e progresso.
              </p>

              <div className="bg-[#111111] border-l-4 border-[#ffd700] p-5 md:p-6 mb-5">
                <p className="text-[#ffd700] font-['Inter'] italic text-base md:text-lg">
                  "In silence, the transformation begins."
                </p>
              </div>

              <p className="text-[#b0b0b0] font-['Inter'] leading-relaxed text-base md:text-lg">
                Equipamento sério, equipe presente e silêncio para ouvir o corpo.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 min-w-0"
          >
            <div className="group relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={imgEstruturaInterna}
                alt="Estrutura interna da FORGEE"
                className="h-full w-full object-cover object-top grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-white mix-blend-saturation opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0" />
            </div>
            </motion.div>
        </div>
      </section>

      {/* Três eixos — continuação do conteúdo “O espaço, em três eixos” */}
      <section
        id="tres-eixos"
        aria-labelledby="tres-eixos-heading"
        className="border-t border-[#1f1f1f] bg-[#111111] px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-12 md:mb-16 lg:mb-20"
          >
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <div className="h-px w-8 shrink-0 bg-[#ffd700]" />
              <span className="text-[10px] font-medium uppercase leading-tight tracking-[1.44px] text-[#ffd700] sm:text-xs font-['Inter']">
                O espaço, em três eixos
              </span>
            </div>
            <h2
              id="tres-eixos-heading"
              className="font-['Oswald'] text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Intensidade · precisão ·{" "}
              <span className="text-[#ffd700]">controle</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {espacoTresEixos.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-[#ffd700] sm:p-8"
              >
                <div className="mb-4 flex items-baseline gap-3 border-b border-[#2a2a2a] pb-4">
                  <span className="font-['Oswald'] text-3xl font-bold tabular-nums text-[#2a2a2a] sm:text-4xl">
                    {item.step}
                  </span>
                  <h3 className="font-['Oswald'] text-lg font-bold uppercase tracking-wide text-[#ffd700] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="flex-1 font-['Inter'] text-sm leading-relaxed text-[#b0b0b0] sm:text-base">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#ffd700] transition-all duration-300"
              >
                <p className="text-[#c2c2c2] font-['Inter'] italic text-base md:text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-[#2a2a2a] pt-4">
                  <p className="text-white font-['Oswald'] font-bold text-lg uppercase mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-[#6b6b6b] text-sm font-['Inter']">
                    {testimonial.role} · {testimonial.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section — tópicos 01–05 (lista estática, sem accordion) */}
      <section className="relative overflow-hidden py-16 md:py-24 pl-4 pr-4 md:pl-8 md:pr-8 lg:min-h-[min(92vh,880px)] lg:py-0 lg:pl-10 lg:pr-0 xl:pl-16">
        {/* Fade para a próxima seção: só sobre a coluna da imagem no desktop (não cobre o texto) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent to-[#0a0a0a] md:h-36 lg:inset-x-auto lg:left-[45%] lg:right-0"
          aria-hidden
        />

        <div className="relative z-0 flex min-h-0 flex-col lg:min-h-[min(92vh,880px)] lg:flex-row lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative z-10 flex min-w-0 shrink-0 flex-col lg:w-[45%] lg:max-w-none lg:py-16 lg:pr-8 xl:pr-12"
          >
            <div className="flex items-center gap-4 mb-3 md:mb-4">
              <div className="h-px w-8 bg-[#ffd700]" />
              <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                ESTRUTURA
              </span>
            </div>
            <h2 className="font-['Oswald'] font-bold uppercase tracking-tight leading-[1.05] text-[clamp(1.25rem,4vw,3rem)] lg:text-[clamp(1.75rem,3.2vw,3.25rem)] text-balance">
              <span className="text-white">EQUIPAMENTO QUE NÃO TE </span>
              <span className="text-[#ffd700]">LIMITA.</span>
            </h2>
            <p className="mt-3 md:mt-4 w-[427px] max-w-full text-[#b0b0b0] font-['Inter'] text-sm uppercase leading-relaxed tracking-wide md:text-base mb-8 md:mb-10">
              Cada peça selecionada com um critério: aguentar seu melhor dia todos os dias.
            </p>

            <div className="space-y-0">
              {equipmentTopics.map((title, index) => (
                <div
                  key={index}
                  className="border-b border-[#2a2a2a] py-4 transition-colors hover:bg-[#0a0a0a]/50 md:py-5"
                >
                  <h3 className="font-['Oswald'] text-base font-bold uppercase tracking-tight text-[#ffd700] md:text-lg lg:text-xl">
                    {title}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative mt-10 h-64 w-full shrink-0 lg:mt-0 lg:h-auto lg:min-h-0 lg:w-[55%] lg:flex-1 lg:self-stretch"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 bg-gradient-to-b from-[#111111] to-transparent lg:hidden" aria-hidden />
            <div className="group absolute inset-0 overflow-hidden lg:[mask-image:linear-gradient(90deg,transparent,black_12%)] lg:[-webkit-mask-image:linear-gradient(90deg,transparent,black_12%)]">
              <img
                src={imgEquipamentos}
                alt="Rack de halteres na FORGEE"
                className="h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-white mix-blend-saturation opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0" />
              <div className="pointer-events-none absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:opacity-25" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ffd700]/12 via-transparent to-black/45 opacity-100 transition-opacity duration-500 group-hover:from-[#ffd700]/20 group-hover:to-black/25" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_80%_20%,rgba(255,215,0,0.1),transparent_60%)] transition-opacity duration-500 group-hover:opacity-80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dual Image Section — só desktop/tablet (md+); mobile sem imagens duplas */}
      <section className="hidden md:block px-4 md:px-8 lg:px-16 py-12 md:py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <img
              src={imgAtletaTreinando1}
              alt="Atleta na FORGEE — treino com intensidade"
              className="h-full w-full object-cover transition-[filter] duration-500 ease-out [filter:grayscale(1)] group-hover:[filter:grayscale(0)_sepia(0.22)_saturate(1.12)_brightness(1.06)_hue-rotate(-8deg)]"
            />
            <div className="pointer-events-none absolute -top-1 -left-1 right-0 bottom-0 bg-white mix-blend-saturation opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-0 z-[1] rounded-lg bg-gradient-to-br from-[#ffd700]/25 via-[#ffd700]/5 to-transparent opacity-0 mix-blend-soft-light transition-opacity duration-500 ease-out group-hover:opacity-100" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <img
              src={imgEstruturaInterna}
              alt="Estrutura interna"
              className="h-full w-full object-cover transition-[filter] duration-500 ease-out [filter:grayscale(1)] group-hover:[filter:grayscale(0)_sepia(0.22)_saturate(1.12)_brightness(1.06)_hue-rotate(-8deg)]"
            />
            <div className="pointer-events-none absolute -top-1 -left-1 right-0 bottom-0 bg-white mix-blend-saturation opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-0 z-[1] rounded-lg bg-gradient-to-br from-[#ffd700]/25 via-[#ffd700]/5 to-transparent opacity-0 mix-blend-soft-light transition-opacity duration-500 ease-out group-hover:opacity-100" />
          </motion.div>
        </div>
      </section>

      {/* Programas Section */}
      <section id="programas" className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#ffd700]" />
              <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                O que oferecemos
              </span>
            </div>

            <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase text-white mb-12 leading-tight">
              <div>UM PROTOCOLO</div>
              <div>PARA CADA</div>
              <div className="text-[#ffd700]">OBJETIVO.</div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-8 hover:border-[#ffd700] transition-all duration-300 relative"
              >
                {program.badge && (
                  <div className="absolute top-4 right-4 bg-[#ffd700] text-black px-3 py-1 text-xs font-['Inter'] font-bold uppercase tracking-wide">
                    {program.badge}
                  </div>
                )}
                <div className="text-[#ffd700] font-['Oswald'] text-5xl font-bold mb-4">
                  {program.number}
                </div>
                <h3 className="font-['Oswald'] font-bold text-2xl uppercase text-white mb-4">
                  {program.title}
                </h3>
                <p className="text-[#b0b0b0] font-['Inter'] leading-relaxed mb-4">
                  {program.description}
                </p>
                {program.forWho && (
                  <div className="mb-2">
                    <span className="text-[#ffd700] font-['Inter'] font-semibold text-sm">Para quem é: </span>
                    <span className="text-[#c2c2c2] font-['Inter'] text-sm">{program.forWho}</span>
                  </div>
                )}
                {program.frequency && (
                  <div className="mb-2">
                    <span className="text-[#ffd700] font-['Inter'] font-semibold text-sm">Frequência: </span>
                    <span className="text-[#c2c2c2] font-['Inter'] text-sm">{program.frequency}</span>
                  </div>
                )}
                {program.schedule && (
                  <div>
                    <span className="text-[#ffd700] font-['Inter'] font-semibold text-sm">Turmas: </span>
                    <span className="text-[#c2c2c2] font-['Inter'] text-sm">{program.schedule}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="planos" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#ffd700]" />
              <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                Investimento
              </span>
            </div>

            <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase text-white mb-6 leading-tight">
              <div>SEM MATRÍCULA.</div>
              <div>SEM FIDELIDADE.</div>
              <div className="text-[#ffd700]">SEM ENROLAÇÃO.</div>
            </h2>

            <p className="text-[#b0b0b0] font-['Inter'] text-lg mb-12">
              Mude de plano quando quiser. Cancele com 30 dias. Sem justificativa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-[#111111] border-2 rounded-lg p-8 relative ${
                  plan.badge ? 'border-[#ffd700]' : 'border-[#2a2a2a]'
                } hover:border-[#ffd700] transition-all duration-300`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffd700] text-black px-4 py-1 text-xs font-['Inter'] font-bold uppercase tracking-wide whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-['Oswald'] font-bold text-3xl uppercase text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-[#ffd700] font-['Oswald'] text-5xl font-bold">R$ {plan.price}</span>
                  <span className="text-[#6b6b6b] font-['Inter']">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700] mt-2 shrink-0" />
                      <span className="text-[#c2c2c2] font-['Inter'] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#ffd700] text-black py-3 font-['Inter'] font-semibold uppercase tracking-wide hover:bg-[#d4a800] transition-all">
                  QUERO ESSE PLANO
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="border-t border-[#2a2a2a] pt-12 md:pt-16"
          >
            <p className="mb-6 text-center font-['Inter'] text-xs font-medium uppercase tracking-[1.44px] text-[#ffd700] md:mb-8">
              Condições comerciais
            </p>
            <ul className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 md:mb-12">
              {[
                { title: "Pagamentos", body: "PIX ou cartão em até 3× sem juros." },
                { title: "Cancelamento", body: "Aviso com 30 dias. Sem fidelidade forçada." },
                { title: "Plano anual", body: "15% de desconto sobre a mensalidade à vista." }
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-[#2a2a2a] bg-[#111111] px-5 py-4 text-center sm:text-left md:px-6 md:py-5"
                >
                  <h3 className="mb-2 font-['Oswald'] text-sm font-bold uppercase tracking-wide text-[#ffd700]">
                    {item.title}
                  </h3>
                  <p className="font-['Inter'] text-sm leading-relaxed text-[#9a9a9a]">{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-[#2a2a2a] border-l-4 border-l-[#ffd700] bg-[#111111] transition-colors duration-300 hover:border-[#ffd700]">
              <div className="flex flex-col sm:flex-row sm:items-stretch">
                <div className="min-w-0 flex-1 border-b border-[#2a2a2a] px-6 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-8">
                  <p className="mb-1 font-['Inter'] text-[10px] font-medium uppercase tracking-widest text-[#6b6b6b]">
                    Passaporte de um dia
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-['Oswald'] text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                      Diária
                    </span>
                    <span className="font-['Oswald'] text-3xl font-bold tabular-nums text-[#ffd700] sm:text-4xl md:text-5xl">
                      R$ 39
                    </span>
                  </div>
                  <p className="mt-3 max-w-md font-['Inter'] text-sm leading-relaxed text-[#b0b0b0]">
                    Acesso completo à unidade por um único dia — para conhecer a FORGEE antes de fechar mensalidade.
                  </p>
                </div>
                <div className="flex flex-col justify-center px-6 py-6 sm:w-[13.5rem] sm:shrink-0 sm:px-5 sm:py-8">
                  <button
                    type="button"
                    aria-label="Agendar visita ou diária na FORGEE"
                    className="w-full bg-[#ffd700] py-3.5 font-['Inter'] text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-[#d4a800] active:bg-[#c49a00]"
                  >
                    Agendar
                  </button>
                  <p className="mt-3 text-center font-['Inter'] text-[11px] leading-snug text-[#6b6b6b] sm:text-left">
                    Resposta em até 24h úteis.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipe Section */}
      <section id="equipe" className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#ffd700]" />
              <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                Quem te acompanha
              </span>
            </div>

            <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl tracking-tight uppercase text-white mb-6 leading-tight">
              <div>COACHES QUE</div>
              <div className="text-[#ffd700]">TREINAM.</div>
            </h2>

            <p className="text-[#b0b0b0] font-['Inter'] text-lg mb-12">
              Todos graduados em Educação Física. Todos registrados no CREF SP. Todos treinando.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {coaches.map((coach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-[#ffd700] transition-all duration-300"
              >
                <div className="group relative aspect-square overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute -top-1 -left-1 right-0 bottom-0 bg-white mix-blend-saturation opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0" />
                </div>
                <div className="p-6">
                  <h4 className="font-['Oswald'] font-bold text-xl uppercase text-white mb-1">
                    {coach.name}
                  </h4>
                  <p className="text-[#ffd700] text-sm font-['Inter'] mb-2">
                    {coach.specialty}
                  </p>
                  <p className="text-[#6b6b6b] text-xs uppercase tracking-wider font-['Inter']">
                    {coach.cref}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[#ffd700]" />
              <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                Dúvidas
              </span>
            </div>

            <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl tracking-tight uppercase text-white mb-12 leading-tight">
              <div>PERGUNTAS</div>
              <div className="text-[#ffd700]">DIRETAS.</div>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#2a2a2a]">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between hover:bg-[#111111] transition-colors text-left"
                >
                  <h3 className="font-['Oswald'] font-bold text-xl md:text-2xl uppercase text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M19 9L12 15L5 9"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[#b0b0b0] font-['Inter'] leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-[#ffd700]" />
                <span className="text-[#ffd700] text-xs tracking-[1.44px] uppercase font-['Inter'] font-medium">
                  Onde estamos
                </span>
              </div>

              <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl tracking-tight uppercase text-white mb-8 leading-tight">
                <div>NO CORAÇÃO</div>
                <div>DE INDAIATUBA.</div>
              </h2>

              <div className="mb-8">
                <p className="text-white font-['Inter'] text-lg">Rua das Esmeraldas, 742</p>
                <p className="text-[#b0b0b0] font-['Inter']">Jardim Morada do Sol</p>
                <p className="text-[#b0b0b0] font-['Inter']">Indaiatuba, SP</p>
                <p className="text-[#b0b0b0] font-['Inter'] mb-4">CEP 13.334-210</p>
                <p className="text-[#6b6b6b] font-['Inter'] text-sm">
                  200m do Carrefour · Próximo à saída SP-075
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 mb-8">
                <h3 className="text-[#ffd700] font-['Oswald'] font-bold text-xl uppercase mb-4">
                  HORÁRIOS
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#c2c2c2] font-['Inter']">Segunda a Sexta</span>
                    <span className="text-white font-['Inter'] font-semibold">05H00 – 23H00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c2c2c2] font-['Inter']">Sábado</span>
                    <span className="text-white font-['Inter'] font-semibold">07H00 – 20H00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c2c2c2] font-['Inter']">Domingo e Feriados</span>
                    <span className="text-white font-['Inter'] font-semibold">08H00 – 14H00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-[#c2c2c2] font-['Inter']">
                  <span className="text-[#ffd700]">WhatsApp:</span> (19) 98234-5678
                </p>
                <p className="text-[#c2c2c2] font-['Inter']">
                  <span className="text-[#ffd700]">E-mail:</span> contato@forgee.academy
                </p>
                <p className="text-[#c2c2c2] font-['Inter']">
                  <span className="text-[#ffd700]">Instagram:</span> @forgee.academy
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#ffd700] text-black px-8 py-3 font-['Inter'] font-semibold uppercase tracking-wide hover:bg-[#d4a800] transition-all">
                  FALAR NO WHATSAPP
                </button>
                <button className="text-[#ffd700] px-8 py-3 font-['Inter'] font-semibold uppercase tracking-wide hover:text-[#ffe340] transition-all">
                  COMO CHEGAR
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#2a2a2a] h-[500px] lg:h-full flex items-center justify-center"
            >
              <p className="text-[#6b6b6b] font-['Inter']">[MAPA DO GOOGLE]</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(255,215,0,0.1)] via-transparent to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Oswald'] font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase text-white mb-6 leading-tight">
              <div>A DECISÃO</div>
              <div>JÁ FOI TOMADA.</div>
              <div className="text-[#ffd700]">AGORA É A AÇÃO.</div>
            </h2>

            <p className="text-[#6b6b6b] font-['Inter'] text-xs md:text-sm tracking-[0.2em] uppercase mb-12">
              AGENDE UMA VISITA · GRATUITA · SEM COMPROMISSO · TRAGA TÊNIS.
            </p>

            <button className="bg-[#ffd700] text-black px-12 md:px-16 py-4 md:py-5 font-['Inter'] font-bold text-base md:text-lg tracking-wide uppercase hover:bg-[#d4a800] transition-all duration-300 shadow-2xl shadow-[#ffd700]/30">
              AGENDAR VISITA GRATUITA
            </button>
          </motion.div>
        </div>

        <div className="absolute top-8 left-8 opacity-20">
          <div className="w-12 h-12 border-l-2 border-t-2 border-[#ffd700]" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-20">
          <div className="w-12 h-12 border-r-2 border-b-2 border-[#ffd700]" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e] py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-['Oswald'] font-bold text-2xl text-[#ffd700] mb-2">
                FORGEE
              </div>
              <p className="text-[#6b6b6b] text-xs uppercase tracking-wider font-['Inter']">
                BEYOND LIMITS KNOWN™
              </p>
            </div>

            <div>
              <h4 className="text-white font-['Oswald'] font-bold uppercase mb-4">Academia</h4>
              <ul className="space-y-2">
                <li><a href="#espaco" className="text-[#6b6b6b] hover:text-[#ffd700] transition-colors font-['Inter'] text-sm">Espaço</a></li>
                <li><a href="#programas" className="text-[#6b6b6b] hover:text-[#ffd700] transition-colors font-['Inter'] text-sm">Programas</a></li>
                <li><a href="#equipe" className="text-[#6b6b6b] hover:text-[#ffd700] transition-colors font-['Inter'] text-sm">Equipe</a></li>
                <li><a href="#planos" className="text-[#6b6b6b] hover:text-[#ffd700] transition-colors font-['Inter'] text-sm">Planos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-['Oswald'] font-bold uppercase mb-4">Legal & Redes</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#6b6b6b] hover:text-[#ffd700] transition-colors font-['Inter'] text-sm">Política de Privacidade</a></li>
                <li><a href="#" className="text-[#6b6b6b] hover:text-[#ffd700] transition-colors font-['Inter'] text-sm">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1e1e1e] pt-8">
            <p className="text-[#6b6b6b] text-xs font-['Inter'] text-center">
              FORGEE ACADEMIA LTDA. · CNPJ 00.000.000/0001-00 · CREF SP · DESIGN SYSTEM © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
