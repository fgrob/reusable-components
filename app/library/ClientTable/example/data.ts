// library/ClientTable/example/data.ts

export const mockData = [
  {
    id: 1,
    receptionDate: new Date("2024-01-10"),
    invoiceType: { name: "Factura" },
    entity: "Empresa ABC",
    amount: 120000,
    invoiceNumber: "F00123",
    dueDate: new Date("2024-01-31"),
    paymentDate: new Date("2024-01-25"),
    actualPaymentDate: new Date("2024-01-26"),
    status: "PAGADO",
    notes: "Pago realizado vía transferencia.",
  },
  {
    id: 2,
    receptionDate: new Date("2024-02-02"),
    invoiceType: { name: "Boleta" },
    entity: "Empresa XYZ",
    amount: 45000,
    invoiceNumber: "B00456",
    dueDate: new Date("2024-02-15"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "",
  },
  {
    id: 3,
    receptionDate: new Date("2024-03-12"),
    invoiceType: { name: "Factura" },
    entity: "Servicios SPA",
    amount: 89000,
    invoiceNumber: "F00789",
    dueDate: new Date("2024-03-30"),
    paymentDate: new Date("2024-03-29"),
    actualPaymentDate: new Date("2024-03-30"),
    status: "PAGADO",
    notes: "Pagada con cheque diferido.",
  },
  {
    id: 4,
    receptionDate: new Date("2024-04-01"),
    invoiceType: { name: "Factura" },
    entity: "Industrias JKL",
    amount: 150000,
    invoiceNumber: "F00987",
    dueDate: new Date("2024-04-30"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "Pendiente por aprobación.",
  },
  {
    id: 5,
    receptionDate: new Date("2024-04-15"),
    invoiceType: { name: "Factura" },
    entity: "Tecnología Limitada",
    amount: 97500,
    invoiceNumber: "F01012",
    dueDate: new Date("2024-05-15"),
    paymentDate: new Date("2024-05-10"),
    actualPaymentDate: new Date("2024-05-12"),
    status: "PAGADO",
    notes: "",
  },
  {
    id: 6,
    receptionDate: new Date("2024-05-05"),
    invoiceType: { name: "Boleta" },
    entity: "Distribuciones Norte",
    amount: 31000,
    invoiceNumber: "B00178",
    dueDate: new Date("2024-05-20"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "En revisión contable.",
  },
  {
    id: 7,
    receptionDate: new Date("2024-05-12"),
    invoiceType: { name: "Factura" },
    entity: "Empresa ABC",
    amount: 230000,
    invoiceNumber: "F01123",
    dueDate: new Date("2024-06-12"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "",
  },
  {
    id: 8,
    receptionDate: new Date("2024-06-01"),
    invoiceType: { name: "Factura" },
    entity: "Constructora Delta",
    amount: 175000,
    invoiceNumber: "F01234",
    dueDate: new Date("2024-06-30"),
    paymentDate: new Date("2024-06-28"),
    actualPaymentDate: new Date("2024-06-29"),
    status: "PAGADO",
    notes: "Obra finalizada.",
  },
  {
    id: 9,
    receptionDate: new Date("2024-06-10"),
    invoiceType: { name: "Boleta" },
    entity: "Consultores Plus",
    amount: 58000,
    invoiceNumber: "B00234",
    dueDate: new Date("2024-06-25"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "",
  },
  {
    id: 10,
    receptionDate: new Date("2024-06-15"),
    invoiceType: { name: "Factura" },
    entity: "Servicios SPA",
    amount: 72000,
    invoiceNumber: "F01345",
    dueDate: new Date("2024-07-15"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "En espera de OC.",
  },
  {
    id: 11,
    receptionDate: new Date("2024-07-01"),
    invoiceType: { name: "Factura" },
    entity: "Empresa ABC",
    amount: 135000,
    invoiceNumber: "F01456",
    dueDate: new Date("2024-07-31"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "Cliente habitual.",
  },
  {
    id: 12,
    receptionDate: new Date("2024-07-10"),
    invoiceType: { name: "Boleta" },
    entity: "Distribuciones Norte",
    amount: 26700,
    invoiceNumber: "B00345",
    dueDate: new Date("2024-07-25"),
    paymentDate: new Date("2024-07-24"),
    actualPaymentDate: new Date("2024-07-25"),
    status: "PAGADO",
    notes: "",
  },
  {
    id: 13,
    receptionDate: new Date("2024-07-15"),
    invoiceType: { name: "Factura" },
    entity: "Industrias JKL",
    amount: 195000,
    invoiceNumber: "F01567",
    dueDate: new Date("2024-08-15"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "Alta prioridad.",
  },
  {
    id: 14,
    receptionDate: new Date("2024-08-01"),
    invoiceType: { name: "Boleta" },
    entity: "Consultores Plus",
    amount: 60000,
    invoiceNumber: "B00456",
    dueDate: new Date("2024-08-20"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "",
  },
  {
    id: 15,
    receptionDate: new Date("2024-08-10"),
    invoiceType: { name: "Factura" },
    entity: "Tecnología Limitada",
    amount: 99000,
    invoiceNumber: "F01678",
    dueDate: new Date("2024-09-10"),
    paymentDate: null,
    actualPaymentDate: null,
    status: "PENDIENTE",
    notes: "Cliente nuevo.",
  },
];
