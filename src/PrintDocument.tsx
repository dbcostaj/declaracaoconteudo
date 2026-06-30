import { DeclaracaoData } from './types';

interface Props {
  data: DeclaracaoData;
}

function formatValue(val: string): string {
  const n = parseFloat(val.replace(',', '.'));
  if (isNaN(n)) return '';
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function sumValues(itens: DeclaracaoData['itens']): string {
  const total = itens.reduce((acc, item) => {
    const v = parseFloat(item.valor.replace(',', '.'));
    return acc + (isNaN(v) ? 0 : v);
  }, 0);
  return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function sumQtd(itens: DeclaracaoData['itens']): string {
  const total = itens.reduce((acc, item) => {
    const v = parseFloat(item.quantidade.replace(',', '.'));
    return acc + (isNaN(v) ? 0 : v);
  }, 0);
  if (total === 0) return '';
  return String(total % 1 === 0 ? total : total.toFixed(2));
}

export default function PrintDocument({ data }: Props) {
  const filledItens = data.itens.filter(
    (item) => item.conteudo.trim() || item.quantidade.trim() || item.valor.trim()
  );

  const totalQtd = sumQtd(filledItens);
  const totalVal = sumValues(filledItens);

  const blankLine = (label: string) => (
    <span style={{ borderBottom: '1px solid #000', display: 'inline-block', minWidth: 80 }}>
      {label || '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
    </span>
  );

  return (
    <div
      id="print-document"
      style={{
        width: '190mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '8.5pt',
        color: '#000',
        background: '#fff',
      }}
    >
      {/* Main title */}
      <div className="doc-main-title">D E C L A R A &Ccedil; &Atilde; O &nbsp; D E &nbsp; C O N T E &Uacute; D O</div>

      {/* Remetente + Destinatario */}
      <table className="doc-table" style={{ borderTop: 'none' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%', borderTop: 'none' }}>
              <div className="doc-section-title" style={{ border: 'none', borderBottom: '1px solid #000', marginBottom: 2 }}>
                R E M E T E N T E
              </div>
            </td>
            <td style={{ width: '50%', borderTop: 'none' }}>
              <div className="doc-section-title" style={{ border: 'none', borderBottom: '1px solid #000', marginBottom: 2 }}>
                D E S T I N A T &Aacute; R I O
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '2px 4px' }}>
              <strong>NOME:</strong> {data.remetente.nome || blankLine('')}
            </td>
            <td style={{ padding: '2px 4px' }}>
              <strong>NOME:</strong> {data.destinatario.nome || blankLine('')}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '2px 4px' }}>
              <strong>ENDERE&Ccedil;O:</strong> {data.remetente.endereco || blankLine('')}
            </td>
            <td style={{ padding: '2px 4px' }}>
              <strong>ENDERE&Ccedil;O:</strong> {data.destinatario.endereco || blankLine('')}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '2px 4px' }}>&nbsp;</td>
            <td style={{ padding: '2px 4px' }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ border: 'none', borderRight: '1px solid #000', padding: '2px 4px', width: '75%' }}>
                      <strong>CIDADE:</strong> {data.remetente.cidade || blankLine('')}
                    </td>
                    <td style={{ border: 'none', padding: '2px 4px' }}>
                      <strong>UF:</strong> {data.remetente.uf || blankLine('')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ border: 'none', borderRight: '1px solid #000', padding: '2px 4px', width: '75%' }}>
                      <strong>CIDADE:</strong> {data.destinatario.cidade || blankLine('')}
                    </td>
                    <td style={{ border: 'none', padding: '2px 4px' }}>
                      <strong>UF:</strong> {data.destinatario.uf || blankLine('')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ border: 'none', borderRight: '1px solid #000', padding: '2px 4px', width: '35%' }}>
                      <strong>CEP:</strong> {data.remetente.cep || blankLine('')}
                    </td>
                    <td style={{ border: 'none', padding: '2px 4px' }}>
                      <strong>CPF/CNPJ/DOC.ESTRANGEIRO:</strong> {data.remetente.cpfCnpj || blankLine('')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ border: 'none', borderRight: '1px solid #000', padding: '2px 4px', width: '35%' }}>
                      <strong>CEP:</strong> {data.destinatario.cep || blankLine('')}
                    </td>
                    <td style={{ border: 'none', padding: '2px 4px' }}>
                      <strong>CPF/CNPJ/DOC.ESTRANGEIRO:</strong> {data.destinatario.cpfCnpj || blankLine('')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Identificacao dos Bens */}
      <div className="doc-section-title" style={{ marginTop: 0 }}>
        I D E N T I F I C A &Ccedil; &Atilde; O &nbsp; D O S &nbsp; B E N S
      </div>
      <table className="doc-table" style={{ borderTop: 'none' }}>
        <thead>
          <tr>
            <th style={{ width: '8%' }}>ITEM</th>
            <th style={{ width: '62%' }}>CONTE&Uacute;DO</th>
            <th style={{ width: '15%' }}>QUANT.</th>
            <th style={{ width: '15%' }}>VALOR</th>
          </tr>
        </thead>
        <tbody>
          {filledItens.map((item, idx) => (
            <tr key={item.id}>
              <td style={{ textAlign: 'center' }}>{idx + 1}</td>
              <td>{item.conteudo}</td>
              <td style={{ textAlign: 'center' }}>{item.quantidade}</td>
              <td style={{ textAlign: 'right', paddingRight: 6 }}>
                {item.valor ? formatValue(item.valor) : ''}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} style={{ textAlign: 'right', fontWeight: 700, paddingRight: 6 }}>
              TOTAIS
            </td>
            <td style={{ textAlign: 'center', fontWeight: 700 }}>{totalQtd}</td>
            <td style={{ textAlign: 'right', fontWeight: 700, paddingRight: 6 }}>{totalVal}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'right', fontWeight: 700, paddingRight: 6 }}>
              PESO TOTAL (kg)
            </td>
            <td colSpan={2} style={{ textAlign: 'center', fontWeight: 700 }}>
              {data.pesoTotal ? `${data.pesoTotal} kg` : '\u00a0'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Declaracao */}
      <div className="doc-section-title" style={{ marginTop: 0 }}>
        D E C L A R A &Ccedil; &Atilde; O
      </div>
      <div
        style={{
          border: '1px solid #000',
          borderTop: 'none',
          padding: '4px 6px',
          fontSize: '7.8pt',
          lineHeight: 1.4,
          textAlign: 'justify',
        }}
      >
        <p style={{ margin: '0 0 6px 0', textIndent: '2em' }}>
          Declaro que n&atilde;o me enquadro no conceito de contribuinte previsto no art. 4&ordm; da Lei Complementar n&ordm; 87/1996,
          uma vez que n&atilde;o realizo, com habitualidade ou em volume que caracterize intuito comercial, opera&ccedil;&otilde;es de
          circula&ccedil;&atilde;o de mercadoria, ainda que se iniciem no exterior, ou estou dispensado da emiss&atilde;o da nota fiscal
          por for&ccedil;a da legisla&ccedil;&atilde;o tribut&aacute;ria vigente, responsabilizando-me, nos termos da lei e a quem de
          direito, por informa&ccedil;&otilde;es inverd&iacute;ceas.
        </p>
        <p style={{ margin: '0 0 8px 0', textIndent: '2em' }}>
          Declaro ainda que n&atilde;o estou postando conte&uacute;do inflam&aacute;vel, explosivo, causador de combust&atilde;o
          espont&acirc;nea, t&oacute;xico, corrosivo, g&aacute;s ou qualquer outro conte&uacute;do que conste na lista de
          proibi&ccedil;&otilde;es e restri&ccedil;&otilde;es dispon&iacute;vel no site dos Correios:{' '}
          <span style={{ textDecoration: 'underline' }}>
            https://www.correios.com.br/enviar/proibicoes-e-restricoes/proibicoes-e-restricoes
          </span>
          .
        </p>

        {/* Date + Signature line */}
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 10, gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, fontSize: '8.5pt' }}>
              <span style={{ borderBottom: '1px solid #000', display: 'inline-block', minWidth: 60 }}>
                {data.localData || '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
              </span>
              <span>,</span>
              <span style={{ borderBottom: '1px solid #000', display: 'inline-block', minWidth: 28 }}>
                {data.dia || '\u00a0\u00a0\u00a0\u00a0'}
              </span>
              <span>de</span>
              <span style={{ borderBottom: '1px solid #000', display: 'inline-block', minWidth: 70 }}>
                {data.mes || '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
              </span>
              <span>de</span>
              <span style={{ borderBottom: '1px solid #000', display: 'inline-block', minWidth: 45 }}>
                {data.ano || '\u00a0\u00a0\u00a0\u00a0\u00a0'}
              </span>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div
              style={{
                borderBottom: '1px solid #000',
                minHeight: 40,
                marginBottom: 2,
              }}
            />
            <div style={{ fontSize: '7.5pt' }}>Assinatura do Declarante/Remetente</div>
          </div>
        </div>
      </div>

      {/* Observacao */}
      <div
        style={{
          border: '1px solid #000',
          borderTop: 'none',
          padding: '3px 6px',
          fontSize: '7.8pt',
          lineHeight: 1.4,
        }}
      >
        <strong>OBSERVA&Ccedil;&Atilde;O:</strong>
        <br />
        {data.observacao ||
          'Constitui crime contra a ordem tribut\u00e1ria suprimir ou reduzir tributo, ou contribui\u00e7\u00e3o social e qualquer acess\u00f3rio (Lei 8.137/90 Art. 1\u00ba, V).'}
      </div>
    </div>
  );
}
