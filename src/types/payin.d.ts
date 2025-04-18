// File: interfaces/IJournalEntry.ts

export interface IJournalLine {
  account_code: string; // Misalnya "101" untuk kas, "300" untuk modal
  debit: number; // Nilai debit
  credit: number; // Nilai kredit
  description: string; // Deskripsi transaksi baris
}

export interface IJournalEntry {
  date_inputed: string; // Tanggal input, format ISO (e.g., "2025-04-13T10:00:00Z")
  description: string; // Deskripsi jurnal utama
  invoice: string; // Nomor invoice (optional tergantung backend)
  category: string; // Misalnya "modal", "operasional", dll
  status: string; // Misalnya "draft", "posted", "pending"
  company_id: string; // ID perusahaan (UUID)
  lines: IJournalLine[]; // Daftar jurnal baris
}
