"use client";
import { useState, useEffect } from "react";

const COLORS = {
  sage: "#7B9E87",
  sageLight: "#A8C5B0",
  sageDark: "#5C7A67",
  lavender: "#B8A9C9",
  lavenderLight: "#D4CCE0",
  cream: "#F8F5F0",
  warmWhite: "#FDFCFA",
  stone: "#E8E2DA",
  charcoal: "#2C2C2C",
  mist: "#6B7280",
  gold: "#C9A96E",
  deepBlue: "#2D4A6B",
};

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "sans-serif" }}>
      <nav style={{ background: "white", padding: "20px 40px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "Georgia", fontSize: 24, color: COLORS.charcoal, fontWeight: 700 }}>
          Instituto Thera
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={{ padding: "10px 24px", borderRadius: 10, border: `2px solid ${COLORS.sage}`, background: "transparent", color: COLORS.sage, fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
            Entrar
          </button>
          <button style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: COLORS.sage, color: "white", fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
            Agendar Consulta
          </button>
        </div>
      </nav>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", display: "flex", gap: 60, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-block", background: `${COLORS.sage}22`, color: COLORS.sage, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            +2.000 pacientes atendidos
          </div>
          <h1 style={{ fontFamily: "Georgia", fontSize: 52, lineHeight: 1.2, color: COLORS.charcoal, margin: "0 0 20px" }}>
            Cuide da sua{" "}
            <span style={{ color: COLORS.sage }}>saude mental</span>{" "}
            onde voce estiver
          </h1>
          <p style={{ fontSize: 18, color: COLORS.mist, lineHeight: 1.7, marginBottom: 36 }}>
            Psicologos experientes, sessoes online seguras e um ambiente acolhedor para o seu processo terapeutico.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ padding: "16px 36px", borderRadius: 12, border: "none", background: COLORS.sage, color: "white", fontWeight: 700, cursor: "pointer", fontSize: 17 }}>
              Agendar Consulta
            </button>
            <button style={{ padding: "16px 36px", borderRadius: 12, border: `2px solid ${COLORS.sage}`, background: "transparent", color: COLORS.sage, fontWeight: 700, cursor: "pointer", fontSize: 17 }}>
              Conhecer Profissionais
            </button>
          </div>
        </div>

        <div style={{ flex: 1, background: "white", borderRadius: 24, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontFamily: "Georgia", fontSize: 22, color: COLORS.charcoal, marginBottom: 20 }}>Proxima Sessao</h2>
          {["Dra. Ana Beatriz - TCC", "Dr. Felipe Mendes - Psicanalise", "Dra. Camila Rocha - EMDR"].map((pro) => (
            <div key={pro} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${COLORS.stone}` }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.sage}, ${COLORS.lavender})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
                {pro[4]}
              </div>
              <div style={{ fontSize: 15, color: COLORS.charcoal, fontWeight: 500 }}>{pro}</div>
            </div>
          ))}
          <button style={{ marginTop: 20, width: "100%", padding: "14px", borderRadius: 10, border: "none", background: COLORS.sage, color: "white", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>
            Entrar na Sessao
          </button>
        </div>
      </section>

      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Georgia", fontSize: 38, color: COLORS.charcoal, marginBottom: 48 }}>Planos e Precos</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { name: "Sessao Avulsa", price: "R$180", desc: "1 sessao de 50 minutos", color: COLORS.sage },
              { name: "Plano Mensal", price: "R$560", desc: "4 sessoes por mes", color: COLORS.charcoal },
            ].map((plan) => (
              <div key={plan.name} style={{ borderRadius: 20, padding: 36, background: plan.color, color: "white", textAlign: "left" }}>
                <h3 style={{ fontFamily: "Georgia", fontSize: 24, margin: "0 0 8px" }}>{plan.name}</h3>
                <p style={{ fontSize: 14, opacity: 0.8, margin: "0 0 20px" }}>{plan.desc}</p>
                <div style={{ fontFamily: "Georgia", fontSize: 48, fontWeight: 700, margin: "0 0 24px" }}>{plan.price}</div>
                <button style={{ width: "100%", padding: "14px", borderRadius: 10, border: "2px solid white", background: "transparent", color: "white", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>
                  Contratar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: COLORS.charcoal, color: "#9CA3AF", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia", fontSize: 20, color: "white", marginBottom: 12 }}>Instituto Thera</div>
        <p style={{ fontSize: 14 }}>Psicologia online de qualidade, acessivel e acolhedora.</p>
        <p style={{ fontSize: 12, marginTop: 16 }}>2025 Instituto Thera. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}