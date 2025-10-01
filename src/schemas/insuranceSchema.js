import { z } from "zod";

export const insurenceSchema = z.object({
  numapolice: z
    .string()
    .nonempty({ message: "O número da apólice não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O número da apólice não pode ter apenas espaços",
    }),
  coberturas: z
    .string()
    .nonempty({ message: "A cobertura não pode ser vazia" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "A cobertura não pode ter apenas espaços",
    }),
  premio: z
    .string()
    .nonempty({ message: "O prêmio não pode ser vazio" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "O prêmio não pode ter apenas espaços",
    }),
});
