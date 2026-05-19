import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pacienteEmail, pacienteNome, profissionalNome, data, hora } = await request.json();

    if (!pacienteEmail || !pacienteNome || !profissionalNome || !data || !hora) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Instituto Thera <onboarding@resend.dev>",
        to: [pacienteEmail],
        subject: "Consulta confirmada — Instituto Thera",
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #FDFCFA; border-radius: 16px; overflow: hidden; border: 1px solid #E8E2DA;">
            <div style="background: #7B9E87; padding: 28px 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px;">Instituto Thera</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Plataforma de Psicologia Online</p>
            </div>
            <div style="padding: 32px;">
              <h2 style="color: #2C2C2C; font-size: 20px; margin-bottom: 8px;">Consulta confirmada! ✅</h2>
              <p style="color: #6B7280; font-size: 15px; line-height: 1.6;">Olá, <strong>${pacienteNome}</strong>! Sua consulta foi agendada com sucesso.</p>
              <div style="background: #F8F5F0; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #6B7280;"><strong style="color: #2C2C2C;">Profissional:</strong> ${profissionalNome}</p>
                <p style="margin: 0 0 8px; font-size: 14px; color: #6B7280;"><strong style="color: #2C2C2C;">Data:</strong> ${data}</p>
                <p style="margin: 0; font-size: 14px; color: #6B7280;"><strong style="color: #2C2C2C;">Horário:</strong> ${hora}</p>
              </div>
              <p style="color: #6B7280; font-size: 14px; line-height: 1.6;">Para entrar na sessão no dia e horário marcados, acesse o site e clique em <strong>Entrar na Sessão</strong>.</p>
              <div style="text-align: center; margin-top: 24px;">
                <a href="https://instituto-thera.vercel.app" style="background: #7B9E87; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;">Acessar Plataforma</a>
              </div>
            </div>
            <div style="padding: 16px 32px; border-top: 1px solid #E8E2DA; text-align: center;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">© 2025 Instituto Thera. Todos os direitos reservados.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const erro = await response.json();
      console.error("Resend erro:", erro);
      return NextResponse.json({ error: "Erro ao enviar e-mail" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
