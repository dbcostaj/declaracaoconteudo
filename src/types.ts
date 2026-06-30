export interface Remetente {
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  cpfCnpj: string;
}

export interface Destinatario {
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  cpfCnpj: string;
}

export interface ItemConteudo {
  id: number;
  conteudo: string;
  quantidade: string;
  valor: string;
}

export interface DeclaracaoData {
  remetente: Remetente;
  destinatario: Destinatario;
  itens: ItemConteudo[];
  pesoTotal: string;
  localData: string;
  dia: string;
  mes: string;
  ano: string;
  observacao: string;
}
