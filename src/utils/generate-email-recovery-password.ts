export function generateEmailRecoveryPassword(
  userName: string,
  recoveryCode: string
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Recuperação de Senha</title>
      </head>
      <body
        style="margin: 0; padding: 0; background-color: #f9f9f9; height: 100%; width: 100%;"
      >
        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          height="100%"
          style="min-height: 100vh;"
        >
          <tr>
            <td align="center" valign="middle">
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; font-family: Arial, sans-serif;"
              >
                <tr>
                  <td style="text-align: center;">
                    <h2 style="color: #333;">Olá, ${userName}!</h2>

                    <p style="font-size: 16px; color: #555;">
                      Recebemos uma solicitação para redefinir a sua senha.
                    </p>

                    <p style="font-size: 16px; color: #555;">
                      Use o código abaixo para continuar com o processo de recuperação:
                    </p>

                    <div
                      style="
                        display: inline-block;
                        font-size: 24px;
                        font-weight: bold;
                        background-color: #f0f0f0;
                        padding: 16px 32px;
                        border-radius: 8px;
                        margin: 20px 0;
                        letter-spacing: 4px;
                      "
                    >
                      ${recoveryCode}
                    </div>

                    <p style="font-size: 14px; color: #999;">
                      Se você não solicitou essa recuperação, pode ignorar este e-mail.
                    </p>

                    <p style="font-size: 14px; color: #555;">
                      Atenciosamente,<br />
                      <strong>Equipe do Sistema</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
