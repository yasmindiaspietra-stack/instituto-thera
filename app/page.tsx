"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const C = {
  sage: "#7B9E87",
  sageLight: "#A8C5B0",
  lavender: "#B8A9C9",
  lavenderLight: "#D4CCE0",
  cream: "#F8F5F0",
  warm: "#FDFCFA",
  stone: "#E8E2DA",
  charcoal: "#2C2C2C",
  mist: "#6B7280",
  gold: "#C9A96E",
  blue: "#2D4A6B",
};

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, serif; background: #FDFCFA; -webkit-text-size-adjust: 100%; }
  button { font-family: Georgia, serif; }
  input, textarea { font-family: Georgia, serif; }
  .btn-primary {
    background: #7B9E87; color: white; border: none;
    padding: 14px 24px; border-radius: 12px; font-size: 15px;
    font-weight: 700; cursor: pointer; transition: opacity 0.2s;
    display: block; width: 100%; text-align: center;
  }
  .btn-primary:active { opacity: 0.8; }
  .btn-outline {
    background: transparent; color: #7B9E87;
    border: 2px solid #7B9E87; padding: 14px 24px;
    border-radius: 12px; font-size: 15px; font-weight: 700;
    cursor: pointer; display: block; width: 100%; text-align: center;
  }
  input, textarea {
    width: 100%; padding: 13px 16px; border-radius: 10px;
    border: 1.5px solid #E8E2DA; font-size: 15px; outline: none;
    transition: border-color 0.2s; color: #2C2C2C;
    -webkit-appearance: none;
  }
  input:focus, textarea:focus { border-color: #7B9E87; }
  label { display: block; font-size: 13px; font-weight: 700; color: #2C2C2C; margin-bottom: 6px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
  .stat-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
  .avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 300; display: flex; align-items: flex-end; justify-content: center; padding: 0; }
  @media (min-width: 600px) {
    .modal-overlay { align-items: center; padding: 16px; }
    .modal-box { border-radius: 20px !important; max-width: 500px; }
  }
  .modal-box { background: white; border-radius: 20px 20px 0 0; padding: 28px 20px; width: 100%; max-height: 90vh; overflow-y: auto; }
  .top-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; background: rgba(253,252,250,0.97); border-bottom: 1px solid #E8E2DA; backdrop-filter: blur(10px); }
  .top-nav-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; height: 60px; }
  .logo { font-size: 18px; font-weight: 700; color: #2C2C2C; }
  .logo-green { color: #7B9E87; }
  .sidebar { width: 220px; background: white; height: 100vh; position: fixed; left: 0; top: 0; box-shadow: 2px 0 12px rgba(0,0,0,0.06); display: flex; flex-direction: column; z-index: 50; overflow-y: auto; }
  .sidebar-dark { width: 220px; background: #2C2C2C; height: 100vh; position: fixed; left: 0; top: 0; display: flex; flex-direction: column; z-index: 50; overflow-y: auto; }
  .dash-content { margin-left: 220px; padding: 28px; min-height: 100vh; background: #F8F5F0; }
  .menu-item { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 10px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; margin-bottom: 4px; width: 100%; text-align: left; transition: all 0.2s; background: transparent; }
  .bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: white; border-top: 1px solid #E8E2DA; z-index: 100; padding: 6px 0 10px; }
  .bottom-nav-inner { display: flex; }
  .bottom-nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; background: none; border: none; cursor: pointer; padding: 4px 0; font-size: 10px; color: #6B7280; }
  .bottom-nav-btn.active { color: #7B9E87; }
  .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
  .plans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .pros-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .time-slot { padding: 10px 14px; border-radius: 8px; border: 1.5px solid #E8E2DA; background: white; cursor: pointer; font-size: 14px; font-family: Georgia, serif; font-weight: 600; transition: all 0.2s; }
  @media (max-width: 768px) {
    .sidebar, .sidebar-dark { display: none !important; }
    .dash-content { margin-left: 0 !important; padding: 16px; padding-bottom: 80px; }
    .bottom-nav { display: block !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-visual { display: none !important; }
    .plans-grid { grid-template-columns: 1fr !important; }
    .steps-grid { grid-template-columns: 1fr 1fr !important; }
    .pros-grid { grid-template-columns: 1fr 1fr !important; }
    .stats-grid { grid-template-columns: 1fr 1fr !important; }
    .admin-stats { grid-template-columns: 1fr 1fr !important; }
  }
`;

interface Profissional {
  id: string;
  nome: string;
  crp: string;
  especialidade: string;
  abordagem: string;
  nota: number;
  avaliacoes: number;
  iniciais: string;
  disponivel: boolean;
}

interface Agendamento {
  id: string;
  paciente_id: string;
  profissional_nome: string;
  profissional_iniciais: string;
  data: string;
  hora: string;
  status: string;
  criado_em?: string;
  paciente_nome?: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: string;
}

interface PerfilDB {
  id: string;
  nome: string;
  cpf?: string;
  perfil: string;
  plano?: string;
  criado_em?: string;
}

interface Plano {
  id: string;
  nome: string;
  preco: number;
  descricao?: string;
}

const HORARIOS = ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00"];


const abrirJitsi = (agendamentoId: string, nomeUsuario: string) => {
  const sala = "thera-sessao-" + agendamentoId.replace(/-/g, "").slice(0, 12);
  const url = `https://meet.jit.si/${sala}#userInfo.displayName="${encodeURIComponent(nomeUsuario)}"&config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false`;
  window.open(url, "_blank");
};

const DEPOIMENTOS = [
  { nome: "Marina S.", texto: "A plataforma transformou minha relação com a terapia. Consegui finalmente começar meu processo de forma acessível e confortável.", plano: "Plano Mensal" },
  { nome: "Roberto M.", texto: "É incrível como é simples agendar, e a qualidade dos profissionais é excepcional. Recomendo para todos.", plano: "Sessão Avulsa" },
  { nome: "Carla F.", texto: "A Dra. Ana me ajudou a superar minha ansiedade. O processo foi muito gentil e extremamente profissional.", plano: "Plano Mensal" },
];

const Av = ({ iniciais, tamanho = 44, cor = C.sage }: { iniciais: string; tamanho?: number; cor?: string }) => (
  <div className="avatar" style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.33, background: `linear-gradient(135deg, ${cor}, ${C.lavender})` }}>
    {iniciais}
  </div>
);

const Estrelas = ({ n = 5 }: { n?: number }) => (
  <span style={{ color: C.gold, fontSize: 13 }}>{"★".repeat(Math.round(n))}{"☆".repeat(5 - Math.round(n))}</span>
);

const Modal = ({ titulo, onFechar, children }: { titulo: string; onFechar: () => void; children: React.ReactNode }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onFechar()}>
    <div className="modal-box">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, color: C.charcoal }}>{titulo}</h2>
        <button onClick={onFechar} style={{ background: "none", border: "none", fontSize: 28, cursor: "pointer", color: C.mist }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

const Campo = ({ label, tipo = "text", valor, onChange, placeholder, obrigatorio }: { label: string; tipo?: string; valor: string; onChange: (v: string) => void; placeholder?: string; obrigatorio?: boolean }) => (
  <div className="field">
    <label>{label}{obrigatorio && <span style={{ color: "#EF4444" }}> *</span>}</label>
    <input type={tipo} value={valor} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={obrigatorio} />
  </div>
);

// ── AUTENTICAÇÃO ──────────────────────────────────────────────────────────────
const ModalAuth = ({ modo, onFechar, onAutenticar }: { modo: string; onFechar: () => void; onAutenticar: (u: Usuario) => void }) => {
  const [aba, setAba] = useState(modo);
  const [form, setForm] = useState({ nome: "", email: "", cpf: "", senha: "" });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const f = (campo: string) => (val: string) => setForm((p) => ({ ...p, [campo]: val }));

  const entrar = async () => {
    setErro(""); setSucesso(""); setCarregando(true);
    try {
      if (form.email === "admin@thera.com" && form.senha === "admin123") {
        onAutenticar({ id: "admin", nome: "Administrador", email: form.email, perfil: "admin" });
        return;
      }
      if (form.email === "psi@thera.com" && form.senha === "psi123") {
        onAutenticar({ id: "psi", nome: "Dra. Ana Beatriz", email: form.email, perfil: "profissional" });
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.senha });
      if (error) { setErro("E-mail ou senha incorretos. Tente novamente."); return; }
      if (data.user) {
        const { data: perfil } = await supabase.from("perfis").select("*").eq("id", data.user.id).single();
        onAutenticar({ id: data.user.id, nome: perfil?.nome || form.email, email: form.email, perfil: perfil?.perfil || "paciente" });
      }
    } catch {
      setErro("Erro ao conectar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const cadastrar = async () => {
    setErro(""); setSucesso(""); setCarregando(true);
    if (!form.nome || !form.email || !form.cpf || !form.senha) {
      setErro("Preencha todos os campos obrigatórios."); setCarregando(false); return;
    }
    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres."); setCarregando(false); return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.senha });
      if (error) { setErro("Erro ao criar conta: " + error.message); return; }
      if (data.user) {
        await supabase.from("perfis").insert({ id: data.user.id, nome: form.nome, cpf: form.cpf, perfil: "paciente", plano: "avulsa" });
        setSucesso("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
      }
    } catch {
      setErro("Erro ao criar conta. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Modal titulo={aba === "login" ? "Bem-vindo de volta" : "Criar conta gratuita"} onFechar={onFechar}>
      <div style={{ display: "flex", background: C.cream, borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
        {[["login","Entrar"],["cadastro","Cadastrar"]].map(([v, l]) => (
          <button key={v} onClick={() => { setAba(v); setErro(""); setSucesso(""); }} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer", background: aba === v ? "white" : "transparent", fontWeight: 700, fontSize: 14, color: aba === v ? C.charcoal : C.mist, boxShadow: aba === v ? "0 2px 8px rgba(0,0,0,0.08)" : "none" }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {aba === "cadastro" && <Campo label="Nome completo" valor={form.nome} onChange={f("nome")} placeholder="Seu nome completo" obrigatorio />}
        <Campo label="E-mail" tipo="email" valor={form.email} onChange={f("email")} placeholder="seu@email.com" obrigatorio />
        {aba === "cadastro" && <Campo label="CPF" valor={form.cpf} onChange={f("cpf")} placeholder="000.000.000-00" obrigatorio />}
        <Campo label="Senha" tipo="password" valor={form.senha} onChange={f("senha")} placeholder="••••••••" obrigatorio />
        {erro && <div style={{ color: "#EF4444", fontSize: 13, background: "#FEF2F2", padding: "10px 14px", borderRadius: 8 }}>{erro}</div>}
        {sucesso && <div style={{ color: "#16A34A", fontSize: 13, background: "#DCFCE7", padding: "10px 14px", borderRadius: 8 }}>{sucesso}</div>}
        <div style={{ background: C.cream, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.mist }}>
          <strong>Demo:</strong> admin@thera.com / admin123 · psi@thera.com / psi123
        </div>
        <button className="btn-primary" onClick={aba === "login" ? entrar : cadastrar}>
          {carregando ? "Aguarde..." : aba === "login" ? "Entrar" : "Criar conta"}
        </button>
      </div>
    </Modal>
  );
};

// ── HOMEPAGE ──────────────────────────────────────────────────────────────────
const PaginaInicial = ({ onAuth }: { onAuth: (modo: string) => void }) => {
  const [depIdx, setDepIdx] = useState(0);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [precoBanco, setPrecoBanco] = useState<Record<string, number>>({ avulsa: 180, mensal: 560 });

  useEffect(() => {
    supabase.from("profissionais").select("*").order("nome").then(({ data }) => { if (data) setProfissionais(data); });
    supabase.from("planos").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, number> = {};
        data.forEach((p: Plano) => { map[p.id] = p.preco; });
        setPrecoBanco(map);
      }
    });
    const t = setInterval(() => setDepIdx((p) => (p + 1) % DEPOIMENTOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const planos = [
    { id: "avulsa", nome: "Sessão Avulsa", preco: precoBanco["avulsa"] ?? 180, precoPorSessao: null, desc: "Ideal para quem quer experimentar a terapia online", itens: ["1 sessão de 50 minutos","Escolha de profissional","Videochamada segura","Reagendamento gratuito"], destaque: false },
    { id: "mensal", nome: "Plano Mensal", preco: precoBanco["mensal"] ?? 560, precoPorSessao: Math.round((precoBanco["mensal"] ?? 560) / 4), desc: "Para quem busca um processo terapêutico consistente", itens: ["4 sessões por mês","Profissional fixo","Suporte via chat","Histórico completo"], destaque: true },
  ];

  return (
    <div>
      <section style={{ background: `linear-gradient(160deg, ${C.cream}, ${C.warm})`, paddingTop: 80, paddingBottom: 56 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: "inline-block", background: `${C.sage}22`, color: C.sage, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>+2.000 pacientes atendidos</div>
              <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", lineHeight: 1.2, color: C.charcoal, marginBottom: 16 }}>
                Cuide da sua <span style={{ color: C.sage }}>saúde mental</span> onde você estiver
              </h1>
              <p style={{ fontSize: 16, color: C.mist, lineHeight: 1.7, marginBottom: 28, maxWidth: 460 }}>
                Psicólogos experientes, sessões online seguras e um ambiente acolhedor para o seu processo terapêutico.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
                <button className="btn-primary" onClick={() => onAuth("cadastro")}>Agendar Consulta</button>
                <button className="btn-outline" onClick={() => onAuth("login")}>Já tenho conta — Entrar</button>
              </div>
              <div style={{ display: "flex", gap: 28, marginTop: 28 }}>
                {[["4.9★","Avaliação média"],["98%","Satisfação"],["50min","Por sessão"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: C.charcoal }}>{v}</div>
                    <div style={{ fontSize: 12, color: C.mist }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div style={{ background: "white", borderRadius: 24, padding: 28, boxShadow: "0 16px 60px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <Av iniciais="AB" tamanho={52} />
                  <div>
                    <div style={{ fontWeight: 700, color: C.charcoal }}>Dra. Ana Beatriz</div>
                    <div style={{ color: C.sage, fontSize: 13 }}>Psicóloga Clínica • TCC</div>
                    <Estrelas n={5} />
                  </div>
                </div>
                <div style={{ background: C.cream, borderRadius: 12, padding: 14, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: C.mist, marginBottom: 8, fontWeight: 600 }}>Próximos horários disponíveis</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["09:00","10:00","14:00","15:00"].map((h) => (
                      <div key={h} style={{ padding: "6px 12px", borderRadius: 8, background: "white", fontSize: 13, fontWeight: 700, color: C.charcoal, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>{h}</div>
                    ))}
                  </div>
                </div>
                <button className="btn-primary" onClick={() => onAuth("cadastro")}>Agendar com Ana Beatriz</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", color: C.charcoal, textAlign: "center", marginBottom: 8 }}>Como funciona</h2>
        <p style={{ color: C.mist, textAlign: "center", marginBottom: 32 }}>Simples, rápido e seguro</p>
        <div className="steps-grid">
          {[["🔍","Escolha","Selecione um profissional que se encaixe no que você precisa"],["📅","Agende","Marque o horário que melhor se adapta à sua rotina"],["💻","Conecte","Entre na videochamada pelo próprio site, sem downloads"],["🌿","Evolua","Acompanhe seu progresso ao longo do processo terapêutico"]].map(([ic,t,d]) => (
            <div key={t} style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{ic}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.charcoal, marginBottom: 8 }}>{t}</h3>
              <p style={{ fontSize: 13, color: C.mist, lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "48px 16px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", color: C.charcoal, textAlign: "center", marginBottom: 8 }}>Nossos Profissionais</h2>
          <p style={{ color: C.mist, textAlign: "center", marginBottom: 32 }}>Psicólogos experientes e especializados</p>
          <div className="pros-grid">
            {profissionais.slice(0,4).map((p) => (
              <div key={p.id} className="card" style={{ textAlign: "center" }}>
                <Av iniciais={p.iniciais} tamanho={60} cor={C.sage} />
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14 }}>{p.nome}</div>
                  <div style={{ color: C.sage, fontSize: 12, fontWeight: 600, margin: "4px 0" }}>{p.abordagem}</div>
                  <div style={{ color: C.mist, fontSize: 12, marginBottom: 8 }}>{p.especialidade}</div>
                  <Estrelas n={Math.round(p.nota)} />
                  <div style={{ fontSize: 11, color: C.mist, margin: "4px 0 10px" }}>{p.avaliacoes} avaliações</div>
                  <span className="badge" style={{ background: p.disponivel ? C.sage : C.mist }}>{p.disponivel ? "Disponível" : "Ocupado"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", color: C.charcoal, textAlign: "center", marginBottom: 8 }}>Planos e Preços</h2>
        <p style={{ color: C.mist, textAlign: "center", marginBottom: 32 }}>Escolha o que funciona para você</p>
        <div className="plans-grid" style={{ maxWidth: 700, margin: "0 auto" }}>
          {planos.map((p) => (
            <div key={p.id} className="card" style={{ border: p.destaque ? `2px solid ${C.sage}` : "2px solid transparent", position: "relative" }}>
              {p.destaque && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.sage, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20 }}>MAIS POPULAR</div>}
              <h3 style={{ fontSize: 20, color: C.charcoal, marginBottom: 6 }}>{p.nome}</h3>
              <p style={{ fontSize: 13, color: C.mist, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: C.charcoal }}>R${p.preco}</span>
                {p.precoPorSessao && <div style={{ fontSize: 12, color: C.mist }}>R${p.precoPorSessao}/sessão</div>}
              </div>
              <ul style={{ listStyle: "none", marginBottom: 20 }}>
                {p.itens.map((item) => (
                  <li key={item} style={{ fontSize: 13, color: C.mist, padding: "5px 0", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: C.sage, fontWeight: 700 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <button className="btn-primary" onClick={() => onAuth("cadastro")}>Começar agora</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "48px 16px", background: C.cream }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", color: C.charcoal, marginBottom: 32 }}>O que dizem nossos pacientes</h2>
          <div className="card">
            <div style={{ fontSize: 32, color: C.gold, marginBottom: 12 }}>❝</div>
            <p style={{ fontSize: 16, color: C.mist, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>{DEPOIMENTOS[depIdx].texto}</p>
            <div style={{ fontWeight: 700, color: C.charcoal }}>{DEPOIMENTOS[depIdx].nome}</div>
            <div style={{ fontSize: 12, color: C.mist }}>{DEPOIMENTOS[depIdx].plano}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
              {DEPOIMENTOS.map((_, i) => (
                <button key={i} onClick={() => setDepIdx(i)} style={{ width: i === depIdx ? 20 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === depIdx ? C.sage : C.stone, transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: C.charcoal, padding: "32px 16px", textAlign: "center", color: C.mist }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 20, color: "white", fontWeight: 700, marginBottom: 8 }}>Instituto Thera</div>
          <p style={{ fontSize: 14, maxWidth: 320, margin: "0 auto 24px" }}>Psicologia online de qualidade, acessível e acolhedora.</p>
          <div style={{ borderTop: "1px solid #333", paddingTop: 20, fontSize: 12 }}>© 2025 Instituto Thera. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
};

// ── DASHBOARD PACIENTE ────────────────────────────────────────────────────────
const DashPaciente = ({ usuario, onSair }: { usuario: Usuario; onSair: () => void }) => {
  const [tela, setTela] = useState("inicio");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [showAgendar, setShowAgendar] = useState(false);
  const [showChamada, setShowChamada] = useState(false);
  const [proBuscado, setProBuscado] = useState<Profissional | null>(null);
  const [dataEsc, setDataEsc] = useState("");
  const [horaEsc, setHoraEsc] = useState("");
  const [agendouOk, setAgendouOk] = useState(false);
  const [nota, setNota] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const { data: ags } = await supabase.from("agendamentos").select("*").eq("paciente_id", usuario.id).order("criado_em", { ascending: false });
      if (ags) setAgendamentos(ags);
      const { data: pros } = await supabase.from("profissionais").select("*").order("nome");
      if (pros) setProfissionais(pros);
    };
    if (usuario.id !== "admin" && usuario.id !== "psi") carregar();
  }, [usuario.id]);

  const confirmarAgendamento = async () => {
    if (!proBuscado || !dataEsc || !horaEsc) return;
    setCarregando(true);
    const { data, error } = await supabase.from("agendamentos").insert({
      paciente_id: usuario.id,
      paciente_nome: usuario.nome,
      profissional_nome: proBuscado.nome,
      profissional_iniciais: proBuscado.iniciais,
      data: dataEsc,
      hora: horaEsc,
      status: "confirmado",
    }).select().single();
    if (!error && data) setAgendamentos((p) => [data, ...p]);
    setCarregando(false);
    setAgendouOk(true);
    setTimeout(() => { setShowAgendar(false); setAgendouOk(false); setProBuscado(null); setDataEsc(""); setHoraEsc(""); }, 2500);
  };

  const enviarFeedback = async (agendamentoId: string) => {
    await supabase.from("feedbacks").insert({ paciente_id: usuario.id, agendamento_id: agendamentoId, nota, comentario: feedback });
    setShowChamada(false); setNota(0); setFeedback("");
  };

  const menus = [
    { id: "inicio", ic: "🏠", l: "Início" },
    { id: "consultas", ic: "📅", l: "Consultas" },
    { id: "profissionais", ic: "👥", l: "Profissionais" },
    { id: "perfil", ic: "👤", l: "Perfil" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="sidebar">
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.stone}` }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>Instituto <span style={{ color: C.sage }}>Thera</span></div>
        </div>
        <div style={{ padding: "16px 10px", flex: 1 }}>
          {menus.map((m) => (
            <button key={m.id} onClick={() => setTela(m.id)} className="menu-item" style={{ background: tela === m.id ? `${C.sage}18` : "transparent", color: tela === m.id ? C.sage : C.mist }}>
              <span>{m.ic}</span>{m.l}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: `1px solid ${C.stone}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Av iniciais={usuario.nome.slice(0,2).toUpperCase()} tamanho={36} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal }}>{usuario.nome.split(" ")[0]}</div>
              <div style={{ fontSize: 11, color: C.mist }}>Paciente</div>
            </div>
          </div>
          <button onClick={onSair} style={{ background: "none", border: "none", fontSize: 13, color: "#EF4444", cursor: "pointer" }}>← Sair</button>
        </div>
      </div>

      <div className="dash-content">
        {tela === "inicio" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 6 }}>Olá, {usuario.nome.split(" ")[0]}! 👋</h1>
            <p style={{ color: C.mist, marginBottom: 24 }}>Como você está se sentindo hoje?</p>
            <div className="stats-grid" style={{ marginBottom: 24 }}>
              {[["📅","Consultas","" + agendamentos.length],["✅","Confirmadas","" + agendamentos.filter(a => a.status === "confirmado").length],["⭐","Plano","Ativo"]].map(([ic,l,v]) => (
                <div key={l} className="stat-card">
                  <div style={{ fontSize: 24 }}>{ic}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: C.charcoal, margin: "8px 0 4px" }}>{v}</div>
                  <div style={{ fontSize: 12, color: C.mist }}>{l}</div>
                </div>
              ))}
            </div>
            {agendamentos.length > 0 && (
              <div className="card" style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, color: C.charcoal, marginBottom: 16 }}>Próxima Consulta</h2>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <Av iniciais={agendamentos[0].profissional_iniciais} tamanho={48} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 15 }}>{agendamentos[0].profissional_nome}</div>
                    <div style={{ color: C.mist, fontSize: 13 }}>{agendamentos[0].data} às {agendamentos[0].hora}</div>
                    <div style={{ color: "#22C55E", fontSize: 12, fontWeight: 700, marginTop: 2 }}>● Confirmado</div>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => abrirJitsi(agendamentos[0]?.id || "demo", usuario.nome)}>Entrar na Sessão →</button>
              </div>
            )}
            <button className="btn-outline" onClick={() => setShowAgendar(true)}>+ Agendar Nova Consulta</button>
          </div>
        )}

        {tela === "consultas" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Minhas Consultas</h1>
            {agendamentos.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
                <p style={{ color: C.mist }}>Você ainda não tem consultas agendadas.</p>
                <button className="btn-primary" style={{ marginTop: 16, maxWidth: 260, margin: "16px auto 0" }} onClick={() => setShowAgendar(true)}>Agendar Consulta</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {agendamentos.map((a) => (
                  <div key={a.id} className="card">
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                      <Av iniciais={a.profissional_iniciais} tamanho={44} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: C.charcoal }}>{a.profissional_nome}</div>
                        <div style={{ color: C.mist, fontSize: 13 }}>{a.data} às {a.hora}</div>
                      </div>
                      <span className="badge" style={{ background: C.sage }}>Confirmado</span>
                    </div>
                    <button className="btn-primary" onClick={() => abrirJitsi(a.id, usuario.nome)}>Entrar na Sessão</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tela === "profissionais" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Profissionais</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {profissionais.map((p) => (
                <div key={p.id} className="card">
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: p.disponivel ? 14 : 0 }}>
                    <Av iniciais={p.iniciais} tamanho={52} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14 }}>{p.nome}</div>
                      <div style={{ color: C.sage, fontSize: 12, fontWeight: 600 }}>{p.abordagem}</div>
                      <div style={{ color: C.mist, fontSize: 12 }}>{p.especialidade}</div>
                      <Estrelas n={Math.round(p.nota)} />
                    </div>
                    <span className="badge" style={{ background: p.disponivel ? C.sage : C.mist }}>{p.disponivel ? "Disponível" : "Ocupado"}</span>
                  </div>
                  {p.disponivel && <button className="btn-primary" onClick={() => { setProBuscado(p); setShowAgendar(true); }}>Agendar com {p.nome.split(" ")[1]}</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tela === "perfil" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Meu Perfil</h1>
            <div className="card" style={{ maxWidth: 500 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
                <Av iniciais={usuario.nome.slice(0,2).toUpperCase()} tamanho={64} />
                <div>
                  <h2 style={{ fontSize: 20, color: C.charcoal, marginBottom: 4 }}>{usuario.nome}</h2>
                  <div style={{ color: C.mist, fontSize: 14 }}>{usuario.email}</div>
                  <span className="badge" style={{ background: C.sage, marginTop: 8, display: "inline-block" }}>Paciente Ativo</span>
                </div>
              </div>
              {[["Nome completo", usuario.nome],["E-mail", usuario.email],["Total de Consultas", "" + agendamentos.length]].map(([l,v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${C.stone}` }}>
                  <span style={{ fontSize: 14, color: C.mist }}>{l}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.charcoal }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          {menus.map((m) => (
            <button key={m.id} className={`bottom-nav-btn${tela === m.id ? " active" : ""}`} onClick={() => setTela(m.id)}>
              <span style={{ fontSize: 20 }}>{m.ic}</span>
              <span>{m.l}</span>
            </button>
          ))}
        </div>
      </div>

      {showAgendar && (
        <Modal titulo="Agendar Consulta" onFechar={() => { setShowAgendar(false); setAgendouOk(false); setProBuscado(null); }}>
          {agendouOk ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
              <h3 style={{ fontSize: 22, color: C.charcoal, marginBottom: 8 }}>Consulta Agendada!</h3>
              <p style={{ color: C.mist }}>Sua consulta foi salva com sucesso no banco!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {!proBuscado ? (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal, marginBottom: 12 }}>Escolha o profissional:</div>
                  {profissionais.filter((p) => p.disponivel).map((p) => (
                    <button key={p.id} onClick={() => setProBuscado(p)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, border: `2px solid ${C.stone}`, background: "white", cursor: "pointer", width: "100%", marginBottom: 10, textAlign: "left" }}>
                      <Av iniciais={p.iniciais} tamanho={40} />
                      <div>
                        <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14 }}>{p.nome}</div>
                        <div style={{ color: C.mist, fontSize: 12 }}>{p.abordagem} • {p.especialidade}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, background: `${C.sage}11`, borderRadius: 10, padding: 12 }}>
                    <Av iniciais={proBuscado.iniciais} tamanho={36} />
                    <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14, flex: 1 }}>{proBuscado.nome}</div>
                    <button onClick={() => setProBuscado(null)} style={{ background: "none", border: "none", color: C.mist, cursor: "pointer", fontSize: 13 }}>Trocar</button>
                  </div>
                  <Campo label="Data da consulta" tipo="date" valor={dataEsc} onChange={setDataEsc} obrigatorio />
                  {dataEsc && (
                    <div>
                      <label>Escolha o horário:</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                        {HORARIOS.map((h) => (
                          <button key={h} onClick={() => setHoraEsc(h)} className="time-slot" style={{ background: horaEsc === h ? C.sage : "white", color: horaEsc === h ? "white" : C.charcoal, borderColor: horaEsc === h ? C.sage : C.stone }}>{h}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  <button className="btn-primary" onClick={confirmarAgendamento}>{carregando ? "Salvando..." : "Confirmar Agendamento"}</button>
                </>
              )}
            </div>
          )}
        </Modal>
      )}

      {showChamada && (
        <Modal titulo="Avaliar Sessão" onFechar={() => setShowChamada(false)}>
          <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>⭐</div>
            <p style={{ color: C.mist, fontSize: 14 }}>A sessão foi aberta em uma nova aba. Após encerrar, deixe sua avaliação:</p>
          </div>
          <div style={{ borderTop: `1px solid ${C.stone}`, paddingTop: 16 }}>
            <div style={{ fontSize: 14, color: C.mist, marginBottom: 10, fontWeight: 600 }}>Como foi sua sessão?</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {[1,2,3,4,5].map((i) => (
                <button key={i} onClick={() => setNota(i)} style={{ fontSize: 32, background: "none", border: "none", cursor: "pointer", opacity: i <= nota ? 1 : 0.3 }}>★</button>
              ))}
            </div>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Deixe seu comentário sobre a sessão..." style={{ marginBottom: 12, minHeight: 80, resize: "vertical" }} />
            <button className="btn-primary" onClick={() => enviarFeedback(agendamentos[0]?.id || "")}>Enviar Avaliação</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── DASHBOARD PROFISSIONAL ────────────────────────────────────────────────────
const DashProfissional = ({ usuario, onSair }: { usuario: Usuario; onSair: () => void }) => {
  const [tela, setTela] = useState("agenda");
  const [showChamada, setShowChamada] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    supabase.from("agendamentos").select("*").eq("profissional_nome", usuario.nome).order("data", { ascending: true }).then(({ data }) => { if (data) setAgendamentos(data); });
  }, [usuario.nome]);

  const menus = [
    { id: "agenda", ic: "📅", l: "Agenda" },
    { id: "pacientes", ic: "👥", l: "Pacientes" },
    { id: "historico", ic: "📋", l: "Histórico" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="sidebar">
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.stone}` }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>Thera <span style={{ color: C.blue }}>Pro</span></div>
        </div>
        <div style={{ padding: "16px 10px", flex: 1 }}>
          {menus.map((m) => (
            <button key={m.id} onClick={() => setTela(m.id)} className="menu-item" style={{ background: tela === m.id ? `${C.blue}18` : "transparent", color: tela === m.id ? C.blue : C.mist }}>
              <span>{m.ic}</span>{m.l}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: `1px solid ${C.stone}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Av iniciais="AB" tamanho={36} cor={C.blue} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal }}>{usuario.nome}</div>
              <div style={{ fontSize: 11, color: C.mist }}>Psicóloga</div>
            </div>
          </div>
          <button onClick={onSair} style={{ background: "none", border: "none", fontSize: 13, color: "#EF4444", cursor: "pointer" }}>← Sair</button>
        </div>
      </div>

      <div className="dash-content">
        {tela === "agenda" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Minha Agenda</h1>
            <div className="stats-grid" style={{ marginBottom: 24 }}>
              {[["📅","Total de Sessões","" + agendamentos.length],["✅","Confirmadas","" + agendamentos.filter(a=>a.status==="confirmado").length],["⭐","Avaliação","4.9"]].map(([ic,l,v]) => (
                <div key={l} className="stat-card">
                  <div style={{ fontSize: 22 }}>{ic}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.charcoal, margin: "8px 0 4px" }}>{v}</div>
                  <div style={{ fontSize: 12, color: C.mist }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <h2 style={{ fontSize: 18, color: C.charcoal, marginBottom: 16 }}>Consultas agendadas</h2>
              {agendamentos.length === 0 ? (
                <p style={{ color: C.mist, textAlign: "center", padding: 20 }}>Nenhuma consulta agendada ainda.</p>
              ) : agendamentos.map((a, i) => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < agendamentos.length - 1 ? `1px solid ${C.stone}` : "none" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.charcoal, width: 50, flexShrink: 0 }}>{a.hora}</div>
                  <Av iniciais={(a.paciente_nome || "PA").slice(0,2).toUpperCase()} tamanho={38} cor={C.lavender} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: C.charcoal, fontSize: 14 }}>{a.paciente_nome || "Paciente"}</div>
                    <div style={{ fontSize: 12, color: C.mist }}>{a.data}</div>
                    <span className="badge" style={{ background: a.status === "confirmado" ? C.sage : C.gold }}>{a.status}</span>
                  </div>
                  <button className="btn-primary" style={{ width: "auto", padding: "8px 14px", fontSize: 13 }} onClick={() => abrirJitsi(a.id, usuario.nome)}>Iniciar →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tela === "pacientes" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Pacientes</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {agendamentos.map((a) => (
                <div key={a.id} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Av iniciais={(a.paciente_nome || "PA").slice(0,2).toUpperCase()} tamanho={48} cor={C.lavender} />
                  <div>
                    <div style={{ fontWeight: 700, color: C.charcoal }}>{a.paciente_nome || "Paciente"}</div>
                    <div style={{ color: C.mist, fontSize: 13 }}>{a.data} às {a.hora}</div>
                  </div>
                </div>
              ))}
              {agendamentos.length === 0 && <p style={{ color: C.mist }}>Nenhum paciente ainda.</p>}
            </div>
          </div>
        )}

        {tela === "historico" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Histórico</h1>
            <div className="card">
              {agendamentos.length === 0 ? <p style={{ color: C.mist }}>Nenhuma sessão no histórico.</p> : agendamentos.map((a, i) => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < agendamentos.length - 1 ? `1px solid ${C.stone}` : "none" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <Av iniciais={(a.paciente_nome || "PA").slice(0,2).toUpperCase()} tamanho={38} cor={C.lavender} />
                    <div>
                      <div style={{ fontWeight: 600, color: C.charcoal, fontSize: 14 }}>{a.paciente_nome || "Paciente"}</div>
                      <div style={{ color: C.mist, fontSize: 12 }}>{a.data} às {a.hora}</div>
                    </div>
                  </div>
                  <span className="badge" style={{ background: C.sage }}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          {menus.map((m) => (
            <button key={m.id} className={`bottom-nav-btn${tela === m.id ? " active" : ""}`} onClick={() => setTela(m.id)}>
              <span style={{ fontSize: 20 }}>{m.ic}</span>
              <span>{m.l}</span>
            </button>
          ))}
        </div>
      </div>


    </div>
  );
};

// ── PAINEL ADMIN COMPLETO COM SUPABASE ────────────────────────────────────────
const DashAdmin = ({ onSair }: { onSair: () => void }) => {
  const [tela, setTela] = useState("visao");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [agendamentosAdmin, setAgendamentosAdmin] = useState<Agendamento[]>([]);
  const [usuariosAdmin, setUsuariosAdmin] = useState<PerfilDB[]>([]);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [showAddPro, setShowAddPro] = useState(false);
  const [novoPro, setNovoPro] = useState({ nome: "", especialidade: "", abordagem: "", email: "", senha: "" });
  const [msgErro, setMsgErro] = useState("");
  const [editandoPreco, setEditandoPreco] = useState(false);
  const [tmpPrecos, setTmpPrecos] = useState<Record<string, number>>({});
  const [carregando, setCarregando] = useState(false);
  const [msgOk, setMsgOk] = useState("");

  const carregarDados = async () => {
    const [{ data: pros }, { data: ags }, { data: users }, { data: pls }] = await Promise.all([
      supabase.from("profissionais").select("*").order("nome"),
      supabase.from("agendamentos").select("*").order("criado_em", { ascending: false }),
      supabase.from("perfis").select("*").order("criado_em", { ascending: false }),
      supabase.from("planos").select("*"),
    ]);
    if (pros) setProfissionais(pros);
    if (ags) setAgendamentosAdmin(ags);
    if (users) setUsuariosAdmin(users);
    if (pls) {
      setPlanos(pls);
      const precoMap: Record<string, number> = {};
      pls.forEach((p: Plano) => { precoMap[p.id] = p.preco; });
      setTmpPrecos(precoMap);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const adicionarProfissional = async () => {
    if (!novoPro.nome || !novoPro.email || !novoPro.senha) {
      setMsgErro("Preencha nome, e-mail e senha."); return;
    }
    if (novoPro.senha.length < 6) {
      setMsgErro("A senha deve ter pelo menos 6 caracteres."); return;
    }
    setCarregando(true);
    setMsgErro("");
    try {
      // 1. Cria conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: novoPro.email,
        password: novoPro.senha,
      });
      if (authError) { setMsgErro("Erro ao criar conta: " + authError.message); setCarregando(false); return; }
      if (!authData.user) { setMsgErro("Erro ao criar usuário."); setCarregando(false); return; }

      // 2. Salva perfil como profissional
      await supabase.from("perfis").insert({
        id: authData.user.id,
        nome: novoPro.nome,
        perfil: "profissional",
        plano: "avulsa",
      });

      // 3. Adiciona na tabela de profissionais
      const iniciais = novoPro.nome.split(" ").filter(Boolean).slice(-2).map((w: string) => w[0]).join("").toUpperCase();
      const { data, error } = await supabase.from("profissionais").insert({
        nome: novoPro.nome,
        especialidade: novoPro.especialidade,
        abordagem: novoPro.abordagem,
        crp: "A preencher",
        nota: 5.0,
        avaliacoes: 0,
        iniciais,
        disponivel: true,
      }).select().single();

      if (!error && data) {
        setProfissionais((p) => [...p, data]);
        setMsgOk("Profissional adicionado! Login: " + novoPro.email + " / " + novoPro.senha);
        setTimeout(() => setMsgOk(""), 6000);
      }
    } catch {
      setMsgErro("Erro inesperado. Tente novamente.");
    }
    setCarregando(false);
    setShowAddPro(false);
    setNovoPro({ nome: "", especialidade: "", abordagem: "", email: "", senha: "" });
  };

  const removerProfissional = async (id: string) => {
    await supabase.from("profissionais").delete().eq("id", id);
    setProfissionais((p) => p.filter((pr) => pr.id !== id));
  };

  const salvarPrecos = async () => {
    setCarregando(true);
    for (const [id, preco] of Object.entries(tmpPrecos)) {
      await supabase.from("planos").update({ preco }).eq("id", id);
    }
    setPlanos((prev) => prev.map((p) => ({ ...p, preco: tmpPrecos[p.id] ?? p.preco })));
    setEditandoPreco(false);
    setMsgOk("Preços atualizados com sucesso!");
    setTimeout(() => setMsgOk(""), 3000);
    setCarregando(false);
  };

  const dados = [65,72,80,74,88,95,102,98,115,108,130,142];
  const maxVal = Math.max(...dados);
  const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  const menus = [
    { id: "visao", ic: "📊", l: "Visão Geral" },
    { id: "profissionais", ic: "👥", l: "Profissionais" },
    { id: "agendamentos", ic: "📅", l: "Agendamentos" },
    { id: "planos", ic: "💳", l: "Planos" },
    { id: "usuarios", ic: "👤", l: "Usuários" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="sidebar-dark">
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #3C3C3C" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>Thera <span style={{ color: C.sage }}>Admin</span></div>
        </div>
        <div style={{ padding: "16px 10px", flex: 1 }}>
          {menus.map((m) => (
            <button key={m.id} onClick={() => setTela(m.id)} className="menu-item" style={{ background: tela === m.id ? `${C.sage}33` : "transparent", color: tela === m.id ? C.sageLight : "#9CA3AF" }}>
              <span>{m.ic}</span>{m.l}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: "1px solid #3C3C3C" }}>
          <button onClick={onSair} style={{ background: "none", border: "none", fontSize: 13, color: "#EF4444", cursor: "pointer" }}>← Sair</button>
        </div>
      </div>

      <div className="dash-content">
        {msgOk && (
          <div style={{ background: "#DCFCE7", color: "#16A34A", padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontWeight: 700, fontSize: 14 }}>
            ✅ {msgOk}
          </div>
        )}
        {msgErro && (
          <div style={{ background: "#FEF2F2", color: "#EF4444", padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontWeight: 700, fontSize: 14 }}>
            ❌ {msgErro}
          </div>
        )}

        {tela === "visao" && (
          <div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", color: C.charcoal, marginBottom: 20 }}>Visão Geral</h1>
            <div className="admin-stats" style={{ marginBottom: 24 }}>
              {[
                ["👥","Pacientes Cadastrados","" + usuariosAdmin.length],
                ["🩺","Profissionais Ativos","" + profissionais.filter(p=>p.disponivel).length],
                ["📅","Total de Agendamentos","" + agendamentosAdmin.length],
                ["💰","Faturamento Estimado","R$" + (agendamentosAdmin.length * (planos.find(p => p.id === "avulsa")?.preco ?? 180)).toLocaleString("pt-BR")],
              ].map(([ic,l,v]) => (
                <div key={l} className="stat-card">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{ic}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#22C55E", background: "#DCFCE7", padding: "2px 8px", borderRadius: 20 }}>ao vivo</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: 12, color: C.mist }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <h2 style={{ fontSize: 18, color: C.charcoal, marginBottom: 20 }}>Consultas por Mês</h2>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 130 }}>
                {meses.map((m, i) => (
                  <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: (dados[i] / maxVal) * 110, background: i === 11 ? C.sage : `${C.sage}44`, minHeight: 4 }} />
                    <span style={{ fontSize: 9, color: C.mist }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tela === "profissionais" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h1 style={{ fontSize: "clamp(20px, 4vw, 28px)", color: C.charcoal }}>Profissionais</h1>
              <button className="btn-primary" style={{ width: "auto", padding: "10px 18px", fontSize: 14 }} onClick={() => setShowAddPro(true)}>+ Adicionar</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {profissionais.map((p) => (
                <div key={p.id} className="card">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <Av iniciais={p.iniciais} tamanho={44} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14 }}>{p.nome}</div>
                      <div style={{ color: C.mist, fontSize: 12 }}>{p.abordagem} • CRP {p.crp}</div>
                      <div style={{ color: C.mist, fontSize: 12 }}>{p.especialidade}</div>
                    </div>
                    <span className="badge" style={{ background: p.disponivel ? C.sage : C.mist }}>{p.disponivel ? "Ativo" : "Inativo"}</span>
                  </div>
                  <button onClick={() => removerProfissional(p.id)} style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: "#FEF2F2", color: "#EF4444", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                    Remover Profissional
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tela === "planos" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h1 style={{ fontSize: "clamp(20px, 4vw, 28px)", color: C.charcoal }}>Planos e Preços</h1>
              <button className="btn-outline" style={{ width: "auto", padding: "10px 18px", fontSize: 14 }} onClick={() => setEditandoPreco(!editandoPreco)}>
                {editandoPreco ? "Cancelar" : "Editar Preços"}
              </button>
            </div>
            <div className="plans-grid">
              {planos.map((p) => (
                <div key={p.id} className="card">
                  <h3 style={{ fontSize: 20, color: C.charcoal, marginBottom: 6 }}>{p.nome}</h3>
                  <p style={{ fontSize: 13, color: C.mist, marginBottom: 16 }}>{p.descricao}</p>
                  {editandoPreco ? (
                    <div className="field">
                      <label>Preço (R$)</label>
                      <input type="number" value={tmpPrecos[p.id] ?? p.preco} onChange={(e) => setTmpPrecos((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))} />
                    </div>
                  ) : (
                    <div style={{ fontSize: 40, fontWeight: 700, color: C.charcoal }}>R${p.preco}</div>
                  )}
                </div>
              ))}
            </div>
            {editandoPreco && (
              <button className="btn-primary" style={{ marginTop: 20, maxWidth: 300 }} onClick={salvarPrecos}>
                {carregando ? "Salvando..." : "Salvar Preços no Banco"}
              </button>
            )}
          </div>
        )}

        {tela === "agendamentos" && (
          <div>
            <h1 style={{ fontSize: "clamp(20px, 4vw, 28px)", color: C.charcoal, marginBottom: 20 }}>Agendamentos</h1>
            {agendamentosAdmin.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
                <p style={{ color: C.mist }}>Nenhum agendamento no banco ainda.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {agendamentosAdmin.map((a) => (
                  <div key={a.id} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Av iniciais={(a.paciente_nome || "P").slice(0,2).toUpperCase()} tamanho={40} cor={C.lavender} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14 }}>{a.paciente_nome || "Paciente"}</div>
                      <div style={{ color: C.mist, fontSize: 12 }}>{a.profissional_nome} • {a.data} às {a.hora}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="badge" style={{ background: C.sage }}>{a.status}</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal, marginTop: 4 }}>R${planos.find(p => p.id === "avulsa")?.preco ?? "—"}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tela === "usuarios" && (
          <div>
            <h1 style={{ fontSize: "clamp(20px, 4vw, 28px)", color: C.charcoal, marginBottom: 20 }}>Usuários Cadastrados</h1>
            {usuariosAdmin.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>👤</div>
                <p style={{ color: C.mist }}>Nenhum usuário cadastrado ainda.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {usuariosAdmin.map((u) => (
                  <div key={u.id} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Av iniciais={u.nome.slice(0,2).toUpperCase()} tamanho={40} cor={C.lavender} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: C.charcoal, fontSize: 14 }}>{u.nome}</div>
                      <div style={{ color: C.mist, fontSize: 12 }}>{u.cpf ? `CPF: ${u.cpf}` : "CPF não informado"}</div>
                    </div>
                    <span className="badge" style={{ background: u.plano === "mensal" ? C.blue : C.sage }}>{u.plano || "avulsa"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bottom-nav">
        <div className="bottom-nav-inner">
          {menus.map((m) => (
            <button key={m.id} className={`bottom-nav-btn${tela === m.id ? " active" : ""}`} onClick={() => setTela(m.id)}>
              <span style={{ fontSize: 18 }}>{m.ic}</span>
              <span>{m.l}</span>
            </button>
          ))}
        </div>
      </div>

      {showAddPro && (
        <Modal titulo="Adicionar Profissional" onFechar={() => { setShowAddPro(false); setMsgErro(""); setNovoPro({ nome: "", especialidade: "", abordagem: "", email: "", senha: "" }); }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#EFF6FF", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#1D4ED8" }}>
              💡 Preencha os dados do profissional e crie o acesso dele à plataforma.
            </div>
            <Campo label="Nome completo" valor={novoPro.nome} onChange={(v) => setNovoPro((p) => ({ ...p, nome: v }))} placeholder="Dr./Dra. Nome Sobrenome" obrigatorio />
            <Campo label="Especialidade" valor={novoPro.especialidade} onChange={(v) => setNovoPro((p) => ({ ...p, especialidade: v }))} placeholder="Ex: Ansiedade e Depressão" obrigatorio />
            <Campo label="Abordagem terapêutica" valor={novoPro.abordagem} onChange={(v) => setNovoPro((p) => ({ ...p, abordagem: v }))} placeholder="Ex: TCC, Psicanálise, EMDR" obrigatorio />
            <div style={{ borderTop: "1px solid #E8E2DA", paddingTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2C2C2C", marginBottom: 12 }}>🔐 Acesso à plataforma</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Campo label="E-mail de acesso" tipo="email" valor={novoPro.email} onChange={(v) => setNovoPro((p) => ({ ...p, email: v }))} placeholder="email@profissional.com" obrigatorio />
                <Campo label="Senha inicial" tipo="password" valor={novoPro.senha} onChange={(v) => setNovoPro((p) => ({ ...p, senha: v }))} placeholder="Mínimo 6 caracteres" obrigatorio />
              </div>
            </div>
            {msgErro && <div style={{ color: "#EF4444", fontSize: 13, background: "#FEF2F2", padding: "10px 14px", borderRadius: 8 }}>{msgErro}</div>}
            <button className="btn-primary" onClick={adicionarProfissional}>{carregando ? "Criando conta..." : "Adicionar Profissional"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [modoAuth, setModoAuth] = useState("login");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificar = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: perfil } = await supabase.from("perfis").select("*").eq("id", data.session.user.id).single();
        setUsuario({ id: data.session.user.id, nome: perfil?.nome || data.session.user.email || "Usuário", email: data.session.user.email || "", perfil: perfil?.perfil || "paciente" });
      }
      setCarregando(false);
    };
    verificar();
  }, []);

  const autenticar = (dados: Usuario) => { setUsuario(dados); setShowAuth(false); };
  const sair = async () => { await supabase.auth.signOut(); setUsuario(null); };
  const abrirAuth = (modo: string) => { setModoAuth(modo); setShowAuth(true); };

  if (carregando) {
    return (
      <>
        <style>{globalStyles}</style>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.cream }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🌿</div>
            <div style={{ fontSize: 18, color: C.sage, fontWeight: 700 }}>Instituto Thera</div>
            <div style={{ fontSize: 13, color: C.mist, marginTop: 8 }}>Carregando...</div>
          </div>
        </div>
      </>
    );
  }

  if (usuario) {
    if (usuario.perfil === "admin") return (<><style>{globalStyles}</style><DashAdmin onSair={sair} /></>);
    if (usuario.perfil === "profissional") return (<><style>{globalStyles}</style><DashProfissional usuario={usuario} onSair={sair} /></>);
    return (<><style>{globalStyles}</style><DashPaciente usuario={usuario} onSair={sair} /></>);
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div className="top-nav">
        <div className="top-nav-inner">
          <div className="logo">Instituto <span className="logo-green">Thera</span></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => abrirAuth("login")} style={{ padding: "8px 14px", borderRadius: 10, border: `2px solid ${C.sage}`, background: "transparent", color: C.sage, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Entrar</button>
            <button onClick={() => abrirAuth("cadastro")} style={{ padding: "8px 14px", borderRadius: 10, border: "none", background: C.sage, color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Agendar</button>
          </div>
        </div>
      </div>
      <PaginaInicial onAuth={abrirAuth} />
      {showAuth && <ModalAuth modo={modoAuth} onFechar={() => setShowAuth(false)} onAutenticar={autenticar} />}
    </>
  );
}
