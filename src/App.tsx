import { useState } from 'react';
import { Printer, Plus, Trash2, FileText, Eye, Edit3 } from 'lucide-react';
import { DeclaracaoData, ItemConteudo } from './types';
import PrintDocument from './PrintDocument';

const MAX_ITENS = 12;

function createInitialItens(count: number): ItemConteudo[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    conteudo: '',
    quantidade: '',
    valor: '',
  }));
}

const initialData: DeclaracaoData = {
  remetente: { nome: '', endereco: '', cidade: '', uf: '', cep: '', cpfCnpj: '' },
  destinatario: { nome: '', endereco: '', cidade: '', uf: '', cep: '', cpfCnpj: '' },
  itens: createInitialItens(4),
  pesoTotal: '',
  localData: '',
  dia: '',
  mes: '',
  ano: '',
  observacao: '',
};

export default function App() {
  const [data, setData] = useState<DeclaracaoData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const updateRemetente = (field: keyof DeclaracaoData['remetente'], value: string) =>
    setData((d) => ({ ...d, remetente: { ...d.remetente, [field]: value } }));

  const updateDestinatario = (field: keyof DeclaracaoData['destinatario'], value: string) =>
    setData((d) => ({ ...d, destinatario: { ...d.destinatario, [field]: value } }));

  const updateItem = (id: number, field: keyof Omit<ItemConteudo, 'id'>, value: string) =>
    setData((d) => ({
      ...d,
      itens: d.itens.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }));

  const addItem = () =>
    setData((d) =>
      d.itens.length < MAX_ITENS
        ? { ...d, itens: [...d.itens, { id: Date.now(), conteudo: '', quantidade: '', valor: '' }] }
        : d
    );

  const removeItem = (id: number) =>
    setData((d) => ({ ...d, itens: d.itens.filter((it) => it.id !== id) }));

  const handlePrint = () => {
    setShowPreview(false);
    setTimeout(() => window.print(), 100);
  };

  const resetForm = () => {
    if (confirm('Limpar todos os campos do formulário?')) {
      setData({ ...initialData, itens: createInitialItens(4) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Declaração de Conteúdo</h1>
              <p className="text-xs text-gray-500">Emissor de documentos para impressão</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {showPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Editar' : 'Visualizar'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {!showPreview ? (
          <div className="space-y-6">
            {/* Remetente */}
            <section className="section-card">
              <h2 className="section-title">Remetente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="form-label">Nome</label>
                  <input
                    className="form-input"
                    value={data.remetente.nome}
                    onChange={(e) => updateRemetente('nome', e.target.value)}
                    placeholder="Nome completo ou razão social"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Endereço</label>
                  <input
                    className="form-input"
                    value={data.remetente.endereco}
                    onChange={(e) => updateRemetente('endereco', e.target.value)}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div>
                  <label className="form-label">Cidade</label>
                  <input
                    className="form-input"
                    value={data.remetente.cidade}
                    onChange={(e) => updateRemetente('cidade', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">UF</label>
                  <input
                    className="form-input"
                    value={data.remetente.uf}
                    onChange={(e) => updateRemetente('uf', e.target.value.toUpperCase())}
                    maxLength={2}
                    placeholder="SP"
                  />
                </div>
                <div>
                  <label className="form-label">CEP</label>
                  <input
                    className="form-input"
                    value={data.remetente.cep}
                    onChange={(e) => updateRemetente('cep', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <label className="form-label">CPF / CNPJ / Doc. Estrangeiro</label>
                  <input
                    className="form-input"
                    value={data.remetente.cpfCnpj}
                    onChange={(e) => updateRemetente('cpfCnpj', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Destinatario */}
            <section className="section-card">
              <h2 className="section-title">Destinatário</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="form-label">Nome</label>
                  <input
                    className="form-input"
                    value={data.destinatario.nome}
                    onChange={(e) => updateDestinatario('nome', e.target.value)}
                    placeholder="Nome completo ou razão social"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Endereço</label>
                  <input
                    className="form-input"
                    value={data.destinatario.endereco}
                    onChange={(e) => updateDestinatario('endereco', e.target.value)}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div>
                  <label className="form-label">Cidade</label>
                  <input
                    className="form-input"
                    value={data.destinatario.cidade}
                    onChange={(e) => updateDestinatario('cidade', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">UF</label>
                  <input
                    className="form-input"
                    value={data.destinatario.uf}
                    onChange={(e) => updateDestinatario('uf', e.target.value.toUpperCase())}
                    maxLength={2}
                    placeholder="SP"
                  />
                </div>
                <div>
                  <label className="form-label">CEP</label>
                  <input
                    className="form-input"
                    value={data.destinatario.cep}
                    onChange={(e) => updateDestinatario('cep', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <label className="form-label">CPF / CNPJ / Doc. Estrangeiro</label>
                  <input
                    className="form-input"
                    value={data.destinatario.cpfCnpj}
                    onChange={(e) => updateDestinatario('cpfCnpj', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Itens do conteudo */}
            <section className="section-card">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h2 className="section-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                  Itens do Conteúdo
                </h2>
                <span className="text-xs text-gray-500">
                  {data.itens.length} de {MAX_ITENS} linhas · apenas preenchidas aparecem no documento
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                      <th className="py-2 pr-2 w-10">#</th>
                      <th className="py-2 pr-2">Conteúdo</th>
                      <th className="py-2 pr-2 w-24">Quantidade</th>
                      <th className="py-2 pr-2 w-32">Valor (R$)</th>
                      <th className="py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.itens.map((item, idx) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2 pr-2 text-gray-400 font-medium">{idx + 1}</td>
                        <td className="py-2 pr-2">
                          <input
                            className="form-input"
                            value={item.conteudo}
                            onChange={(e) => updateItem(item.id, 'conteudo', e.target.value)}
                            placeholder="Descrição do item"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            className="form-input"
                            value={item.quantidade}
                            onChange={(e) => updateItem(item.id, 'quantidade', e.target.value)}
                            placeholder="0"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            className="form-input"
                            value={item.valor}
                            onChange={(e) => updateItem(item.id, 'valor', e.target.value)}
                            placeholder="0,00"
                          />
                        </td>
                        <td className="py-2">
                          {data.itens.length > 1 && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              title="Remover linha"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.itens.length < MAX_ITENS && (
                <button
                  onClick={addItem}
                  className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar linha
                </button>
              )}
            </section>

            {/* Dados complementares */}
            <section className="section-card">
              <h2 className="section-title">Dados Complementares</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Peso Total (kg)</label>
                  <input
                    className="form-input"
                    value={data.pesoTotal}
                    onChange={(e) => setData((d) => ({ ...d, pesoTotal: e.target.value }))}
                    placeholder="Ex: 1,5"
                  />
                </div>
                <div>
                  <label className="form-label">Local</label>
                  <input
                    className="form-input"
                    value={data.localData}
                    onChange={(e) => setData((d) => ({ ...d, localData: e.target.value }))}
                    placeholder="Cidade onde será assinado"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="form-label">Dia</label>
                    <input
                      className="form-input"
                      value={data.dia}
                      onChange={(e) => setData((d) => ({ ...d, dia: e.target.value }))}
                      maxLength={2}
                      placeholder="01"
                    />
                  </div>
                  <div>
                    <label className="form-label">Mês</label>
                    <input
                      className="form-input"
                      value={data.mes}
                      onChange={(e) => setData((d) => ({ ...d, mes: e.target.value }))}
                      placeholder="janeiro"
                    />
                  </div>
                  <div>
                    <label className="form-label">Ano</label>
                    <input
                      className="form-input"
                      value={data.ano}
                      onChange={(e) => setData((d) => ({ ...d, ano: e.target.value }))}
                      maxLength={4}
                      placeholder="2025"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="form-label">Observação</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={data.observacao}
                  onChange={(e) => setData((d) => ({ ...d, observacao: e.target.value }))}
                  placeholder="Deixe em branco para usar o texto padrão sobre crime contra a ordem tributária."
                />
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                Limpar formulário
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                <Printer className="w-5 h-5" />
                Gerar Documento para Impressão
              </button>
            </div>
          </div>
        ) : (
          /* Preview mode */
          <div className="space-y-4">
            <div className="no-print flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <p className="text-sm text-blue-800">
                Pré-visualização do documento. Clique em <strong>Imprimir</strong> no topo para gerar o PDF/impressão.
              </p>
            </div>
            <div className="flex justify-center">
              <div
                className="bg-white shadow-lg"
                style={{ width: '210mm', padding: '10mm', minHeight: '148mm' }}
              >
                <PrintDocument data={data} />
              </div>
            </div>
          </div>
        )}

        {/* Hidden print document - always rendered for printing */}
        {!showPreview && (
          <div className="hidden print:block">
            <PrintDocument data={data} />
          </div>
        )}
      </main>
    </div>
  );
}
